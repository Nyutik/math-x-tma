import os
import asyncio
import uuid
import traceback
from typing import Optional, List, Dict
from fastapi import FastAPI, HTTPException, Depends, Header, Request, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from supabase import create_client, Client
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

app = FastAPI(title="MathX API")

# --- PVP Room Manager ---
class PVPRoom:
    def __init__(self, room_id: str, difficulty: str = "easy"):
        self.room_id = room_id
        self.difficulty = difficulty
        self.players: Dict[int, WebSocket] = {}
        self.player_data: Dict[int, dict] = {} # Progress, names
        self.grid_data = None
        self.is_started = False

class PVPManager:
    def __init__(self):
        self.rooms: Dict[str, PVPRoom] = {}
        self.player_to_room: Dict[int, str] = {}

    async def connect(self, websocket: WebSocket, player_id: int):
        await websocket.accept()
        
    def disconnect(self, player_id: int):
        if player_id in self.player_to_room:
            room_id = self.player_to_room[player_id]
            if room_id in self.rooms:
                if player_id in self.rooms[room_id].players:
                    del self.rooms[room_id].players[player_id]
                if not self.rooms[room_id].players:
                    del self.rooms[room_id]
            del self.player_to_room[player_id]

    async def broadcast_to_room(self, room_id: str, message: dict):
        if room_id in self.rooms:
            disconnected = []
            for pid, ws in self.rooms[room_id].players.items():
                try:
                    await ws.send_json(message)
                except:
                    disconnected.append(pid)
            for pid in disconnected:
                self.disconnect(pid)

pvp_manager = PVPManager()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

class UserAuth(BaseModel):
    telegram_id: int
    username: Optional[str] = None
    display_name: Optional[str] = None
    referred_by: Optional[int] = None

class SyncState(BaseModel):
    telegram_id: int
    coins: int
    xp: int
    level: int
    streak: int
    unlocked_easy: int
    unlocked_medium: int
    unlocked_hard: int
    unlocked_expert: int
    theme: Optional[str] = "onyx"
    owned_themes: Optional[List[str]] = ["onyx", "light", "telegram"]
    hints: Optional[int] = 3
    crystals: Optional[int] = 0
    freezes: Optional[int] = 0

class GameScore(BaseModel):
    telegram_id: int
    difficulty: str
    solve_time: int
    points: int

@app.post("/auth")
async def auth_user(user: UserAuth):
    try:
        print(f"Auth request for ID: {user.telegram_id}")
        res = supabase.schema("mathx").table("profiles").select("*").eq("telegram_id", user.telegram_id).execute()
        if len(res.data) > 0:
            user_data = res.data[0]
            try:
                supabase.schema("mathx").table("profiles").update({"last_login": datetime.now().isoformat()}).eq("telegram_id", user.telegram_id).execute()
            except: pass
            return {"status": "success", "user": user_data}
        else:
            new_user = {
                "telegram_id": user.telegram_id, "username": user.username, "display_name": user.display_name, 
                "coins": 100, "xp": 0, "level": 1,
                "unlocked_easy": 1, "unlocked_medium": 1, "unlocked_hard": 1, "unlocked_expert": 1
            }
            res = supabase.schema("mathx").table("profiles").insert(new_user).execute()
            return {"status": "created", "user": res.data[0]}
    except Exception as e:
        print("!!! AUTH ERROR !!!")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/sync")
async def sync_progress(data: SyncState):
    try:
        update_fields = {
            "coins": data.coins, "xp": data.xp, "level": data.level, "daily_streak": data.streak,
            "unlocked_easy": data.unlocked_easy, "unlocked_medium": data.unlocked_medium,
            "unlocked_hard": data.unlocked_hard, "unlocked_expert": data.unlocked_expert,
            "theme": data.theme, "owned_themes": data.owned_themes,
            "hints": data.hints, "crystals": data.crystals, "freezes": data.freezes
        }
        supabase.schema("mathx").table("profiles").update(update_fields).eq("telegram_id", data.telegram_id).execute()
        return {"status": "synced"}
    except Exception as e:
        print("!!! SYNC ERROR !!!")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/game/start")
async def start_game_record(request: Request):
    try:
        data = await request.json()
        user_res = supabase.schema("mathx").table("profiles").select("id").eq("telegram_id", data["telegram_id"]).single().execute()
        supabase.schema("mathx").table("games").insert({
            "player_id": user_res.data["id"], "difficulty": data["difficulty"], "is_completed": False
        }).execute()
        return {"status": "game_started"}
    except: return {"status": "ok_silent_error"}

@app.post("/score")
async def save_score(score: GameScore):
    try:
        user_res = supabase.schema("mathx").table("profiles").select("id").eq("telegram_id", score.telegram_id).single().execute()
        supabase.schema("mathx").table("scores").insert({
            "player_id": user_res.data["id"], "difficulty": score.difficulty,
            "solve_time_seconds": score.solve_time, "points_earned": score.points
        }).execute()
        return {"status": "score_saved"}
    except: return {"status": "error"}

@app.get("/leaderboard")
async def get_leaderboard():
    try:
        res = supabase.schema("mathx").table("profiles").select("display_name, username, xp, level").order("xp", desc=True).limit(10).execute()
        return res.data
    except: return []

@app.get("/stats/{telegram_id}")
async def get_user_stats(telegram_id: int):
    try:
        res = supabase.schema("mathx").table("profiles").select("*").eq("telegram_id", telegram_id).single().execute()
        return res.data
    except: return {}

@app.get("/missions/{telegram_id}")
async def get_missions(telegram_id: int):
    return []

# --- PVP WEBSOCKET ---
@app.websocket("/ws/pvp/{player_id}")
async def pvp_websocket_endpoint(websocket: WebSocket, player_id: int):
    await pvp_manager.connect(websocket, player_id)
    try:
        while True:
            data = await websocket.receive_json()
            action = data.get("action")
            
            if action == "join_room":
                room_id = data.get("room_id")
                if not room_id: continue
                
                if room_id not in pvp_manager.rooms:
                    pvp_manager.rooms[room_id] = PVPRoom(room_id, data.get("difficulty", "easy"))
                
                room = pvp_manager.rooms[room_id]
                room.players[player_id] = websocket
                room.player_data[player_id] = {"name": data.get("name", "Player"), "progress": 0}
                pvp_manager.player_to_room[player_id] = room_id
                
                if len(room.players) == 2:
                    room.is_started = True
                    # In a real app, generate grid once here and send to both
                    await pvp_manager.broadcast_to_room(room_id, {
                        "status": "start",
                        "room_id": room_id,
                        "difficulty": room.difficulty,
                        "players": room.player_data,
                        "seed": room_id # Use room_id as seed for identical grid
                    })
                else:
                    await websocket.send_json({"status": "joined", "room_id": room_id})

            elif action == "update_progress":
                room_id = pvp_manager.player_to_room.get(player_id)
                if room_id and room_id in pvp_manager.rooms:
                    room = pvp_manager.rooms[room_id]
                    room.player_data[player_id]["progress"] = data.get("progress", 0)
                    for pid, ws in room.players.items():
                        if pid != player_id:
                            try:
                                await ws.send_json({
                                    "status": "opponent_update",
                                    "player_id": player_id,
                                    "progress": data.get("progress")
                                })
                            except: pass

            elif action == "win":
                room_id = pvp_manager.player_to_room.get(player_id)
                if room_id:
                    await pvp_manager.broadcast_to_room(room_id, {
                        "status": "game_over",
                        "winner_id": player_id
                    })

    except WebSocketDisconnect:
        pvp_manager.disconnect(player_id)
    except Exception as e:
        print(f"WS Error: {e}")
        pvp_manager.disconnect(player_id)

# --- РАЗДАЧА СТАТИКИ ---
app.mount("/js", StaticFiles(directory="js"), name="js")
app.mount("/css", StaticFiles(directory="css"), name="css")
app.mount("/assets", StaticFiles(directory="assets"), name="assets")

@app.get("/paulyudin-chill-silent-bloom-chill.mp3")
async def get_legacy_audio():
    return FileResponse("assets/paulyudin-chill-silent-bloom-chill.mp3")

@app.get("/")
async def read_index():
    return FileResponse("index.html")

@app.get("/{file_path:path}")
async def catch_all(file_path: str):
    if os.path.exists(file_path) and os.path.isfile(file_path):
        return FileResponse(file_path)
    return FileResponse("index.html")

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
