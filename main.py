import os
from typing import Optional, List
from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="MathX API")

@app.get("/")
@app.head("/")
async def root():
    return {"message": "MathX Infinity API", "status": "running"}

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # В продакшене лучше указать конкретные домены
    allow_credentials=False, # Должно быть False, если используем "*"
    allow_methods=["*"],
    allow_headers=["*"],
)

# Инициализация Supabase
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

# Модели данных
class UserAuth(BaseModel):
    telegram_id: int
    username: Optional[str] = None
    display_name: Optional[str] = None
    referred_by: Optional[int] = None

class InventoryItem(BaseModel):
    telegram_id: int
    item_type: str
    item_name: str

class MissionClaim(BaseModel):
    telegram_id: int
    mission_id: str

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

# Эндпоинты

@app.post("/auth")
async def auth_user(user: UserAuth):
    """Авторизация или регистрация пользователя с поддержкой рефералов"""
    try:
        # Ищем пользователя
        res = supabase.table("profiles").select("*").eq("telegram_id", user.telegram_id).execute()

        if len(res.data) > 0:
            # Исправляем: используем корректный способ обновления времени
            from datetime import datetime
            supabase.table("profiles").update({"last_login": datetime.utcnow().isoformat()}).eq("telegram_id", user.telegram_id).execute()
            return {"status": "success", "user": res.data[0]}
        else:
            # Создаем нового игрока
            new_user = {
                "telegram_id": user.telegram_id,
                "username": user.username,
                "display_name": user.display_name,
                "coins": 100,
                "xp": 0,
                "level": 1
            }
            res = supabase.table("profiles").insert(new_user).execute()
            new_user_data = res.data[0]

            # Если есть реферер, начисляем бонусы
            if user.referred_by and user.referred_by != user.telegram_id:
                # Начисляем 50 монет рефереру
                supabase.rpc("increment_coins", {
                    "t_id": user.referred_by, 
                    "amount": 50
                }).execute()
                # Бонус новому игроку (рефералу)
                supabase.table("profiles").update({"coins": 150}).eq("telegram_id", user.telegram_id).execute()
                new_user_data["coins"] = 150

            return {"status": "created", "user": new_user_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/stats/{telegram_id}")
async def get_user_stats(telegram_id: int):
    """Получение детальной статистики игрока из разных таблиц"""
    try:
        user_res = supabase.table("profiles").select("id, xp, level, coins, daily_streak").eq("telegram_id", telegram_id).single().execute()
        p_id = user_res.data["id"]

        # Считаем количество завершенных игр
        games_res = supabase.table("games").select("id", count="exact").eq("player_id", p_id).eq("is_completed", True).execute()
        total_solved = games_res.count if games_res.count is not None else 0

        # Получаем лучший результат времени
        scores_res = supabase.table("scores").select("solve_time_seconds").eq("player_id", p_id).order("solve_time_seconds", desc=False).limit(1).execute()
        best_time = scores_res.data[0]["solve_time_seconds"] if scores_res.data else 0

        return {
            "xp": user_res.data["xp"],
            "level": user_res.data["level"],
            "coins": user_res.data["coins"],
            "streak": user_res.data["daily_streak"],
            "total_solved": total_solved,
            "best_time": best_time
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/game/start")
async def start_game_record(data: dict):
    """Фиксируем начало игры в таблице games"""
    try:
        user_res = supabase.table("profiles").select("id").eq("telegram_id", data["telegram_id"]).single().execute()
        supabase.table("games").insert({
            "player_id": user_res.data["id"],
            "difficulty": data["difficulty"],
            "is_completed": False
        }).execute()
        return {"status": "game_started"}
    except Exception as e: return {"error": str(e)}

class MissionClaim(BaseModel):
    telegram_id: int
    mission_id: str

@app.get("/missions/{telegram_id}")
async def get_daily_missions(telegram_id: int):
    """Получение списка заданий на сегодня и прогресса"""
    try:
        user_res = supabase.table("profiles").select("id").eq("telegram_id", telegram_id).single().execute()
        p_id = user_res.data["id"]

        # Считаем, сколько игр завершено СЕГОДНЯ
        import datetime
        today = datetime.date.today().isoformat()
        games_res = supabase.table("games").select("id").eq("player_id", p_id).eq("is_completed", True).gte("completed_at", today).execute()
        completed_today = len(games_res.data)

        # Список статичных заданий (можно расширить)
        missions = [
            {"id": "solve_3", "title": "Реши 3 уровня", "goal": 3, "progress": min(completed_today, 3), "reward": 50, "icon": "check-circle"},
            {"id": "solve_10", "title": "Математик: 10 уровней", "goal": 10, "progress": min(completed_today, 10), "reward": 200, "icon": "zap"}
        ]
        
        return missions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/missions/claim")
async def claim_mission_reward(claim: MissionClaim):
    """Выдача награды за выполненное задание"""
    # Здесь можно добавить проверку, не забирал ли пользователь уже награду сегодня
    # Для простоты пока просто начисляем монеты
    rewards = {"solve_3": 50, "solve_10": 200}
    amount = rewards.get(claim.mission_id, 0)
    
    if amount > 0:
        supabase.rpc("increment_coins", {"t_id": claim.telegram_id, "amount": amount}).execute()
        return {"status": "reward_claimed", "amount": amount}
    return {"status": "error"}


@app.post("/sync")
async def sync_progress(data: SyncState):
    """Синхронизация прогресса игрока"""
    try:
        res = supabase.table("profiles").update({
            "coins": data.coins,
            "xp": data.xp,
            "level": data.level,
            "daily_streak": data.streak
        }).eq("telegram_id", data.telegram_id).execute()
        return {"status": "synced"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/score")
async def save_score(score: GameScore):
    """Сохранение рекорда"""
    try:
        # Сначала получаем UUID профиля
        user_res = supabase.table("profiles").select("id").eq("telegram_id", score.telegram_id).single().execute()
        profile_id = user_res.data["id"]
        
        new_score = {
            "player_id": profile_id,
            "difficulty": score.difficulty,
            "solve_time_seconds": score.solve_time,
            "points_earned": score.points
        }
        supabase.table("scores").insert(new_score).execute()
        return {"status": "score_saved"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/leaderboard")
async def get_leaderboard():
    """Получение топ-10 игроков по опыту"""
    try:
        res = supabase.table("profiles").select("display_name, username, xp, level").order("xp", desc=True).limit(10).execute()
        return res.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/inventory/add")
async def add_to_inventory(item: InventoryItem):
    """Добавление предмета в инвентарь (покупка)"""
    try:
        user_res = supabase.table("profiles").select("id").eq("telegram_id", item.telegram_id).single().execute()
        profile_id = user_res.data["id"]
        
        new_item = {
            "player_id": profile_id,
            "item_type": item.item_type,
            "item_name": item.item_name
        }
        supabase.table("inventory").insert(new_item).execute()
        return {"status": "item_added"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/inventory/{telegram_id}")
async def get_inventory(telegram_id: int):
    """Получение всех предметов игрока"""
    try:
        user_res = supabase.table("profiles").select("id").eq("telegram_id", telegram_id).single().execute()
        profile_id = user_res.data["id"]
        
        res = supabase.table("inventory").select("*").eq("player_id", profile_id).execute()
        return res.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 10001))
    uvicorn.run(app, host="0.0.0.0", port=port)
