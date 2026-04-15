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

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Инициализация Supabase
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

from supabase import create_client, Client

supabase: Client = create_client(url, key)

# Вспомогательная функция для удобного доступа к таблицам в схеме mathx
def db(table_name: str):
    return supabase.table(table_name)

# Но так как таблицы в схеме mathx, нужно вызывать supabase.schema("mathx").table(table_name)
# В новых версиях supabase-python это делается так:
def db(table_name: str):
    # По умолчанию supabase обращается к public.
    # Чтобы использовать схему mathx, мы добавляем вызов схемы перед таблицей
    try:
        return supabase.schema("mathx").table(table_name)
    except AttributeError:
        # Резервный вариант, если версия библиотеки не поддерживает .schema()
        # В этом случае мы просто укажем схему в названии (иногда так работает)
        return supabase.table(f"mathx.{table_name}")
        
# --- МОДЕЛИ PYDANTIC ---
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

class GameScore(BaseModel):
    telegram_id: int
    difficulty: str
    solve_time: int
    points: int

# --- ЭНДПОИНТЫ API ---

@app.post("/auth")
async def auth_user(user: UserAuth):
    try:
        print(f"Auth request: {user.telegram_id}")
        # Заменяем supabase.table на supabase.schema("mathx").table
        res = supabase.schema("mathx").table("profiles").select("*").eq("telegram_id", user.telegram_id).execute()
        
        if len(res.data) > 0:
            user_data = res.data[0]
            try:
                supabase.schema("mathx").table("profiles").update({"last_login": datetime.now().isoformat()}).eq("telegram_id", user.telegram_id).execute()
            except Exception as e:
                print(f"Skipping last_login update: {e}")
            return {"status": "success", "user": user_data}
        else:
            print(f"Creating new user: {user.telegram_id}")
            new_user = {
                "telegram_id": user.telegram_id, 
                "username": user.username, 
                "display_name": user.display_name, 
                "coins": 100, 
                "xp": 0, 
                "level": 1
            }
            res = supabase.schema("mathx").table("profiles").insert(new_user).execute()
            if not res.data:
                raise Exception("Failed to create user in Supabase")
            
            if user.referred_by and user.referred_by != user.telegram_id:
                try:
                    supabase.rpc("increment_coins", {"t_id": user.referred_by, "amount": 50}).execute()
                    supabase.schema("mathx").table("profiles").update({"coins": 150}).eq("telegram_id", user.telegram_id).execute()
                    res.data[0]["coins"] = 150
                except: pass
                
            return {"status": "created", "user": res.data[0]}
    except Exception as e:
        print(f"ERROR /auth: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/stats/{telegram_id}")
async def get_user_stats(telegram_id: int):
    try:
        user_res = supabase.schema("mathx").table("profiles").select("*").eq("telegram_id", telegram_id).single().execute()
        p_id = user_res.data["id"]
        
        try:
            games_res = supabase.schema("mathx").table("games").select("id", count="exact").eq("player_id", p_id).eq("is_completed", True).execute()
            total_solved = games_res.count if games_res.count is not None else 0
        except: total_solved = 0
            
        return {
            "xp": user_res.data.get("xp", 0),
            "level": user_res.data.get("level", 1),
            "coins": user_res.data.get("coins", 0),
            "streak": user_res.data.get("daily_streak", 0),
            "total_solved": total_solved
        }
    except Exception as e:
        print(f"ERROR /stats: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/game/start")
async def start_game_record(data: dict):
    try:
        user_res = supabase.schema("mathx").table("profiles").select("id").eq("telegram_id", data["telegram_id"]).single().execute()
        supabase.schema("mathx").table("games").insert({
            "player_id": user_res.data["id"], 
            "difficulty": data["difficulty"], 
            "is_completed": False
        }).execute()
        return {"status": "game_started"}
    except Exception as e:
        print(f"ERROR /game/start: {str(e)}")
        return {"error": str(e)}

@app.post("/sync")
async def sync_progress(data: SyncState):
    try:
        print(f"Sync request: {data.telegram_id}")
        update_fields = {
            "coins": data.coins,
            "xp": data.xp,
            "level": data.level
        }
        try:
            supabase.schema("mathx").table("profiles").update({**update_fields, "daily_streak": data.streak}).eq("telegram_id", data.telegram_id).execute()
        except:
            supabase.schema("mathx").table("profiles").update(update_fields).eq("telegram_id", data.telegram_id).execute()
            
        return {"status": "synced"}
    except Exception as e:
        print(f"ERROR /sync: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/score")
async def save_score(score: GameScore):
    try:
        user_res = supabase.schema("mathx").table("profiles").select("id").eq("telegram_id", score.telegram_id).single().execute()
        p_id = user_res.data["id"]
        supabase.schema("mathx").table("scores").insert({
            "player_id": p_id,
            "difficulty": score.difficulty,
            "solve_time_seconds": score.solve_time,
            "points_earned": score.points
        }).execute()
        return {"status": "score_saved"}
    except Exception as e:
        print(f"ERROR /score: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/leaderboard")
async def get_leaderboard():
    try:
        res = supabase.schema("mathx").table("profiles").select("display_name, username, xp, level").order("xp", desc=True).limit(10).execute()
        return res.data
    except Exception as e:
        print(f"ERROR /leaderboard: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# --- РАЗДАЧА ФАЙЛОВ ИГРЫ ---

@app.get("/")
async def read_index():
    return FileResponse("index.html")

# Список всех статических файлов для явной раздачи
static_files = ["style.css", "game.js", "generator.js", "audio.js", "paulyudin-chill-silent-bloom-chill.mp3"]

@app.get("/{file_path:path}")
async def catch_all(file_path: str):
    if file_path in static_files or file_path.endswith((".js", ".css", ".mp3", ".png", ".jpg", ".svg", ".ico")):
        if os.path.exists(file_path):
            return FileResponse(file_path)
    return FileResponse("index.html")

if __name__ == "__main__":
    import uvicorn
    # Мы используем порт 8000 как основной, если 8000 занят - uvicorn скажет об этом.
    port = int(os.environ.get("PORT", 8000))
    print(f"Запуск MathX на порту {port}...")
    uvicorn.run(app, host="0.0.0.0", port=port)
