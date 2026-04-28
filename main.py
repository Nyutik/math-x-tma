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
from datetime import datetime, timedelta
from aiogram import Bot, Dispatcher, types, F
from aiogram.filters import Command
from aiogram.filters.command import CommandObject
from aiogram.utils.keyboard import InlineKeyboardBuilder

load_dotenv()

# --- DATABASE CONFIG ---
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key) if url and key else None

# --- BOT CONFIG ---
BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN")
BOT_USERNAME = os.environ.get("TELEGRAM_BOT_USERNAME", "mathx_infinity_bot")
MINI_APP_SHORT_NAME = os.environ.get("TELEGRAM_MINI_APP_SHORT_NAME", "app")
WEBAPP_URL = os.environ.get("WEBAPP_URL", "https://glitched-arena.myftp.org/math/")

bot = Bot(token=BOT_TOKEN) if BOT_TOKEN else None
dp = Dispatcher() if BOT_TOKEN else None

if dp:
    def build_mini_app_url(start_param: Optional[str] = None) -> str:
        if WEBAPP_URL:
            if start_param:
                separator = "&" if "?" in WEBAPP_URL else "?"
                return f"{WEBAPP_URL}{separator}startapp={start_param}"
            return WEBAPP_URL
        base_url = f"https://t.me/{BOT_USERNAME}/{MINI_APP_SHORT_NAME}"
        if start_param:
            return f"{base_url}?startapp={start_param}"
        return base_url

    @dp.message(Command("start"))
    async def cmd_start(message: types.Message, command: CommandObject):
        lang = message.from_user.language_code or "en"
        name = message.from_user.first_name or "Player"
        start_param = command.args if command and command.args else None
        
        texts = {
            "ru": {
                "cap": f"Привет, {name}! 👋\n\nДобро пожаловать в MathX: Infinity — бесконечную вселенную математических пазлов.\n\nГотов проверить свой интеллект?",
                "btn": "🚀 Запустить MathX"
            },
            "en": {
                "cap": f"Hello, {name}! 👋\n\nWelcome to MathX: Infinity — an infinite universe of math puzzles.\n\nReady to test your intelligence?",
                "btn": "🚀 Launch MathX"
            }
        }
        
        t = texts.get(lang[:2], texts["en"])
        if start_param and start_param.startswith("duel"):
            if lang[:2] == "ru":
                t = {
                    "cap": f"{name}, тебя вызвали на дуэль в MathX.\n\nНажми кнопку ниже, чтобы сразу открыть игру и войти в комнату.",
                    "btn": "⚔️ Открыть дуэль"
                }
            else:
                t = {
                    "cap": f"{name}, you've been challenged to a MathX duel.\n\nTap the button below to open the game and join the room.",
                    "btn": "⚔️ Open Duel"
                }
        builder = InlineKeyboardBuilder()
        if start_param:
            builder.row(types.InlineKeyboardButton(
                text=t["btn"],
                web_app=types.WebAppInfo(url=build_mini_app_url(start_param))
            ))
        else:
            builder.row(types.InlineKeyboardButton(
                text=t["btn"],
                web_app=types.WebAppInfo(url=WEBAPP_URL)
            ))
        
        photo_path = "images/square_icon.jpeg"
        if os.path.exists(photo_path):
            try:
                from aiogram.types import FSInputFile
                await message.answer_photo(
                    photo=FSInputFile(photo_path),
                    caption=t["cap"],
                    reply_markup=builder.as_markup()
                )
            except Exception:
                await message.answer(t["cap"], reply_markup=builder.as_markup())
        else:
            await message.answer(t["cap"], reply_markup=builder.as_markup())

app = FastAPI(title="MathX API")

@app.on_event("startup")
async def on_startup():
    if dp and bot:
        # Запускаем бота в фоновом режиме
        asyncio.create_task(dp.start_polling(bot))
        print("🤖 Telegram Bot started")
    asyncio.create_task(pvp_room_watcher())

@app.on_event("shutdown")
async def on_shutdown():
    if bot:
        await bot.session.close()

# --- PVP Room Manager ---
class PVPRoom:
    def __init__(self, room_id: str, difficulty: str = "easy", stake: int = 50):
        self.room_id = room_id
        self.difficulty = difficulty
        self.stake = stake
        self.players: Dict[int, WebSocket] = {}
        self.player_data: Dict[int, dict] = {} # Progress, names
        self.grid_data = None
        self.is_started = False
        self.status = "waiting"
        self.created_at = datetime.utcnow()
        self.started_at: Optional[datetime] = None
        self.finished_at: Optional[datetime] = None
        self.seed = room_id
        self.bank_committed = False
        self.winner_id: Optional[int] = None
        self.rematch_votes: set[int] = set()

class PVPManager:
    def __init__(self):
        self.rooms: Dict[str, PVPRoom] = {}
        self.player_to_room: Dict[int, str] = {}
        self.invites: Dict[str, dict] = {}

    async def connect(self, websocket: WebSocket, player_id: int):
        if player_id in self.player_to_room:
            self.disconnect(player_id)
        await websocket.accept()

    def get_room(self, player_id: int) -> Optional[PVPRoom]:
        room_id = self.player_to_room.get(player_id)
        if not room_id:
            return None
        return self.rooms.get(room_id)
        
    def disconnect(self, player_id: int):
        if player_id in self.player_to_room:
            room_id = self.player_to_room[player_id]
            if room_id in self.rooms:
                if player_id in self.rooms[room_id].players:
                    del self.rooms[room_id].players[player_id]
                if player_id in self.rooms[room_id].player_data:
                    del self.rooms[room_id].player_data[player_id]
                self.rooms[room_id].rematch_votes.discard(player_id)
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

    async def send_lobby_state(self, room: PVPRoom):
        await self.broadcast_to_room(room.room_id, {
            "status": "lobby",
            "room_id": room.room_id,
            "player_count": len(room.players),
            "players": room.player_data,
            "ready_players": {str(pid): bool(data.get("ready")) for pid, data in room.player_data.items()},
            "stake": room.stake,
            "difficulty": room.difficulty,
            "room_status": room.status
        })

    async def try_start_room(self, room: PVPRoom):
        if len(room.players) != 2:
            return False
        if room.status in {"active", "finished", "cancelled"}:
            return False
        # Автостарт при заполнении комнаты (убрана проверка ready)
        try:
            if not room.bank_committed:
                for pid in room.players.keys():
                    add_coins(pid, -room.stake)
                room.bank_committed = True
            room.is_started = True
            room.status = "active"
            room.started_at = datetime.utcnow()
            room.seed = f"{room.room_id}:{int(room.started_at.timestamp())}"
            # Сбрасываем прогресс и готовность для чистого старта
            for data_item in room.player_data.values():
                data_item["progress"] = 0
                data_item["ready"] = False
            await self.broadcast_to_room(room.room_id, {
                "status": "start",
                "room_id": room.room_id,
                "difficulty": room.difficulty,
                "players": room.player_data,
                "seed": room.seed,
                "stake": room.stake
            })
            return True
        except ValueError:
            await self.broadcast_to_room(room.room_id, {
                "status": "cancelled",
                "room_id": room.room_id,
                "reason": "insufficient_coins"
            })
            room.status = "cancelled"
            room.finished_at = datetime.utcnow()
            return False

pvp_manager = PVPManager()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

class MissionClaim(BaseModel):
    telegram_id: int
    mission_id: str

class PVPInviteReq(BaseModel):
    telegram_id: int
    difficulty: str = "easy"
    stake: int = 50

def get_profile_by_tid(telegram_id: int):
    return supabase.schema("mathx").table("profiles").select("*").eq("telegram_id", telegram_id).single().execute()

def add_coins(telegram_id: int, amount: int):
    profile_res = get_profile_by_tid(telegram_id)
    current_coins = profile_res.data.get("coins", 0) if profile_res and profile_res.data else 0
    new_total = current_coins + amount
    if new_total < 0:
        raise ValueError("insufficient_coins")
    supabase.schema("mathx").table("profiles").update({"coins": new_total}).eq("telegram_id", telegram_id).execute()
    return new_total

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
            referral_applied = bool(user.referred_by and user.referred_by != user.telegram_id)
            if referral_applied:
                new_user["referred_by"] = user.referred_by
            try:
                res = supabase.schema("mathx").table("profiles").insert(new_user).execute()
            except Exception:
                if "referred_by" in new_user:
                    del new_user["referred_by"]
                    referral_applied = False
                    res = supabase.schema("mathx").table("profiles").insert(new_user).execute()
                else:
                    raise
            if referral_applied:
                try:
                    inviter_res = supabase.schema("mathx").table("profiles").select("coins, username, display_name").eq("telegram_id", user.referred_by).single().execute()
                    inviter_coins = inviter_res.data.get("coins", 0) if inviter_res and inviter_res.data else 0
                    inviter_name = inviter_res.data.get("display_name") or inviter_res.data.get("username") or "Игрок"
                    
                    supabase.schema("mathx").table("profiles").update({
                        "coins": inviter_coins + 100
                    }).eq("telegram_id", user.referred_by).execute()
                    
                    # Отправляем уведомление пригласившему
                    if bot:
                        try:
                            new_user_name = user.display_name or user.username or "Новый игрок"
                            await bot.send_message(
                                chat_id=user.referred_by,
                                text=f"🎉 Ваш друг {new_user_name} присоединился к MathX! Вам начислено +100 монет бонуса."
                            )
                        except Exception as e:
                            print(f"Failed to send referral notification: {e}")
                except Exception:
                    print("Referral bonus skipped")
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
        data = res.data or {}
        try:
            user_res = supabase.schema("mathx").table("profiles").select("id").eq("telegram_id", telegram_id).single().execute()
            player_id = user_res.data["id"]
            scores_res = supabase.schema("mathx").table("scores").select("id", count="exact").eq("player_id", player_id).execute()
            data["total_solved"] = scores_res.count or 0
        except Exception:
            data["total_solved"] = data.get("total_solved", 0)
        try:
            refs_res = supabase.schema("mathx").table("profiles").select("telegram_id", count="exact").eq("referred_by", telegram_id).execute()
            data["referrals_count"] = refs_res.count or 0
        except Exception:
            data["referrals_count"] = 0
        return data
    except: return {}

@app.get("/missions/{telegram_id}")
async def get_missions(telegram_id: int):
    try:
        titles = {
            "solve_3": {"ru": "Реши 3 уровня", "en": "Solve 3 levels"},
            "solve_10": {"ru": "Математик: 10 уровней", "en": "Mathematician: 10 levels"},
        }
        today = datetime.utcnow().date().isoformat()
        user_res = supabase.schema("mathx").table("profiles").select("id").eq("telegram_id", telegram_id).single().execute()
        player_id = user_res.data["id"]
        scores_res = supabase.schema("mathx").table("scores").select("created_at").eq("player_id", player_id).execute()
        today_solved = 0
        for row in scores_res.data or []:
            created_at = (row.get("created_at") or "")[:10]
            if created_at == today:
                today_solved += 1
        return [
            {"id": "solve_3", "title": titles["solve_3"]["ru"], "goal": 3, "progress": min(today_solved, 3), "reward": 50},
            {"id": "solve_10", "title": titles["solve_10"]["ru"], "goal": 10, "progress": min(today_solved, 10), "reward": 200},
        ]
    except:
        return []

@app.post("/missions/claim")
async def claim_mission(data: MissionClaim):
    rewards = {"solve_3": 50, "solve_10": 200}
    if data.mission_id not in rewards:
        return {"status": "invalid_mission"}
    try:
        profile_res = supabase.schema("mathx").table("profiles").select("coins").eq("telegram_id", data.telegram_id).single().execute()
        current_coins = profile_res.data.get("coins", 0) if profile_res and profile_res.data else 0
        supabase.schema("mathx").table("profiles").update({
            "coins": current_coins + rewards[data.mission_id]
        }).eq("telegram_id", data.telegram_id).execute()
        return {"status": "claimed", "reward": rewards[data.mission_id]}
    except:
        return {"status": "error"}

@app.post("/pvp/invite")
async def create_pvp_invite(data: PVPInviteReq):
    difficulty = data.difficulty if data.difficulty in {"easy", "medium", "hard"} else "easy"
    stake = max(1, int(data.stake or 50))
    room_id = f"host{data.telegram_id}"
    invite_code = uuid.uuid4().hex[:12]
    pvp_manager.invites[invite_code] = {
        "room_id": room_id,
        "difficulty": difficulty,
        "stake": stake,
        "host_id": data.telegram_id,
        "created_at": datetime.utcnow()
    }
    return {
        "invite_code": invite_code,
        "room_id": room_id,
        "difficulty": difficulty,
        "stake": stake
    }

@app.get("/pvp/invite/{invite_code}")
async def resolve_pvp_invite(invite_code: str):
    invite = pvp_manager.invites.get(invite_code)
    if not invite:
        raise HTTPException(status_code=404, detail="Invite not found")
    if datetime.utcnow() - invite["created_at"] > timedelta(minutes=10):
        pvp_manager.invites.pop(invite_code, None)
        raise HTTPException(status_code=410, detail="Invite expired")
    return {
        "room_id": invite["room_id"],
        "difficulty": invite["difficulty"],
        "stake": invite["stake"],
        "host_id": invite["host_id"]
    }

async def pvp_room_watcher():
    while True:
        await asyncio.sleep(5)
        now = datetime.utcnow()
        for invite_code, invite in list(pvp_manager.invites.items()):
            if now - invite["created_at"] > timedelta(minutes=10):
                pvp_manager.invites.pop(invite_code, None)
        expired = []
        for room_id, room in list(pvp_manager.rooms.items()):
            if room.status in {"waiting", "ready"} and now - room.created_at > timedelta(minutes=2):
                await pvp_manager.broadcast_to_room(room_id, {"status": "timeout", "room_id": room_id})
                expired.append(room_id)
            elif room.status == "active" and room.started_at and now - room.started_at > timedelta(minutes=10):
                winner_id = None
                winner_total = None
                players_progress = sorted(
                    [(pid, room.player_data.get(pid, {}).get("progress", 0)) for pid in room.players.keys()],
                    key=lambda item: item[1],
                    reverse=True
                )
                if len(players_progress) >= 2 and players_progress[0][1] != players_progress[1][1]:
                    winner_id = players_progress[0][0]
                    try:
                        winner_total = add_coins(winner_id, room.stake * 2)
                    except Exception:
                        winner_total = None
                elif room.bank_committed:
                    for pid in room.players.keys():
                        try:
                            add_coins(pid, room.stake)
                        except Exception:
                            pass
                room.status = "finished"
                room.finished_at = now
                room.winner_id = winner_id
                await pvp_manager.broadcast_to_room(room_id, {
                    "status": "timeout",
                    "room_id": room_id,
                    "winner_id": winner_id,
                    "winner_coins": winner_total
                })
                expired.append(room_id)
            elif room.status in {"finished", "cancelled"} and room.finished_at and now - room.finished_at > timedelta(minutes=1):
                expired.append(room_id)
        for room_id in expired:
            room = pvp_manager.rooms.pop(room_id, None)
            if room:
                for pid in list(room.players.keys()):
                    pvp_manager.player_to_room.pop(pid, None)

# --- PVP WEBSOCKET ---
@app.websocket("/ws/pvp/{player_id}")
async def pvp_websocket_endpoint(websocket: WebSocket, player_id: int):
    await pvp_manager.connect(websocket, player_id)
    print(f"[PVP] websocket connected player={player_id}")
    try:
        while True:
            data = await websocket.receive_json()
            action = data.get("action")
            
            if action == "join_room":
                room_id = data.get("room_id")
                if not room_id: continue
                print(f"[PVP] join_room player={player_id} room={room_id}")
                
                if room_id not in pvp_manager.rooms:
                    pvp_manager.rooms[room_id] = PVPRoom(
                        room_id,
                        data.get("difficulty", "easy"),
                        int(data.get("stake", 50))
                    )
                
                room = pvp_manager.rooms[room_id]
                if room.status in {"active", "finished", "cancelled"} or (len(room.players) >= 2 and player_id not in room.players):
                    await websocket.send_json({"status": "room_unavailable", "room_id": room_id})
                    continue
                room.players[player_id] = websocket
                room.player_data[player_id] = {
                    "name": data.get("name", "Player"),
                    "progress": 0,
                    "ready": True
                }
                pvp_manager.player_to_room[player_id] = room_id
                room.status = "ready" if len(room.players) == 2 else "waiting"
                await websocket.send_json({"status": "joined", "room_id": room_id})
                await pvp_manager.send_lobby_state(room)
                await pvp_manager.try_start_room(room)

            elif action == "ready":
                room = pvp_manager.get_room(player_id)
                if not room or player_id not in room.player_data:
                    continue
                room.player_data[player_id]["ready"] = True
                room.status = "ready"
                await pvp_manager.send_lobby_state(room)
                await pvp_manager.try_start_room(room)

            elif action == "cancel_room":
                room = pvp_manager.get_room(player_id)
                if not room:
                    continue
                room.status = "cancelled"
                room.finished_at = datetime.utcnow()
                await pvp_manager.broadcast_to_room(room.room_id, {
                    "status": "cancelled",
                    "room_id": room.room_id
                })

            elif action == "update_progress":
                room_id = pvp_manager.player_to_room.get(player_id)
                if room_id and room_id in pvp_manager.rooms:
                    room = pvp_manager.rooms[room_id]
                    if room.status != "active":
                        continue
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
                    room = pvp_manager.rooms.get(room_id)
                    if not room or room.status != "active" or room.winner_id is not None:
                        continue
                    room.winner_id = player_id
                    room.status = "finished"
                    room.finished_at = datetime.utcnow()
                    try:
                        winner_total = add_coins(player_id, room.stake * 2)
                    except Exception:
                        winner_total = None
                    await pvp_manager.broadcast_to_room(room_id, {
                        "status": "game_over",
                        "winner_id": player_id,
                        "stake": room.stake,
                        "winner_coins": winner_total
                    })

            elif action == "rematch":
                room = pvp_manager.get_room(player_id)
                if not room or room.status != "finished":
                    continue
                room.rematch_votes.add(player_id)
                if len(room.rematch_votes) == 2 and len(room.players) == 2:
                    room.status = "ready"
                    room.is_started = False
                    room.started_at = None
                    room.finished_at = None
                    room.winner_id = None
                    room.bank_committed = False
                    room.seed = room.room_id
                    for data_item in room.player_data.values():
                        data_item["progress"] = 0
                        data_item["ready"] = False
                    room.rematch_votes.clear()
                    await pvp_manager.send_lobby_state(room)
                else:
                    await pvp_manager.broadcast_to_room(room.room_id, {
                        "status": "rematch_waiting",
                        "room_id": room.room_id
                    })

    except WebSocketDisconnect:
        room_id = pvp_manager.player_to_room.get(player_id)
        pvp_manager.disconnect(player_id)
        if room_id and room_id in pvp_manager.rooms and pvp_manager.rooms[room_id].players:
            room = pvp_manager.rooms[room_id]
            if room.status == "active" and room.bank_committed and room.winner_id is None and len(room.players) == 1:
                remaining_player = next(iter(room.players.keys()))
                room.winner_id = remaining_player
                room.status = "finished"
                room.finished_at = datetime.utcnow()
                try:
                    winner_total = add_coins(remaining_player, room.stake * 2)
                except Exception:
                    winner_total = None
                await pvp_manager.broadcast_to_room(room_id, {
                    "status": "game_over",
                    "winner_id": remaining_player,
                    "stake": room.stake,
                    "winner_coins": winner_total
                })
            else:
                await pvp_manager.broadcast_to_room(room_id, {"status": "opponent_left", "room_id": room_id})
    except Exception as e:
        print(f"WS Error: {e}")
        room_id = pvp_manager.player_to_room.get(player_id)
        pvp_manager.disconnect(player_id)
        if room_id and room_id in pvp_manager.rooms and pvp_manager.rooms[room_id].players:
            room = pvp_manager.rooms[room_id]
            if room.status == "active" and room.bank_committed and room.winner_id is None and len(room.players) == 1:
                remaining_player = next(iter(room.players.keys()))
                room.winner_id = remaining_player
                room.status = "finished"
                room.finished_at = datetime.utcnow()
                try:
                    winner_total = add_coins(remaining_player, room.stake * 2)
                except Exception:
                    winner_total = None
                await pvp_manager.broadcast_to_room(room_id, {
                    "status": "game_over",
                    "winner_id": remaining_player,
                    "stake": room.stake,
                    "winner_coins": winner_total
                })
            else:
                await pvp_manager.broadcast_to_room(room_id, {"status": "opponent_left", "room_id": room_id})

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
    # Используем root_path для корректной обработки префикса /math на продакшене
    root_path = os.environ.get("ROOT_PATH", "")
    uvicorn.run(app, host="0.0.0.0", port=port, root_path=root_path)
