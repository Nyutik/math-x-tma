import os
from typing import Optional, List
from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from supabase import create_client, Client
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

app = FastAPI(title="MathX API")

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

class GameScore(BaseModel):
    telegram_id: int
    difficulty: str
    solve_time: int
    points: int

@app.post("/auth")
async def auth_user(user: UserAuth):
    try:
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
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/sync")
async def sync_progress(data: SyncState):
    try:
        update_fields = {
            "coins": data.coins, "xp": data.xp, "level": data.level, "daily_streak": data.streak,
            "unlocked_easy": data.unlocked_easy, "unlocked_medium": data.unlocked_medium,
            "unlocked_hard": data.unlocked_hard, "unlocked_expert": data.unlocked_expert
        }
        supabase.schema("mathx").table("profiles").update(update_fields).eq("telegram_id", data.telegram_id).execute()
        return {"status": "synced"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

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

# --- РАЗДАЧА СТАТИКИ ---
app.mount("/js", StaticFiles(directory="js"), name="js")
app.mount("/css", StaticFiles(directory="css"), name="css")
app.mount("/assets", StaticFiles(directory="assets"), name="assets")

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
