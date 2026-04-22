// MathX Infinity - Core Engine 5.0 (Full Backend & Haptics)

const I18N = {
    ru: {
        play: "ИГРАТЬ", daily_level: "ВЫЗОВ", battle: "БИТВА", shop: "МАГАЗИН", stats: "ИНФО",
        hint: "ПОДСКАЗКА", claim: "ЗАБРАТЬ", ranking: "РЕЙТИНГ", settings: "НАСТРОЙКИ",
        level_label: "УРОВЕНЬ", next_level: "ДАЛЬШЕ", to_menu: "В главное меню",
        rules_title: "Правила игры", battle_title: "БИТВА", daily_title: "ВЫЗОВ ДНЯ",
        opponent: "ПРОТИВНИК", battle_win: "ВЫ ПОБЕДИЛИ!", battle_lose: "ВЫ ПРОИГРАЛИ",
        easy: "ЛЕГКО", medium: "СРЕДНЕ", hard: "СЛОЖНО", expert: "ЭКСПЕРТ",
        paused: "ПАУЗА", resume: "ПРОДОЛЖИТЬ", gallery: "ГАЛЕРЕЯ", missions: "ЗАДАНИЯ",
        music: "Музыка", sound: "Звуки", theme: "Тема", daily_reward: "Ежедневный Бонус", language: "Язык",
        theme_onyx: "Оникс", theme_light: "Светлая", theme_amethyst: "Аметист", theme_paper: "Бумага", theme_telegram: "Телеграм", theme_starry: "Звёзды", theme_cyberpunk: "Киберпанк",
        rules_text_1: "1. <b>Цель:</b> Заполни пустые клетки цифрами от 1 до 9 так, чтобы все уравнения по горизонтали и вертикали стали верными.",
        rules_text_2: "2. <b>Порядок действий:</b> Все вычисления производятся строго <b>слева направо</b> и <b>сверху вниз</b>. Приоритет умножения и деления игнорируется.",
        rules_text_3: "3. <b>Бустеры:</b> Подсказка (1 клетка), Кристалл (3 клетки), Магнит (вписывает цифру в выбранную клетку) и Заморозка (остановка времени на 15с).",
        rules_text_4: "4. <b>Вызов дня:</b> Особый сложный уровень. Пройди его, чтобы получить много монет и редкий Кристалл!",
        rules_text_5: "5. <b>Ежедневный бонус:</b> Заходи в игру каждый день и забирай бесплатные монеты в главном меню!",
        rules_text_6: "6. <b>Серия побед:</b> Заходи 7 дней подряд, чтобы получать x2 Опыта (XP) за каждый уровень!",
        rules_text_7: "7. <b>Галерея:</b> Решай уровни, чтобы открывать кусочки артов-пазлов. Полностью собранный арт можно скачать!",
        missions_desc: "Выполняй задачи и получай монеты!", gallery_title: "Галерея артов",
        vs_bot: "Играть с Ботом", vs_bot_desc: "Тренируйся и зарабатывай монеты",
        vs_friend: "Играть с Другом", vs_friend_duel_desc: "Вызови друга на дуэль и сразись за монеты!",
        invite_duel: "Вызвать на дуэль",
        bot_easy: "Легкий Бот", bot_med: "Средний Бот", bot_hard: "Жесткий Бот",
        reward: "Награда:", bot_faster: "Противник оказался быстрее!", stake: "Ставка",
        levels_desc: "Выбор уровня", player_rank: "РАНГ ИГРОКА", stats_solved: "Решено уровней", stats_crystals: "Кристаллы", stats_referrals: "Приглашено друзей",
        shop_boosters: "БУСТЕРЫ", shop_themes: "ТЕМЫ",
        pack_hints: "Пак подсказок", pack_hints_desc: "5 быстрых решений",
        pack_crystals: "Пак кристаллов", pack_crystals_desc: "3 супер-подсказки",
        pack_freeze: "Заморозка", pack_freeze_desc: "Стоп таймер (15с)",
        pack_magnet: "Магнит", pack_magnet_desc: "Притянет нужную цифру",
        invite: "Пригласить друга", invite_desc: "И получи +100 монет",
        theme_paper_desc: "Стиль тетради", theme_amethyst_desc: "Космический фиолетовый",
        theme_starry_desc: "Мерцающее ночное небо", theme_cyberpunk_desc: "Неон и глитч-эффекты",
        theme_matrix: "Матрица", theme_matrix_desc: "Хакерский зеленый код",
        theme_sunset: "Закат", theme_sunset_desc: "Теплый летний вечер",
        theme_neon: "Неон", theme_neon_desc: "Кислотные цвета будущего",
        level_select: "Выберите уровень", level_complete: "УРОВЕНЬ ПРОЙДЕН!", close: "ЗАКРЫТЬ",
        daily_reward_desc: "+200 <span class='coin-icon' aria-hidden='true' style='width:14px; height:14px;'></span> и Кристалл", battle_lobby: "Режим Битвы", player_name: "Игрок"
    },
    en: {
        play: "PLAY", daily_level: "CHALLENGE", battle: "BATTLE", shop: "SHOP", stats: "STATS",
        hint: "HINT", claim: "CLAIM", ranking: "RANKING", settings: "SETTINGS",
        level_label: "LEVEL", next_level: "NEXT", to_menu: "Back to Menu",
        rules_title: "Rules", battle_title: "BATTLE", daily_title: "DAILY CHALLENGE",
        opponent: "OPPONENT", battle_win: "YOU WON!", battle_lose: "YOU LOST",
        easy: "EASY", medium: "MEDIUM", hard: "HARD", expert: "EXPERT",
        paused: "PAUSED", resume: "RESUME", gallery: "GALLERY", missions: "MISSIONS",
        music: "Music", sound: "Sound", theme: "Theme", daily_reward: "Daily Reward", language: "Language",
        theme_onyx: "Onyx", theme_light: "Light", theme_amethyst: "Amethyst", theme_paper: "Paper", theme_telegram: "Telegram", theme_starry: "Starry", theme_cyberpunk: "Cyberpunk",
        rules_text_1: "1. <b>Goal:</b> Fill empty cells with numbers 1 to 9 so that all horizontal and vertical equations are correct.",
        rules_text_2: "2. <b>Order of Operations:</b> All calculations are strictly <b>left to right</b> and <b>top to bottom</b>. Multiplication and division priority is ignored.",
        rules_text_3: "3. <b>Boosters:</b> Hint (1 cell), Crystal (3 cells), Magnet (pulls correct number) and Freeze (stops timer for 15s).",
        rules_text_4: "4. <b>Daily Challenge:</b> A special hard level. Beat it to get many coins and a rare Crystal!",
        rules_text_5: "5. <b>Daily Bonus:</b> Enter the game every day and claim free coins in the main menu!",
        rules_text_6: "6. <b>Win Streak:</b> Enter 7 days in a row to get x2 XP for every level!",
        missions_desc: "Complete tasks and earn coins!", gallery_title: "Art Gallery",
        vs_bot: "Play vs Bot", vs_bot_desc: "Practice and earn coins",
        vs_friend: "Play vs Friend", vs_friend_desc: "Multiplayer coming soon!",
        bot_easy: "Easy Bot", bot_med: "Medium Bot", bot_hard: "Hard Bot",
        reward: "Reward:", bot_faster: "The opponent was faster!", stake: "Stake",
        levels_desc: "Level Selection", player_rank: "PLAYER RANK", stats_solved: "Solved Levels", stats_crystals: "Crystals", stats_referrals: "Friends invited",
        shop_boosters: "BOOSTERS", shop_themes: "THEMES",
        pack_hints: "Hint Pack", pack_hints_desc: "5 quick solutions",
        pack_crystals: "Crystal Pack", pack_crystals_desc: "3 super-hints",
        pack_freeze: "Freeze", pack_freeze_desc: "Stop timer (15s)",
        pack_magnet: "Magnet", pack_magnet_desc: "Pulls correct number",
        invite: "Invite a Friend", invite_desc: "And get +100 coins",
        theme_paper_desc: "Notebook style", theme_amethyst_desc: "Cosmic purple",
        theme_starry_desc: "Twinkling night sky", theme_cyberpunk_desc: "Neon and glitch effects",
        theme_matrix: "Matrix", theme_matrix_desc: "Hacker green code",
        theme_sunset: "Sunset", theme_sunset_desc: "Warm summer evening",
        theme_neon: "Neon", theme_neon_desc: "Acid colors of future",
        level_select: "Select Level", level_complete: "LEVEL COMPLETED!", close: "CLOSE", download: "Download",
        rules_text_7: "7. <b>Gallery:</b> Solve levels to unlock puzzle pieces of art. A fully assembled art can be downloaded!",
        daily_reward_desc: "+200 <span class='coin-icon' aria-hidden='true' style='width:14px; height:14px;'></span> & Crystal", battle_lobby: "Battle Lobby", player_name: "Player"
    }
};

let state = {
    lang: localStorage.getItem('mx_lang') || (navigator.language.startsWith('ru') ? 'ru' : 'en'),
    theme: localStorage.getItem('mx_theme') || 'onyx',
    coins: parseInt(localStorage.getItem('mx_coins') || '100'),
    xp: parseInt(localStorage.getItem('mx_xp') || '0'),
    level: parseInt(localStorage.getItem('mx_level') || '1'),
    unlocked: parseInt(localStorage.getItem('mx_unlocked') || '1'),
    unlockedMedium: parseInt(localStorage.getItem('mx_unlocked_medium') || '1'),
    unlockedHard: parseInt(localStorage.getItem('mx_unlocked_hard') || '1'),
    unlockedExpert: parseInt(localStorage.getItem('mx_unlocked_expert') || '1'),
    streak: parseInt(localStorage.getItem('mx_streak') || '0'),
    dailyCompleted: localStorage.getItem('mx_daily_completed') === 'true',
    inventory: JSON.parse(localStorage.getItem('mx_inv') || '{"hints":3,"freezes":0,"crystals":0,"themes":["onyx","light","telegram"]}'),
    lastDaily: localStorage.getItem('mx_last_daily') || '',
    lastBonus: localStorage.getItem('mx_last_bonus') || '',
    lastMissionsReset: localStorage.getItem('mx_last_missions') || '',
    todaySolved: parseInt(localStorage.getItem('mx_today_solved') || '0'),
    lastSolvedDate: localStorage.getItem('mx_last_solved_date') || '',
    stats: (() => {
        const saved = JSON.parse(localStorage.getItem('mx_stats') || 'null');
        if (saved && saved.totalSolved > 0) return saved;
        const currentXp = parseInt(localStorage.getItem('mx_xp') || '0');
        return { totalSolved: Math.floor(currentXp / 20) };
    })(),
    // Detailed transaction history
    transactions: JSON.parse(localStorage.getItem('mx_transactions') || '{"earned":{},"spent":{}}'),
    activeSession: JSON.parse(localStorage.getItem('mx_active_session') || 'null'),
    currentDiffTab: 'easy',
    isGameActive: false,
    isBattle: false,
    isDaily: false,
    secondsElapsed: 0,
    timerInterval: null,
    botInterval: null,
    selected: null,
    currentAnswers: {},
    fixedCells: {},
    lastGeneratedGrid: null,
    isFrozen: false,
    diff: 'easy',
    currentLevelNum: 1,
    battleStake: 0,
    battleBotDiff: null,
    pendingPvp: null,
    externalNavigationUntil: 0,
    effectsResumeTimer: null,
    handledLaunchParam: ''
};

const tg = window.Telegram?.WebApp || { 
    ready: () => {}, expand: () => {}, 
    HapticFeedback: { impactOccurred: () => {}, notificationOccurred: () => {} },
    initDataUnsafe: { user: { first_name: "", id: 12345 } }
};

try {
    tg.ready?.();
    tg.expand?.();
} catch (e) {
    console.warn('[TG] WebApp init failed', e);
}

const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? '' : '/math';
const WS_URL = window.location.protocol === 'https:' ? `wss://${window.location.host}/math/ws/pvp` : `ws://${window.location.host}/ws/pvp`;
const BOT_USERNAME = 'mathx_infinity_bot';
const MINI_APP_SHORT_NAME = 'app';
const COIN_ICON_HTML = '<span class="coin-icon" aria-hidden="true"></span>';
console.log('🚀 MathX v5.0 Loaded - API:', API_URL);

// --- PVP Client ---
const PVPClient = {
    socket: null,
    roomId: null,
    opponentData: null,
    readyPlayers: {},
    pendingJoin: null,
    reconnectTimer: null,
    
    connect() {
        if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) return;
        const url = `${WS_URL}/${ServerAPI.getTId()}`;
        this.socket = new WebSocket(url);
        
        this.socket.onopen = () => {
            console.log('[PVP] Connected');
            if (this.reconnectTimer) {
                clearTimeout(this.reconnectTimer);
                this.reconnectTimer = null;
            }
            this.flushPendingJoin();
        };
        this.socket.onerror = (event) => {
            console.error('[PVP] Socket error', event);
        };
        this.socket.onmessage = (e) => {
            const msg = JSON.parse(e.data);
            this.handleMessage(msg);
        };
        this.socket.onclose = () => {
            console.log('[PVP] Disconnected');
            this.socket = null;
            if (state.pendingPvp && !state.isBattle) {
                setBattleLobbyStatus(state.lang === 'ru' ? 'Переподключаем дуэль...' : 'Reconnecting duel...');
                if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
                this.reconnectTimer = setTimeout(() => this.connect(), 1200);
            }
        };
    },

    flushPendingJoin() {
        if (!this.pendingJoin || !this.socket || this.socket.readyState !== WebSocket.OPEN) return;
        this.socket.send(JSON.stringify({
            action: 'join_room',
            room_id: this.pendingJoin.roomId,
            difficulty: this.pendingJoin.diff,
            stake: this.pendingJoin.stake || state.pendingPvp?.stake || state.battleStake || 50,
            name: tg.initDataUnsafe?.user?.first_name || I18N[state.lang].player_name
        }));
    },
    
    handleMessage(msg) {
        if (msg.status === 'joined') {
            this.roomId = msg.room_id;
            this.pendingJoin = null;
            setBattleLobbyStatus(state.lang === 'ru' ? 'Ссылка активна. Ожидаем соперника...' : 'Invite is active. Waiting for opponent...');
            showToast(state.lang === 'ru' ? 'Ожидание соперника...' : 'Waiting for opponent...');
        } else if (msg.status === 'start') {
            this.pendingJoin = null;
            state.battleStake = msg.stake || state.pendingPvp?.stake || state.battleStake;
            if (state.pendingPvp && !state.pendingPvp.stakeCharged) state.pendingPvp.stakeCharged = true;
            setBattleLobbyStatus('');
            this.opponentData = Object.values(msg.players).find(p => p.name !== (tg.initDataUnsafe?.user?.first_name || I18N[state.lang].player_name));
            showToast(state.lang === 'ru' ? 'Битва начинается!' : 'Battle starts!');
            Haptics.success();
            refreshProfileState();
            startLevel(msg.difficulty || 'easy', 'BATTLE', msg.seed);
        } else if (msg.status === 'opponent_update') {
            const fill = document.getElementById('opponent-progress-fill');
            const text = document.getElementById('opponent-progress-text');
            if (fill) fill.style.width = `${msg.progress}%`;
            if (text) text.textContent = `${Math.round(msg.progress)}%`;
        } else if (msg.status === 'lobby') {
            this.roomId = msg.room_id;
            this.readyPlayers = msg.ready_players || {};
            const readyCount = Object.values(this.readyPlayers).filter(Boolean).length;
            setBattleLobbyStatus(state.lang === 'ru'
                ? `Игроки в комнате: ${msg.player_count}/2. Готовы: ${readyCount}/2`
                : `Players in room: ${msg.player_count}/2. Ready: ${readyCount}/2`);
        } else if (msg.status === 'cancelled') {
            this.pendingJoin = null;
            state.pendingPvp = null;
            this.roomId = null;
            const cancelText = msg.reason === 'insufficient_coins'
                ? (state.lang === 'ru' ? 'У одного из игроков не хватило монет.' : 'One of the players does not have enough coins.')
                : (state.lang === 'ru' ? 'Ожидание отменено.' : 'Waiting cancelled.');
            setBattleLobbyStatus(cancelText);
            refreshProfileState();
            showToast(cancelText);
        } else if (msg.status === 'timeout') {
            state.pendingPvp = null;
            this.roomId = null;
            refreshProfileState();
            if (msg.winner_id === ServerAPI.getTId()) {
                const rewardEl = document.getElementById('battle-reward');
                if (rewardEl && state.battleStake) rewardEl.textContent = String(state.battleStake * 2);
                setBattleLobbyStatus('');
                showModal('battle-result');
            } else {
                setBattleLobbyStatus(state.lang === 'ru' ? 'Комната закрыта по таймауту.' : 'Room closed by timeout.');
                showToast(state.lang === 'ru' ? 'Таймаут ожидания дуэли.' : 'Duel lobby timed out.');
            }
        } else if (msg.status === 'room_unavailable') {
            this.pendingJoin = null;
            state.pendingPvp = null;
            setBattleLobbyStatus(state.lang === 'ru' ? 'Эта комната уже занята или завершена.' : 'This duel room is already busy or finished.');
            showToast(state.lang === 'ru' ? 'Комната уже недоступна.' : 'This duel room is unavailable.');
        } else if (msg.status === 'opponent_left') {
            state.pendingPvp = null;
            setBattleLobbyStatus(state.lang === 'ru' ? 'Соперник вышел. Можно отправить новую ссылку.' : 'Opponent left. You can send a new invite.');
            if (!state.isBattle) {
                showToast(state.lang === 'ru' ? 'Соперник вышел из лобби.' : 'Opponent left the lobby.');
            }
        } else if (msg.status === 'game_over') {
            state.pendingPvp = null;
            setBattleLobbyStatus('');
            refreshProfileState();
            const rewardEl = document.getElementById('battle-reward');
            if (rewardEl && msg.stake) rewardEl.textContent = String(msg.stake * 2);
            if (msg.winner_id === ServerAPI.getTId()) {
                // We won handled locally
            } else {
                Haptics.error();
                clearInterval(state.timerInterval);
                showModal('battle-lost');
            }
        } else if (msg.status === 'rematch_waiting') {
            setBattleLobbyStatus(state.lang === 'ru' ? 'Ждём подтверждение реванша от второго игрока...' : 'Waiting for the second player to accept rematch...');
        }
    },
    
    joinRoom(roomId, diff) {
        this.pendingJoin = {
            roomId,
            diff,
            stake: state.pendingPvp?.stake || state.battleStake || 50
        };
        this.roomId = roomId;
        this.connect();
        this.flushPendingJoin();
    },
    
    sendProgress(p) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({ action: 'update_progress', progress: p }));
        }
    },

    sendReady() {
        if (this.socket && this.socket.readyState === WebSocket.OPEN && this.roomId) {
            this.socket.send(JSON.stringify({ action: 'ready', room_id: this.roomId }));
        }
    },

    cancelRoom() {
        if (this.socket && this.socket.readyState === WebSocket.OPEN && this.roomId) {
            this.socket.send(JSON.stringify({ action: 'cancel_room', room_id: this.roomId }));
        }
    },

    requestRematch() {
        if (this.socket && this.socket.readyState === WebSocket.OPEN && this.roomId) {
            this.socket.send(JSON.stringify({ action: 'rematch', room_id: this.roomId }));
        }
    },
    
    sendWin() {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({ action: 'win' }));
        }
    }
};

const ServerAPI = {
    get isTelegram() { return typeof tg !== 'undefined' && tg.initDataUnsafe?.user; },
    get enabled() { return this.isTelegram || (window.location.hostname === 'localhost'); },
    getTId() { return this.isTelegram ? tg.initDataUnsafe.user.id : 12345; },
    async call(path, method = 'GET', body = null) {
        if (!this.enabled) return null;
        try {
            const options = { method, headers: { 'Content-Type': 'application/json' } };
            if (body) options.body = JSON.stringify(body);
            const endpoint = `${API_URL}${path.startsWith('/') ? path : '/' + path}`;
            const res = await fetch(endpoint, options);
            if (!res.ok) {
                console.error(`[API] Error ${endpoint}:`, res.status);
                return null;
            }
            const data = await res.json();
            console.log(`[API] Success ${endpoint}:`, data);
            return data;
        } catch (e) { 
            console.error(`[API] Fetch failed ${path}:`, e);
            return null; 
        }
    },
    async auth(user, extra = {}) { 
        return this.call('/auth', 'POST', { telegram_id: user.id, username: user.username, display_name: user.first_name, ...extra }); 
    },
    async getStats() { return this.call(`/stats/${this.getTId()}`); },
    async getMissions() { return this.call(`/missions/${this.getTId()}`); },
    async claimMission(mId) { return this.call('/missions/claim', 'POST', { telegram_id: this.getTId(), mission_id: mId }); },
    async getLeaderboard() { return this.call('/leaderboard'); },
    async sync() { 
        return this.call('/sync', 'POST', { 
            telegram_id: this.getTId(), 
            coins: state.coins, 
            xp: state.xp, 
            level: state.level, 
            streak: state.streak,
            unlocked_easy: state.unlocked,
            unlocked_medium: state.unlockedMedium,
            unlocked_hard: state.unlockedHard,
            unlocked_expert: state.unlockedExpert,
            theme: state.theme,
            owned_themes: state.inventory.themes || ["onyx", "light", "telegram"],
            hints: state.inventory.hints || 0,
            crystals: state.inventory.crystals || 0,
            freezes: state.inventory.freezes || 0
        }); 
    },
    async saveScore(diff, time, points) {
        return this.call('/score', 'POST', {
            telegram_id: this.getTId(),
            difficulty: diff,
            solve_time: time,
            points: points
        });
    },
    async addToInventory(type, name) {
        return this.call('/inventory/add', 'POST', {
            telegram_id: this.getTId(),
            item_type: type,
            item_name: name
        });
    }
};

// Haptics Helper
const Haptics = {
    light: () => { try { tg.HapticFeedback?.impactOccurred('light'); } catch(e) {} },
    medium: () => { try { tg.HapticFeedback?.impactOccurred('medium'); } catch(e) {} },
    success: () => { try { tg.HapticFeedback?.notificationOccurred('success'); } catch(e) {} },
    error: () => { try { tg.HapticFeedback?.notificationOccurred('error'); } catch(e) {} },
    warning: () => { try { tg.HapticFeedback?.notificationOccurred('warning'); } catch(e) {} }
};

function applyLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (I18N[state.lang] && I18N[state.lang][key]) el.innerHTML = I18N[state.lang][key];
    });
}

function applyTheme(t) { 
    state.theme = t;
    const bodyClasses = [];
    if (ServerAPI.isTelegram) bodyClasses.push('telegram-mini-app');
    bodyClasses.push(`theme-${t}`);
    const nextClassName = bodyClasses.join(' ');
    if (document.body.className !== nextClassName) {
        document.body.className = nextClassName;
    }
    localStorage.setItem('mx_theme', t);
    document.querySelectorAll('.theme-circle').forEach(c => {
        c.classList.toggle('active', c.dataset.theme === t);
    });
    document.querySelectorAll('.theme-option').forEach(o => {
        o.querySelector('.theme-circle').classList.toggle('active', o.dataset.theme === t);
    });
}

function updateUI() {
    const userNameEl = document.getElementById('user-name');
    if (userNameEl) {
        const tgName = tg.initDataUnsafe?.user?.first_name;
        userNameEl.textContent = (tgName && tgName !== "Игрок") ? tgName : I18N[state.lang].player_name;
    }

    const hubCoins = document.getElementById('hub-coins');
    if (hubCoins) hubCoins.textContent = state.coins;
    
    const userLv = document.getElementById('user-level-tag');
    if (userLv) userLv.textContent = `${state.lang === 'ru' ? 'УР.' : 'LVL.'} ${state.level}`;

    const diffTag = document.getElementById('difficulty-tag');
    if (diffTag && state.diff) diffTag.textContent = I18N[state.lang][state.diff] || state.diff.toUpperCase();

    const levelTitle = document.getElementById('level-title');
    if (levelTitle) {
        if (state.isDaily) levelTitle.textContent = I18N[state.lang].daily_title;
        else if (state.isBattle) levelTitle.textContent = I18N[state.lang].battle_title;
        else levelTitle.textContent = `${I18N[state.lang].level_label} ${state.currentLevelNum}`;
    }

    // Update daily card
    const dailyTitle = document.getElementById('daily-title');
    const dailySubtitle = document.getElementById('daily-subtitle');
    const today = getLocalDateStr();
    const isDailyFullyCompleted = state.lastDaily === today && state.dailyCompleted;
    if (dailyTitle && dailySubtitle) {
        if (isDailyFullyCompleted) {
            dailyTitle.textContent = state.lang === 'ru' ? 'ВЫЗОВ ВЫПОЛНЕН' : 'CHALLENGE DONE';
            dailySubtitle.innerHTML = `<span style="color: #00ff88;">✓</span> ${getTimeToMidnight()}`;
        } else {
            dailyTitle.textContent = I18N[state.lang].daily_level;
            dailySubtitle.style.textAlign = 'left';
            dailySubtitle.innerHTML = `+200 <span class="coin-icon"></span> ${state.lang === 'ru' ? 'и Кристалл' : '& Crystal'}<br><span style="font-size:0.75rem; color:rgba(255,255,255,0.7);">${getTimeToMidnight()} ${state.lang === 'ru' ? 'до смены' : 'until reset'}</span>`;
        }
    }

    const streakTextEl = document.getElementById('streak-text');
    if (streakTextEl) {
        streakTextEl.textContent = state.lang === 'ru' ? `Серия: ${state.streak} дней` : `Streak: ${state.streak} days`;
    }

    const hintText = document.querySelector('#hint-btn span');
    if (hintText) hintText.textContent = `${I18N[state.lang].hint} (${state.inventory.hints})`;

    const freezeCount = document.getElementById('freeze-count');
    if (freezeCount) freezeCount.textContent = state.inventory.freezes;

    const crystalCount = document.getElementById('crystal-count');
    if (crystalCount) crystalCount.textContent = state.inventory.crystals;

    const magnetCount = document.getElementById('magnet-count');
    if (magnetCount) magnetCount.textContent = state.inventory.magnets || 0;

    const musicBtn = document.getElementById('toggle-music-btn');
    if (musicBtn && typeof AudioManager !== 'undefined') {
        musicBtn.textContent = AudioManager.isMusicOff ? (state.lang === 'ru' ? 'ВЫКЛ' : 'OFF') : (state.lang === 'ru' ? 'ВКЛ' : 'ON');
    }

    const soundBtn = document.getElementById('toggle-sound-btn');
    if (soundBtn && typeof AudioManager !== 'undefined') {
        soundBtn.textContent = AudioManager.isMuted ? (state.lang === 'ru' ? 'ВЫКЛ' : 'OFF') : (state.lang === 'ru' ? 'ВКЛ' : 'ON');
    }

    const pauseBtn = document.getElementById('pause-game-btn');
    if (pauseBtn) pauseBtn.style.display = state.isBattle ? 'none' : 'flex';

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.style.border = btn.dataset.lang === state.lang ? '2px solid var(--accent)' : '1px solid var(--glass-border)';
        btn.style.background = btn.dataset.lang === state.lang ? 'var(--accent-glow)' : 'var(--glass)';
    });

    const now = new Date();
    const bonusAvailable = state.lastBonus !== getLocalDateStr();
    const claimNotif = document.getElementById('claim-notif');
    if (claimNotif) claimNotif.style.display = bonusAvailable ? 'block' : 'none';
    
    const modalClaimBtn = document.getElementById('claim-btn');
    if (modalClaimBtn) {
        modalClaimBtn.classList.toggle('disabled', !bonusAvailable);
        if (!bonusAvailable) {
            modalClaimBtn.innerHTML = state.lang === 'ru' ? 'ПОЛУЧЕНО' : 'CLAIMED';
        } else {
            modalClaimBtn.innerHTML = `<span data-i18n="claim">${I18N[state.lang].claim}</span> <span id="reward-amount">50</span> ${COIN_ICON_HTML}`;
        }
    }

    document.querySelectorAll('#theme-selector .theme-circle').forEach(circle => {
        const theme = circle.dataset.theme;
        const isOwned = state.inventory.themes.includes(theme);
        const option = circle.closest('.theme-option');
        if (option) option.classList.toggle('hidden', !isOwned);
        circle.classList.toggle('active', theme === state.theme);
        circle.title = I18N[state.lang][`theme_${theme}`] || theme;
    });
}

let saveTimeout = null;
function saveData() {
    localStorage.setItem('mx_coins', state.coins);
    localStorage.setItem('mx_xp', state.xp);
    localStorage.setItem('mx_level', state.level);
    localStorage.setItem('mx_unlocked', state.unlocked);
    localStorage.setItem('mx_unlocked_medium', state.unlockedMedium);
    localStorage.setItem('mx_unlocked_hard', state.unlockedHard);
    localStorage.setItem('mx_unlocked_expert', state.unlockedExpert);
    localStorage.setItem('mx_inv', JSON.stringify(state.inventory));
    localStorage.setItem('mx_last_daily', state.lastDaily);
    localStorage.setItem('mx_daily_completed', state.dailyCompleted ? 'true' : 'false');
    localStorage.setItem('mx_last_bonus', state.lastBonus);
    localStorage.setItem('mx_streak', state.streak);
    localStorage.setItem('mx_today_solved', state.todaySolved);
    localStorage.setItem('mx_last_solved_date', state.lastSolvedDate);
    localStorage.setItem('mx_stats', JSON.stringify(state.stats));
    localStorage.setItem('mx_transactions', JSON.stringify(state.transactions));
    localStorage.setItem('mx_active_session', JSON.stringify(state.activeSession));
    
    // Debounce server sync
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        ServerAPI.sync();
    }, 1000);
}

// Transaction tracking helper
function addTransaction(type, category, amount) {
    const today = getLocalDateStr();
    if (!state.transactions[type]) state.transactions[type] = {};
    if (!state.transactions[type][category]) state.transactions[type][category] = {};
    if (!state.transactions[type][category][today]) state.transactions[type][category][today] = 0;
    state.transactions[type][category][today] += amount;
}

function getTelegramStartParam() {
    const tgParam = tg.initDataUnsafe?.start_param;
    if (tgParam) return tgParam;

    const search = new URLSearchParams(window.location.search);
    const hash = new URLSearchParams((window.location.hash || '').replace(/^#/, ''));
    const initData = new URLSearchParams(tg.initData || '');
    const hrefMatch = (window.location.href || '').match(/(?:tgWebAppStartParam|startapp|start_param)=([^&#]+)/);
    return search.get('tgWebAppStartParam')
        || search.get('startapp')
        || search.get('start_param')
        || hash.get('tgWebAppStartParam')
        || hash.get('startapp')
        || hash.get('start_param')
        || initData.get('start_param')
        || (hrefMatch ? decodeURIComponent(hrefMatch[1]) : '')
        || '';
}

function getStoredLaunchParam() {
    try {
        return sessionStorage.getItem('mx_pending_start_param') || '';
    } catch (e) {
        return '';
    }
}

function storeLaunchParam(startParam) {
    if (!startParam) return;
    try {
        sessionStorage.setItem('mx_pending_start_param', startParam);
    } catch (e) {}
}

function clearStoredLaunchParam() {
    try {
        sessionStorage.removeItem('mx_pending_start_param');
    } catch (e) {}
}

function parseLaunchData(startParam) {
    if (!startParam) return null;
    if (startParam.startsWith('duel_')) {
        const parts = startParam.split('_');
        return {
            type: 'duel',
            roomId: parts[1],
            diff: parts[2] || 'easy',
            stake: parseInt(parts[3] || '50', 10)
        };
    }
    if (startParam.startsWith('ref_')) {
        const referrerId = parseInt(startParam.slice(4), 10);
        if (!Number.isNaN(referrerId)) return { type: 'ref', referrerId };
    }
    return null;
}

function buildMiniAppLink(startParam = '') {
    const base = `https://t.me/${BOT_USERNAME}/${MINI_APP_SHORT_NAME}`;
    if (!startParam) return base;
    return `${base}?startapp=${encodeURIComponent(startParam)}`;
}

function markExternalNavigation() {
    state.externalNavigationUntil = Date.now() + 12000;
    document.body.classList.add('suspend-effects');
}

function scheduleEffectsResume(delay = 1800) {
    if (state.effectsResumeTimer) clearTimeout(state.effectsResumeTimer);
    state.effectsResumeTimer = setTimeout(() => {
        document.body.classList.remove('suspend-effects');
        state.effectsResumeTimer = null;
    }, delay);
}

function openTelegramShare(targetUrl, shareText) {
    const tgLink = `https://t.me/share/url?url=${encodeURIComponent(targetUrl)}&text=${encodeURIComponent(shareText)}`;
    markExternalNavigation();
    if (typeof tg !== 'undefined' && tg.openTelegramLink) tg.openTelegramLink(tgLink);
    else window.open(tgLink, '_blank', 'noopener');
}

function setBattleLobbyStatus(message = '') {
    const statusEl = document.getElementById('battle-lobby-status');
    if (statusEl) statusEl.textContent = message;
}

async function refreshProfileState() {
    const data = await ServerAPI.getStats();
    if (!data) return;
    if (typeof data.coins === 'number') state.coins = data.coins;
    if (typeof data.xp === 'number') state.xp = data.xp;
    if (typeof data.level === 'number') state.level = data.level;
    saveData();
    updateUI();
}

function tryHandleLaunchData() {
    const startParam = getTelegramStartParam() || getStoredLaunchParam();
    if (!startParam) return false;

    storeLaunchParam(startParam);
    if (state.handledLaunchParam === startParam) return true;

    const launchData = parseLaunchData(startParam);
    if (!launchData) return false;

    if (launchData.type === 'duel') {
        if (state.pendingPvp?.roomId === launchData.roomId || state.isBattle) {
            state.handledLaunchParam = startParam;
            return true;
        }
        if (state.coins < launchData.stake) {
            showToast(state.lang === 'ru' ? 'Недостаточно монет для дуэли!' : 'Not enough coins for duel!');
            state.handledLaunchParam = startParam;
            clearStoredLaunchParam();
            return true;
        }

        showModal('battle-lobby');
        setBattleLobbyStatus(state.lang === 'ru' ? 'Подключаем к комнате дуэли...' : 'Connecting to duel room...');
        state.battleStake = launchData.stake;
        state.battleBotDiff = null;
        state.pendingPvp = {
            roomId: launchData.roomId,
            diff: launchData.diff,
            stake: launchData.stake,
            stakeCharged: false
        };
        state.handledLaunchParam = startParam;
        clearStoredLaunchParam();
        PVPClient.joinRoom(launchData.roomId, launchData.diff);
        return true;
    }

    return false;
}

window.onload = async () => {
    if (typeof AudioManager !== 'undefined') AudioManager.init();

    const initialStartParam = getTelegramStartParam();
    if (initialStartParam) storeLaunchParam(initialStartParam);
    const launchData = parseLaunchData(initialStartParam || getStoredLaunchParam());
    const authExtras = launchData?.type === 'ref' ? { referred_by: launchData.referrerId } : {};
    const serverData = await ServerAPI.auth(tg.initDataUnsafe.user || { id: 12345 }, authExtras);
    if (serverData?.user) {
        const u = serverData.user;
        state.coins = Math.max(state.coins, u.coins || 0);
        state.xp = Math.max(state.xp, u.xp || 0);
        state.level = Math.max(state.level, u.level || 1);
        state.unlocked = Math.max(state.unlocked, u.unlocked_easy || 1);
        state.unlockedMedium = Math.max(state.unlockedMedium, u.unlocked_medium || 1);
        state.unlockedHard = Math.max(state.unlockedHard, u.unlocked_hard || 1);
        state.unlockedExpert = Math.max(state.unlockedExpert, u.unlocked_expert || 1);
        
        state.inventory.hints = Math.max(state.inventory.hints || 0, u.hints !== null && u.hints !== undefined ? u.hints : 3);
        state.inventory.crystals = Math.max(state.inventory.crystals || 0, u.crystals || 0);
        state.inventory.freezes = Math.max(state.inventory.freezes || 0, u.freezes || 0);
        
        const dbThemes = u.owned_themes || ["onyx", "light", "telegram"];
        const localThemes = state.inventory.themes || ["onyx", "light", "telegram"];
        state.inventory.themes = [...new Set([...localThemes, ...dbThemes])];
        
        if (u.theme && state.inventory.themes.includes(u.theme)) {
            state.theme = u.theme;
        }
        
        state.stats.totalSolved = Math.max(state.stats.totalSolved || 0, 
            (state.unlocked - 1) + (state.unlockedMedium - 1) + (state.unlockedHard - 1) + (state.unlockedExpert - 1)
        );

        saveData();
    }

    applyLanguage();
    applyTheme(state.theme);
    updateUI();
    initApp();
    initShop();

    if (launchData?.type === 'duel') {
        if (state.coins < launchData.stake) {
            showToast(state.lang === 'ru' ? 'Недостаточно монет для дуэли!' : 'Not enough coins for duel!');
        } else {
            showModal('battle-lobby');
            setBattleLobbyStatus(state.lang === 'ru' ? 'Подключаем к комнате дуэли...' : 'Connecting to duel room...');
            state.battleStake = launchData.stake;
            state.battleBotDiff = null;
            state.pendingPvp = {
                roomId: launchData.roomId,
                diff: launchData.diff,
                stake: launchData.stake,
                stakeCharged: false
            };
            PVPClient.joinRoom(launchData.roomId, launchData.diff);
        }
    }
};

window.addEventListener('load', () => {
    tryHandleLaunchData();
    let launchChecks = 0;
    const launchWatcher = setInterval(() => {
        launchChecks += 1;
        if (tryHandleLaunchData() || launchChecks >= 20) clearInterval(launchWatcher);
    }, 400);
});

function safeSetClick(id, fn) { 
    const el = document.getElementById(id); 
    if (el) el.onclick = () => { Haptics.light(); fn(); }; 
}

function initApp() {
    const grid = document.getElementById('math-grid');
    if (grid) grid.onclick = (e) => {
        if (!state.isGameActive) return;
        const cell = e.target.closest('.cell.empty');
        if (cell) {
            Haptics.light();
            if (typeof AudioManager !== 'undefined') AudioManager.playClick();
            selectCell(cell);
        }
    };

    safeSetClick('start-game-btn', () => { showModal('level'); });
    safeSetClick('start-daily-btn', () => { 
        const today = getLocalDateStr();
        const isFullyCompleted = state.lastDaily === today && state.dailyCompleted;
        
        if (isFullyCompleted) {
            showToast(state.lang === 'ru' ? 'Вызов уже выполнен! Жди следующий.' : 'Challenge already done! Wait for next.');
            return;
        }
        
        // Check if there's an active session (user was playing)
        if (state.activeSession && state.activeSession.num === 'Daily' && state.activeSession.diff === 'hard') {
            startLevel('hard', 'Daily');
        } else {
            startLevel('hard', 'Daily');
        }
    });
    safeSetClick('open-battle', () => {
        setBattleLobbyStatus('');
        showModal('battle-lobby');
    });
    safeSetClick('open-daily-bonus', () => { showModal('bonus'); });
    safeSetClick('open-rules-btn', () => { showModal('rules'); });
    safeSetClick('open-leaderboard', () => { showModal('leaderboard'); });
    safeSetClick('open-shop', () => { showModal('shop'); });
    safeSetClick('open-stats', () => { showModal('stats'); });
    safeSetClick('open-missions', () => { showModal('missions'); });
    safeSetClick('open-gallery', () => { showModal('gallery'); });
    safeSetClick('settings-btn-menu', () => { showModal('settings'); });
    safeSetClick('next-level-btn', nextLevel);
    safeSetClick('win-to-menu-btn', () => { closeModal(); switchScreen('menu'); });
    safeSetClick('back-to-menu', handleBackAction);
    safeSetClick('pause-to-menu-btn', () => { 
        closeModal(); 
        clearInterval(state.timerInterval);
        clearInterval(state.botInterval);
        state.isGameActive = false;
        state.activeSession = null;
        localStorage.removeItem('mx_active_session');
        switchScreen('menu');
        updateUI();
        if (typeof AudioManager !== 'undefined') AudioManager.playMusic();
    });
    safeSetClick('pause-game-btn', pauseGame);
    safeSetClick('resume-game-btn', resumeGame);
    safeSetClick('hint-btn', useHint);
    safeSetClick('freeze-btn', useFreeze);
    safeSetClick('crystal-btn', useCrystal);
    safeSetClick('magnet-btn', useMagnet);
    safeSetClick('battle-ready-btn', () => {
        PVPClient.sendReady();
        setBattleLobbyStatus(state.lang === 'ru' ? 'Вы готовы. Ждем второго игрока...' : 'You are ready. Waiting for the second player...');
    });
    safeSetClick('battle-cancel-btn', () => {
        PVPClient.cancelRoom();
        state.pendingPvp = null;
        setBattleLobbyStatus(state.lang === 'ru' ? 'Ожидание отменено.' : 'Waiting cancelled.');
    });
    safeSetClick('battle-rematch-btn', () => {
        PVPClient.requestRematch();
        showModal('battle-lobby');
        setBattleLobbyStatus(state.lang === 'ru' ? 'Запросили реванш...' : 'Rematch requested...');
    });
    safeSetClick('battle-rematch-lost-btn', () => {
        PVPClient.requestRematch();
        showModal('battle-lobby');
        setBattleLobbyStatus(state.lang === 'ru' ? 'Запросили реванш...' : 'Rematch requested...');
    });

    safeSetClick('invite-btn', () => {
        const inviteText = state.lang === 'ru'
            ? 'Спорим, не решишь эту математическую головоломку? Присоединяйся!'
            : "Bet you can't solve this math puzzle! Join now!";
        const inviteUrl = buildMiniAppLink(`ref_${ServerAPI.getTId()}`);
        openTelegramShare(inviteUrl, inviteText);
    });

    safeSetClick('claim-btn', function() {
        const today = getLocalDateStr();
        if (state.lastBonus === today) return;
        
        // Calculate streak bonus
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().slice(0, 10);
        
        const currentStreak = (state.lastBonus === yesterdayStr) ? state.streak + 1 : 1;
        const bonusAmount = 50 * currentStreak;
        
        state.coins += bonusAmount;
        addTransaction('earned', 'daily_bonus', bonusAmount);
        state.streak = currentStreak;
        state.lastBonus = today;
        localStorage.setItem('mx_streak', currentStreak);
        
        Haptics.success();
        saveData(); updateUI(); closeModal();
        
        if (currentStreak > 1) {
            showToast((state.lang === 'ru' ? '🔥 ' : '🔥 ') + currentStreak + (state.lang === 'ru' ? ' день подряд! Бонус x' : ' days in a row! Bonus x') + currentStreak);
        }
    });

    safeSetClick('toggle-music-btn', () => { 
        if (typeof AudioManager !== 'undefined') { AudioManager.toggleMusic(); updateUI(); }
    });
    safeSetClick('toggle-sound-btn', () => { 
        if (typeof AudioManager !== 'undefined') { AudioManager.toggleSound(); updateUI(); }
    });

    document.querySelectorAll('.btn-close-modal').forEach(b => {
        if (!b.id || (b.id !== 'pause-to-menu-btn' && b.id !== 'win-to-menu-btn')) {
            b.onclick = () => { 
                Haptics.light(); 
                const wasLevelModal = !document.getElementById('level-modal').classList.contains('hidden');
                closeModal();
                if (wasLevelModal) {
                    switchScreen('menu');
                    state.isGameActive = false;
                    state.activeSession = null;
                    localStorage.removeItem('mx_active_session');
                    updateUI();
                }
            };
        }
    });

    document.querySelectorAll('.bot-btn').forEach(btn => {
        btn.onclick = () => {
            Haptics.light();
            const stake = parseInt(btn.dataset.stake);
            if (state.coins < stake) { Haptics.error(); return alert('Недостаточно монет!'); }
            state.coins -= stake;
            addTransaction('spent', 'battle', stake);
            state.battleStake = stake;
            state.battleBotDiff = btn.dataset.diff;
            startLevel(btn.dataset.diff === 'hard' ? 'hard' : (btn.dataset.diff === 'easy' ? 'easy' : 'medium'), 'BATTLE');
        };
    });

    document.querySelectorAll('.diff-tab').forEach(t => {
        t.onclick = () => {
            Haptics.light();
            document.querySelectorAll('.diff-tab').forEach(x => x.classList.remove('active'));
            t.classList.add('active');
            state.currentDiffTab = t.dataset.diff;
            renderLevelMap();
        };
    });

    document.querySelectorAll('.theme-option').forEach(btn => {
        btn.onclick = () => { 
            Haptics.medium(); 
            const theme = btn.dataset.theme;
            if (state.inventory.themes.includes(theme)) {
                applyTheme(theme); 
            }
        };
    });

    const duelInviteBtn = document.querySelectorAll('.duel-invite-btn');
    duelInviteBtn.forEach(btn => {
        btn.onclick = () => {
            const stake = parseInt(btn.dataset.stake);
            if (state.coins < stake) { Haptics.error(); return showToast(state.lang === 'ru' ? 'Недостаточно монет!' : 'Not enough coins!'); }
            
            const roomId = Math.random().toString(36).substring(2, 10);
            const diff = state.currentDiffTab || 'easy';
            const duelLink = buildMiniAppLink(`duel_${roomId}_${diff}_${stake}`);
            const inviteText = state.lang === 'ru'
                ? `ВЫЗЫВАЮ ТЕБЯ НА ДУЭЛЬ! Ставка: ${stake} монет.`
                : `I CHALLENGE YOU TO A DUEL! Stake: ${stake} coins.`;

            state.battleStake = stake;
            state.battleBotDiff = null;
            state.pendingPvp = { roomId, diff, stake, stakeCharged: false };
            showModal('battle-lobby');
            PVPClient.joinRoom(roomId, diff);
            setBattleLobbyStatus(state.lang === 'ru' ? 'Ссылка отправляется другу...' : 'Sending invite link...');

            openTelegramShare(duelLink, inviteText);
        };
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.onclick = () => {
            Haptics.medium();
            state.lang = btn.dataset.lang;
            localStorage.setItem('mx_lang', state.lang);
            applyLanguage(); updateUI();
            if (state.isGameActive) renderGrid(state.lastGeneratedGrid);
            renderLevelMap();
        };
    });

    renderNumberPad();
}

function handleBackAction() {
    closeModal();
    clearInterval(state.timerInterval);
    clearInterval(state.botInterval);
    state.isGameActive = false;
    // Save current progress before leaving
    saveCurrentToSession(true);
    
    // Only go to level list for regular levels (not daily or battle)
    if (!state.isDaily && !state.isBattle) {
        showModal('level');
    } else {
        switchScreen('menu');
    }
    
    updateUI();
    if (typeof AudioManager !== 'undefined') AudioManager.playMusic();
}

function nextLevel() {
    closeModal();
    if (state.isDaily) {
        switchScreen('menu');
    } else if (state.isBattle) {
        startLevel(state.diff, 'BATTLE');
    } else {
        startLevel(state.diff, state.currentLevelNum + 1);
    }
}

function initShop() {
    const tabs = document.querySelectorAll('.shop-tab');
    tabs.forEach(tab => {
        tab.onclick = () => {
            Haptics.light();
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const cat = tab.dataset.tab;
            document.querySelectorAll('.shop-item').forEach(item => {
                item.classList.toggle('hidden', item.dataset.category !== cat);
            });
        };
    });

    const updateShopButtons = () => {
        document.querySelectorAll('.buy-btn').forEach(btn => {
            const id = btn.dataset.id;
            if (id && id.startsWith('theme_')) {
                const themeName = id.replace('theme_', '');
                if (state.inventory.themes.includes(themeName)) {
                    btn.textContent = state.lang === 'ru' ? 'Куплено' : 'Owned';
                    btn.classList.add('disabled');
                }
            }
        });
    };

    document.querySelectorAll('.buy-btn').forEach(btn => {
        btn.onclick = async () => {
            const id = btn.dataset.id;
            const price = parseInt(btn.dataset.price);
            if (!id || !price) return;
            if (id.startsWith('theme_') && state.inventory.themes.includes(id.replace('theme_', ''))) return;
            if (state.coins < price) { Haptics.error(); return alert('Недостаточно монет!'); }
            
            Haptics.warning();
            if (!confirm(state.lang === 'ru' ? `Купить за ${price}?` : `Buy for ${price}?`)) return;

            state.coins -= price;
            addTransaction('spent', id, price);
            if (id.startsWith('hint')) state.inventory.hints += (id === 'hint_5' ? 5 : 1);
            else if (id === 'freeze') state.inventory.freezes++;
            else if (id.startsWith('crystal')) state.inventory.crystals += (id === 'crystal_3' ? 3 : 1);
            else if (id === 'magnet') state.inventory.magnets = (state.inventory.magnets || 0) + 1;
            else if (id.startsWith('theme_')) {
                const themeName = id.replace('theme_', '');
                state.inventory.themes.push(themeName);
                ServerAPI.addToInventory('theme', themeName);
            }

            Haptics.success();
            saveData(); updateUI(); updateShopButtons();
        };
    });
    updateShopButtons();
}

function switchScreen(screen) {
    if (screen === 'menu' && state.isGameActive && !state.isBattle) saveCurrentToSession();
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(`${screen}-screen`).classList.remove('hidden');
    state.isGameActive = (screen === 'game');
    if (screen === 'menu') {
        clearInterval(state.timerInterval);
        clearInterval(state.botInterval);
        updateUI();
    }
}

function getLocalDateStr() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function getTimeToMidnight() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setDate(midnight.getDate() + 1);
    midnight.setHours(0, 0, 0, 0);
    const diff = midnight - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}ч ${mins}м`;
}

function startLevel(diff, num, seed = null) {
    state.isBattle = (num === 'BATTLE');
    state.isDaily = (num === 'Daily');
    
    // Show opponent progress bar if real PvP or Bot
    const oppBar = document.getElementById('opponent-progress-container');
    if (oppBar) oppBar.style.display = state.isBattle ? 'block' : 'none';

    let level;
    let seconds = 0;

    if (state.activeSession && state.activeSession.diff === diff && state.activeSession.num === num && !state.isBattle) {
        level = { grid: state.activeSession.grid, answers: state.activeSession.answers, fixedCells: state.activeSession.fixedCells };
        state.lastGeneratedGrid = state.activeSession.lastGeneratedGrid;
        seconds = state.activeSession.seconds;
    } else {
        const generatorSeed = seed || (state.isDaily ? null : (typeof num === 'number' ? num : null));
        level = state.isDaily ? window.LevelGenerator.generateDaily(getLocalDateStr()) : window.LevelGenerator.generateLevel(diff, generatorSeed);
        if (!level) return alert('Ошибка генерации!');
        state.lastGeneratedGrid = level.grid;
        seconds = 0;
    }

    state.diff = diff;
    state.currentLevelNum = num;
    state.currentAnswers = level.answers;
    state.fixedCells = level.fixedCells;
    state.secondsElapsed = seconds;
    state.isFrozen = false;

    // If loading from session, merge user input into the level grid
    if (state.activeSession && state.activeSession.diff === diff && state.activeSession.num === num && state.activeSession.grid) {
        for (let r = 0; r < level.grid.length; r++) {
            for (let c = 0; c < level.grid[r].length; c++) {
                if (level.grid[r][c] === '' && state.activeSession.grid[r] && state.activeSession.grid[r][c]) {
                    level.grid[r][c] = state.activeSession.grid[r][c];
                    // Mark as filled by user so it can't be changed
                    level.fixedCells[`${r}-${c}`] = 'user-filled';
                }
            }
        }
    }
    
    renderGrid(level.grid);
    saveCurrentToSession(true); // Force save session
    switchScreen('game');
    closeModal();
    updateUI();
    startTimer();
    
    ServerAPI.call('/game/start', 'POST', { telegram_id: ServerAPI.getTId(), difficulty: diff });
}

function renderGrid(grid) {
    const container = document.getElementById('math-grid');
    if (!container) return;
    container.innerHTML = '';
    container.className = `grid-size-${grid.length}`;
    container.style.gridTemplateColumns = `repeat(${grid.length}, 1fr)`;
    grid.forEach((row, r) => {
        row.forEach((val, c) => {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.r = r; cell.dataset.c = c;
            const cellState = state.fixedCells[`${r}-${c}`];
            const isHinted = cellState === 'hinted';
            const isProtected = isHinted || cellState === true;
            
            if (['+','-','*','/','='].includes(val)) {
                cell.className += ' operator';
                cell.textContent = val;
            } else if (isProtected) {
                cell.textContent = val;
                cell.classList.add('fixed');
                if (isHinted) cell.classList.add('hinted');
            } else {
                const isAnswer = state.currentAnswers && state.currentAnswers[`${r}-${c}`] !== undefined;
                cell.classList.add(isAnswer ? 'empty' : 'void');
                if (val && val !== '') cell.textContent = val;
            }
            container.appendChild(cell);
        });
    });
    updateProgressBar();
}

function updateProgressBar() {
    if (!state.currentAnswers) return;
    const total = Object.keys(state.currentAnswers).length;
    if (total === 0) return;
    const emptyCells = Array.from(document.querySelectorAll('.cell.empty'));
    const filled = emptyCells.filter(c => c.textContent !== '').length;
    
    const fillEl = document.getElementById('game-progress-fill');
    const textEl = document.getElementById('game-progress-text');
    if (fillEl) fillEl.style.width = `${(filled / total) * 100}%`;
    if (textEl) textEl.textContent = `${filled}/${total}`;
}

function inputNum(n) {
    if (!state.selected || !state.isGameActive) return;
    Haptics.light();
    state.selected.textContent = n;
    saveCurrentToSession();
    validateLines();
    updateProgressBar();

    if (state.isBattle && !state.battleBotDiff) { // Real PvP
        const total = Object.keys(state.currentAnswers).length;
        const filled = Array.from(document.querySelectorAll('.cell.empty')).filter(c => c.textContent !== '').length;
        PVPClient.sendProgress((filled / total) * 100);
    }

    checkWin();
}

function validateLines() {
    if (!state.lastGeneratedGrid) return;
    const size = state.lastGeneratedGrid.length;
    // Горизонтальные
    for (let r = 0; r < size; r += 2) {
        const line = [];
        for (let c = 0; c < size; c++) {
            const el = document.querySelector(`.cell[data-r="${r}"][data-c="${c}"]`);
            line.push(el ? el.textContent : '');
        }
        const res = evaluateLine(line);
        const target = document.querySelector(`.cell[data-r="${r}"][data-c="${size-1}"]`);
        if (target) target.style.color = res ? 'var(--success-color)' : 'var(--accent)';
    }
    // Вертикальные
    for (let c = 0; c < size; c += 2) {
        const line = [];
        for (let r = 0; r < size; r++) {
            const el = document.querySelector(`.cell[data-r="${r}"][data-c="${c}"]`);
            line.push(el ? el.textContent : '');
        }
        const res = evaluateLine(line);
        const target = document.querySelector(`.cell[data-r="${size-1}"][data-c="${c}"]`);
        if (target) target.style.color = res ? 'var(--success-color)' : 'var(--accent)';
    }
}

function evaluateLine(line) {
    let val = parseInt(line[0]);
    if (isNaN(val)) return false;
    let eqIdx = line.indexOf('=');
    if (eqIdx === -1) return false;
    for (let i = 1; i < eqIdx; i += 2) {
        const next = parseInt(line[i+1]);
        if (isNaN(next)) return false;
        if (line[i] === '+') val += next;
        else if (line[i] === '-') val -= next;
        else if (line[i] === '*') val *= next;
        else if (line[i] === '/') val /= next;
    }
    return val === parseInt(line[line.length-1]);
}

function checkWin() {
    const size = state.lastGeneratedGrid.length;
    
    // Bulletproof check: ONLY check the actual input cells that the user needs to fill
    const emptyCells = Array.from(document.querySelectorAll('.cell.empty'));
    const isBoardFull = emptyCells.every(c => c.textContent !== '');
    
    if (!isBoardFull) return;
    
    // Now check all equations
    let allCorrect = true;
    
    // Check rows
    for (let r = 0; r < size - 1; r += 2) {
        const line = [];
        for (let c = 0; c < size; c++) {
            const el = document.querySelector(`.cell[data-r="${r}"][data-c="${c}"]`);
            line.push(el ? el.textContent : '');
        }
        if (!evaluateLine(line)) { allCorrect = false; break; }
    }

    if (allCorrect) {
        // Check columns
        for (let c = 0; c < size - 1; c += 2) {
            const line = [];
            for (let r = 0; r < size; r++) {
                const el = document.querySelector(`.cell[data-r="${r}"][data-c="${c}"]`);
                line.push(el ? el.textContent : '');
            }
            if (!evaluateLine(line)) { allCorrect = false; break; }
        }
    }    
    if (!allCorrect) {
        Haptics.error();
        return;
    }

    Haptics.success();
    clearInterval(state.timerInterval);
    clearInterval(state.botInterval);
    state.stats.totalSolved++;
    
    // Track today's solved count
    const today = getLocalDateStr();
    if (state.lastSolvedDate !== today) {
        state.todaySolved = 0;
        state.lastSolvedDate = today;
        localStorage.setItem('mx_last_solved_date', today);
    }
    state.todaySolved++;
    localStorage.setItem('mx_today_solved', state.todaySolved);
    
    state.activeSession = null;
    localStorage.removeItem('mx_active_session');
    if (state.isDaily) {
        state.lastDaily = getLocalDateStr();
        state.dailyCompleted = true;
        localStorage.setItem('mx_daily_completed', 'true');
        state.inventory.crystals++; // Reward crystal for Daily
    }
    else if (!state.isBattle) {
        if (state.diff === 'easy' && state.currentLevelNum === state.unlocked) state.unlocked++;
        else if (state.diff === 'medium' && state.currentLevelNum === state.unlockedMedium) state.unlockedMedium++;
        else if (state.diff === 'hard' && state.currentLevelNum === state.unlockedHard) state.unlockedHard++;
        else if (state.diff === 'expert' && state.currentLevelNum === state.unlockedExpert) state.unlockedExpert++;
    }
    
    const reward = (state.isDaily ? 200 : (state.isBattle ? state.battleStake * 2 : (state.diff === 'hard' ? 50 : 30)));
    state.coins += reward;
    if (state.isDaily) addTransaction('earned', 'daily', reward);
    else if (state.isBattle) {
        addTransaction('earned', 'battle', reward);
        if (!state.battleBotDiff) PVPClient.sendWin();
    }
    else addTransaction('earned', 'level', reward);
    let xpGained = 20;
    let isStreakBonus = state.streak >= 7;
    if (isStreakBonus) xpGained *= 2;
    state.xp += xpGained;
    state.level = Math.floor(state.xp / 100) + 1;
    
    // Auto-claim available missions after 1.5s
    setTimeout(function() { checkAndClaimMissions(); }, 1500);
    
    const winRewardText = document.getElementById('win-reward-text');
    const battleRewardEl = document.getElementById('battle-reward');
    if (battleRewardEl && state.isBattle) battleRewardEl.textContent = String(reward);
    if (winRewardText) {
        let rewardText = `<span style="color:var(--gold); font-size:1.4rem; text-shadow:0 0 10px var(--gold);">+${reward} ${COIN_ICON_HTML}</span>`;
        if (state.isDaily) {
            rewardText += ` <span style="color:#a855f7; font-size:1.2rem; text-shadow:0 0 10px #a855f7;">+1 💎</span>`;
        }
        if (isStreakBonus) {
            rewardText += ` <br><span style="color:var(--accent); font-size:0.9rem; font-weight:bold;">🔥 СЕРИЯ x2 XP (+${xpGained} XP)</span>`;
        }
        winRewardText.innerHTML = rewardText;
    }
    
    saveData();
    ServerAPI.saveScore(state.diff, state.secondsElapsed, reward);
    
    showModal(state.isBattle ? 'battle-result' : 'win');
    
    // Theme-specific confetti
    if (typeof confetti !== 'undefined') {
        const themeConfetti = {
            'onyx': { particleCount: 150, colors: ['#00f2ff', '#0066ff', '#00ff88', '#ffd700'] },
            'light': { particleCount: 150, colors: ['#0ea5e9', '#22c55e', '#f59e0b', '#8b5cf6'] },
            'amethyst': { particleCount: 150, colors: ['#e0aaff', '#c084fc', '#a855f7', '#ffd700'] },
            'paper': { particleCount: 100, colors: ['#d33682', '#859900', '#2aa198', '#cb4b16'] },
            'telegram': { particleCount: 150, colors: ['#2481cc', '#00aaff', '#ffd700', '#00ff88'] },
            'starry': { particleCount: 200, colors: ['#c0a0ff', '#ffd700', '#ff00ff', '#00ffaa', '#ffffff'] },
            'cyberpunk': { particleCount: 200, colors: ['#ff00ff', '#00ffaa', '#ffff00', '#ff0000'] }
        };
        const confettiSettings = themeConfetti[state.theme] || themeConfetti['onyx'];
        confetti({ 
            particleCount: confettiSettings.particleCount,
            colors: confettiSettings.colors,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

function startTimer() {
    clearInterval(state.timerInterval);
    updateTimerUI();
    state.timerInterval = setInterval(() => {
        if (state.isGameActive && !state.isFrozen) {
            state.secondsElapsed++;
            updateTimerUI();
        }
    }, 1000);
    if (state.isBattle && state.battleBotDiff) startBot();
}

function updateTimerUI() {
    const el = document.querySelector('#game-timer span');
    if (el) {
        const m = String(Math.floor(state.secondsElapsed/60)).padStart(2,'0');
        const s = String(state.secondsElapsed%60).padStart(2,'0');
        el.textContent = `${m}:${s}`;
    }
}

function pauseGame() { 
    if (state.isBattle || !state.isGameActive) return;
    Haptics.light();
    state.isGameActive = false;
    clearInterval(state.timerInterval); 
    clearInterval(state.botInterval); 
    if (typeof AudioManager !== 'undefined') AudioManager.pauseMusic();
    saveCurrentToSession();
    showModal('pause'); 
}

function resumeGame() { 
    Haptics.light();
    closeModal(); 
    state.isGameActive = true;
    startTimer(); 
    if (typeof AudioManager !== 'undefined') AudioManager.playMusic();
}

function saveCurrentToSession(force = false) {
    if (!state.lastGeneratedGrid || state.isBattle) return;
    const emptyCells = Array.from(document.querySelectorAll('.cell.empty, .cell.hinted'));
    const hasInput = emptyCells.some(c => c.textContent !== '');
    if (!hasInput && !force) {
        state.activeSession = null;
        localStorage.removeItem('mx_active_session');
        return;
    }
    const grid = [];
    const size = state.lastGeneratedGrid.length;
    for (let r = 0; r < size; r++) {
        const row = [];
        for (let c = 0; c < size; c++) {
            const el = document.querySelector(`.cell[data-r="${r}"][data-c="${c}"]`);
            row.push(el ? el.textContent : '');
        }
        grid.push(row);
    }
    // Save time only if there was user input
    state.activeSession = { diff: state.diff, num: state.currentLevelNum, grid, answers: state.currentAnswers, fixedCells: state.fixedCells, seconds: hasInput ? state.secondsElapsed : 0, lastGeneratedGrid: state.lastGeneratedGrid };
    saveData();
}

function selectCell(el) {
    if (el.classList.contains('hinted') || el.classList.contains('fixed')) return;
    if (state.selected) state.selected.classList.remove('selected');
    state.selected = el; state.selected.classList.add('selected');
}

async function showModal(id) {
    document.getElementById('modal-container').classList.remove('hidden');
    document.querySelectorAll('.modal-content').forEach(m => m.classList.add('hidden'));
    const modal = document.getElementById(`${id}-modal`);
    if (modal) modal.classList.remove('hidden');
    if (id === 'level') renderLevelMap();
    if (id === 'stats') renderStats();
    if (id === 'missions') renderMissions();
    if (id === 'gallery') renderGallery();
    if (id === 'leaderboard') renderLeaderboard();
    if (id === 'bonus') updateBonusModal();
}

function closeModal() { document.getElementById('modal-container').classList.add('hidden'); }

function updateBonusModal() {
    const streakDisplay = document.getElementById('streak-display');
    const rewardAmount = document.getElementById('reward-amount');
    const claimBtn = document.getElementById('claim-btn');
    
    const today = getLocalDateStr();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);
    
    if (streakDisplay && rewardAmount && claimBtn) {
        // Calculate current streak
        let currentStreak = 0;
        if (state.lastBonus === today) {
            currentStreak = state.streak;
        } else if (state.lastBonus === yesterdayStr) {
            currentStreak = state.streak;
        } else {
            currentStreak = 0;
        }
        
        // Check if already claimed today
        if (state.lastBonus === today) {
            streakDisplay.innerHTML = (state.lang === 'ru' ? '✓ Получено сегодня!' : '✓ Claimed today!') + ' 🔥 ' + state.streak;
            rewardAmount.textContent = '0';
            claimBtn.classList.add('disabled');
            claimBtn.innerHTML = state.lang === 'ru' ? 'ПОЛУЧЕНО' : 'CLAIMED';
        } else {
            const bonus = 50 * (currentStreak + 1);
            streakDisplay.innerHTML = '🔥 ' + (currentStreak + 1) + (state.lang === 'ru' ? ' дней подряд!' : ' days in a row!');
            rewardAmount.textContent = bonus;
            claimBtn.classList.remove('disabled');
        claimBtn.innerHTML = '<span data-i18n="claim">' + (state.lang === 'ru' ? 'ПОЛУЧИТЬ' : 'CLAIM') + '</span> <span id="reward-amount">' + bonus + '</span> ' + COIN_ICON_HTML;
        }
        
        if (window.lucide) lucide.createIcons();
    }
    
    // Render streak track
    const track = document.getElementById('streak-track');
    if (track) {
        const displayStreak = (state.lastBonus === today) ? state.streak : 
            (state.lastBonus === yesterdayStr ? state.streak : 0);
        
        let html = '';
        for (let i = 1; i <= 7; i++) {
            const isActive = i <= displayStreak;
            const isToday = i === displayStreak + 1;
            html += '<div style="flex:1; height:40px; border-radius:10px; background:' + 
                (isActive ? 'var(--gold)' : (isToday ? 'var(--accent)' : 'var(--card-onyx)')) + 
                '; border:2px solid ' + (isActive || isToday ? 'var(--gold)' : 'var(--glass-border)') + 
                '; display:flex; align-items:center; justify-content:center; color:' + 
                (isActive ? '#000' : 'var(--text-dim)') + '; font-weight:bold;">' + i + '</div>';
        }
        track.innerHTML = html;
    }
}

function useHint() {
    if (state.inventory.hints <= 0 || !state.isGameActive) { Haptics.error(); return; }
    const cells = document.querySelectorAll('.cell.empty');
    for (let c of cells) {
        const r = c.dataset.r, col = c.dataset.c;
        const ans = state.currentAnswers[`${r}-${col}`];
        if (c.textContent !== ans && ans) {
            Haptics.success();
            c.textContent = ans;
            c.classList.remove('empty');
            c.classList.add('fixed', 'hinted');
            state.inventory.hints--;
            state.fixedCells[`${r}-${col}`] = 'hinted';
            saveCurrentToSession();
            updateUI();
            updateProgressBar();
            checkWin(); return;
        }
    }
}

function useFreeze() {
    if (state.inventory.freezes <= 0 || state.isFrozen || !state.isGameActive) { Haptics.error(); return; }
    Haptics.medium();
    state.inventory.freezes--;
    state.isFrozen = true;
    updateUI();
    setTimeout(() => { state.isFrozen = false; updateUI(); }, 15000);
}

function useCrystal() {
    if (state.inventory.crystals <= 0 || !state.isGameActive) { Haptics.error(); return; }
    Haptics.success();
    state.inventory.crystals--;
    let count = 0;
    const cells = Array.from(document.querySelectorAll('.cell.empty'));
    for (let c of cells) {
        const r = c.dataset.r, col = c.dataset.c;
        const ans = state.currentAnswers[`${r}-${col}`];
        if (c.textContent !== ans && ans) {
            c.textContent = ans;
            c.classList.remove('empty');
            c.classList.add('fixed', 'hinted');
            state.fixedCells[`${r}-${col}`] = 'hinted';
            count++;
            if (count >= 3) break;
        }
    }
    saveCurrentToSession();
    updateUI();
    updateProgressBar();
    checkWin();
}

function useMagnet() {
    if (state.inventory.magnets <= 0 || !state.isGameActive) { Haptics.error(); return; }
    if (!state.selected || state.selected.classList.contains('hinted') || state.selected.classList.contains('fixed')) {
        showToast(state.lang === 'ru' ? 'Выбери пустую клетку!' : 'Select an empty cell!');
        Haptics.warning();
        return;
    }
    
    const r = state.selected.dataset.r, col = state.selected.dataset.c;
    const ans = state.currentAnswers[`${r}-${col}`];
    
    if (ans) {
        Haptics.success();
        state.inventory.magnets--;
        state.selected.textContent = ans;
        state.selected.classList.remove('empty');
        state.selected.classList.add('fixed', 'hinted');
        state.fixedCells[`${r}-${col}`] = 'hinted';
        
        state.selected.classList.remove('selected');
        state.selected = null;
        
        saveCurrentToSession();
        updateUI();
        updateProgressBar();
        checkWin();
    }
}

function startBot() {
    let p = 0;
    const time = state.battleBotDiff === 'easy' ? 120 : (state.battleBotDiff === 'hard' ? 50 : 80);
    clearInterval(state.botInterval);
    state.botInterval = setInterval(() => {
        if (!state.isFrozen && state.isGameActive) {
            p += 100/time;
            if (p >= 100) { Haptics.error(); clearInterval(state.timerInterval); showModal('battle-lost'); clearInterval(state.botInterval); }
            const fill = document.getElementById('opponent-progress-fill');
            if (fill) fill.style.width = `${Math.min(100, p)}%`;
        }
    }, 1000);
}

async function renderStats() {
    const s = await ServerAPI.getStats();
    const totalSolved = s?.total_solved || state.stats.totalSolved;
    document.getElementById('stats-level').textContent = s?.level || state.level;
    document.getElementById('stats-solved').textContent = totalSolved;
    document.getElementById('stats-crystals').textContent = state.inventory.crystals;
    document.getElementById('stats-hints').textContent = state.inventory.hints;
    const referralsEl = document.getElementById('stats-referrals');
    if (referralsEl) referralsEl.textContent = s?.referrals_count || 0;
    
    // Show transaction stats if available
    const transContainer = document.getElementById('stats-transactions');
    if (transContainer && state.transactions) {
        const earned = state.transactions.earned || {};
        const spent = state.transactions.spent || {};
        
        let totalEarned = 0;
        let totalSpent = 0;
        
        // Sum all categories
        for (let cat in earned) {
            for (let day in earned[cat]) {
                totalEarned += earned[cat][day];
            }
        }
        for (let cat in spent) {
            for (let day in spent[cat]) {
                totalSpent += spent[cat][day];
            }
        }
        
        const categoryLabels = state.lang === 'ru' ? {
            'level': 'За уровни',
            'daily': 'За вызов',
            'battle': 'За битву',
            'mission': 'За задания',
            'daily_bonus': 'Бонус дня',
            'hint_5': 'Подсказки (5)',
            'hint': 'Подсказка',
            'crystal_3': 'Кристаллы (3)',
            'crystal': 'Кристалл',
            'freeze': 'Заморозка',
            'magnet': 'Магнит',
            'invite': 'Приглашение друга',
            'battle': 'Битва',
            'theme_amethyst': 'Тема: Аметист',
            'theme_starry': 'Тема: Звёзды',
            'theme_cyberpunk': 'Тема: Киберпанк',
            'theme_matrix': 'Тема: Матрица',
            'theme_sunset': 'Тема: Закат',
            'theme_neon': 'Тема: Неон'
        } : {
            'level': 'For levels',
            'daily': 'For daily',
            'battle': 'For battle',
            'mission': 'For missions',
            'daily_bonus': 'Daily bonus',
            'hint_5': 'Hints (5)',
            'hint': 'Hint',
            'crystal_3': 'Crystals (3)',
            'crystal': 'Crystal',
            'freeze': 'Freeze',
            'magnet': 'Magnet',
            'invite': 'Friend Invite',
            'battle': 'Battle',
            'theme_amethyst': 'Theme: Amethyst',
            'theme_starry': 'Theme: Starry',
            'theme_cyberpunk': 'Theme: Cyberpunk',
            'theme_matrix': 'Theme: Matrix',
            'theme_sunset': 'Theme: Sunset',
            'theme_neon': 'Theme: Neon'
        };
        
        // Build breakdown list
        let earnedBreakdown = '';
        for (let cat in earned) {
            let catTotal = 0;
            for (let day in earned[cat]) catTotal += earned[cat][day];
            if (catTotal > 0) earnedBreakdown += `<div style="display:flex; justify-content:space-between; font-size:0.8rem; margin:4px 0; color:var(--text-dim);"><span>${categoryLabels[cat] || cat}</span><span style="color:var(--success-color);">+${catTotal}</span></div>`;
        }
        
        let spentBreakdown = '';
        for (let cat in spent) {
            let catTotal = 0;
            for (let day in spent[cat]) catTotal += spent[cat][day];
            if (catTotal > 0) spentBreakdown += `<div style="display:flex; justify-content:space-between; font-size:0.8rem; margin:4px 0; color:var(--text-dim);"><span>${categoryLabels[cat] || cat}</span><span style="color:#ff6b6b;">-${catTotal}</span></div>`;
        }
        
        transContainer.innerHTML = `
            <div style="margin-top:15px; padding:15px; background:var(--card-onyx); border-radius:15px;">
                <h4 style="margin:0 0 10px 0; color:var(--gold);">${state.lang === 'ru' ? 'Баланс' : 'Balance'}</h4>
                <div style="display:flex; justify-content:space-between; font-size:1.1rem; font-weight:bold; margin-bottom:15px;">
                    <span style="color:var(--success-color);">+${totalEarned}</span>
                    <span style="color:#ff6b6b;">-${totalSpent}</span>
                    <span style="color:var(--accent);">= ${state.coins}</span>
                </div>
                ${earnedBreakdown ? `<div style="margin-bottom:10px;"><span style="font-size:0.8rem; color:var(--text-dim);">${state.lang === 'ru' ? 'Получено:' : 'Earned:'}</span>${earnedBreakdown}</div>` : ''}
                ${spentBreakdown ? `<div><span style="font-size:0.8rem; color:var(--text-dim);">${state.lang === 'ru' ? 'Потрачено:' : 'Spent:'}</span>${spentBreakdown}</div>` : ''}
            </div>
        `;
    }
}

async function renderMissions() {
    const list = document.getElementById('missions-list');
    if (!list) return;
    
    // Reset missions at midnight
    const today = getLocalDateStr();
    if (state.lastMissionsReset !== today) {
        state.lastMissionsReset = today;
        localStorage.setItem('mx_last_missions', today);
    }
    
    // Get mission titles based on language
    const missionTitles = state.lang === 'ru' ? {
        'solve_3': 'Реши 3 уровня',
        'solve_10': 'Математик: 10 уровней'
    } : {
        'solve_3': 'Solve 3 levels',
        'solve_10': 'Mathematician: 10 levels'
    };
    
    // Load claimed missions
    const claimedMissions = JSON.parse(localStorage.getItem('mx_claimed_missions') || '{}');
    const isClaimed = function(id) { return claimedMissions[id] === today; };
    
    const m = await ServerAPI.getMissions();
    const missions = m && m.length > 0 ? m : [
        { id: 'solve_3', title: missionTitles['solve_3'], goal: 3, progress: Math.min(state.todaySolved, 3), reward: 50 },
        { id: 'solve_10', title: missionTitles['solve_10'], goal: 10, progress: Math.min(state.todaySolved, 10), reward: 200 }
    ];
    
    // Check if all done
    const allDone = missions.every(x => x.progress >= x.goal);
    const allClaimed = missions.every(x => isClaimed(x.id));
    const timerHTML = (allDone && allClaimed) ? 
        `<div style="text-align:center; padding:15px; color:var(--text-dim); font-size:0.85rem;">
            ${state.lang === 'ru' ? 'Новые задания через:' : 'New missions in:'} ${getTimeToMidnight()}
        </div>` : '';
    
    list.innerHTML = timerHTML + missions.map(x => {
        const done = x.progress >= x.goal;
        const claimed = isClaimed(x.id);
        return `
        <div style="background:var(--card-onyx); padding:15px; border-radius:15px; display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border: 1px solid ${claimed ? 'var(--success-color)' : 'var(--glass-border)'};">
            <div style="display:flex; flex-direction:column;">
                <span style="font-weight:bold;">${x.title}</span>
                <span style="font-size:0.8rem; color:var(--text-dim);">${x.progress}/${x.goal}</span>
            </div>
            <button class="buy-btn ${(!done || claimed) ? 'disabled' : ''}" onclick="window.claimMissionReward('${x.id}', ${x.reward})" style="padding: 8px 12px; font-size: 0.8rem;">
                ${claimed ? '✓' : x.reward + ' ' + COIN_ICON_HTML}
            </button>
        </div>
    `}).join('');
}

window.claimMissionReward = async function(id, reward) {
    const claimedMissions = JSON.parse(localStorage.getItem('mx_claimed_missions') || '{}');
    const today = getLocalDateStr();
    if (claimedMissions[id] === today) return;
    
    // Check if goal is met (using today's solved count)
    const goals = { 'solve_3': 3, 'solve_10': 10 };
    if (!goals[id] || state.todaySolved < goals[id]) return; // Can't claim if not done
    
    const serverClaim = await ServerAPI.claimMission(id);
    state.coins += (serverClaim?.status === 'claimed' ? (serverClaim.reward || reward) : reward);
    addTransaction('earned', 'mission', reward);
    claimedMissions[id] = today;
    localStorage.setItem('mx_claimed_missions', JSON.stringify(claimedMissions));
    saveData(); updateUI(); renderMissions();
};

async function checkAndClaimMissions() {
    const claimedMissions = JSON.parse(localStorage.getItem('mx_claimed_missions') || '{}');
    const today = getLocalDateStr();
    let totalReward = 0;
    let claimed = false;
    let missionNames = [];
    
    const localMissions = [
        { id: 'solve_3', goal: 3, reward: 50, title: state.lang === 'ru' ? 'Реши 3 уровня' : 'Solve 3 levels' },
        { id: 'solve_10', goal: 10, reward: 200, title: state.lang === 'ru' ? 'Математик' : 'Mathematician' }
    ];
    
    for (let i = 0; i < localMissions.length; i++) {
        const m = localMissions[i];
        if (claimedMissions[m.id] === today) continue;
        if (state.todaySolved >= m.goal) {
            const serverClaim = await ServerAPI.claimMission(m.id);
            state.coins += (serverClaim?.status === 'claimed' ? (serverClaim.reward || m.reward) : m.reward);
            addTransaction('earned', 'mission', m.reward);
            totalReward += m.reward;
            missionNames.push(m.title);
            claimedMissions[m.id] = today;
            claimed = true;
        }
    }
    
    if (claimed) {
        localStorage.setItem('mx_claimed_missions', JSON.stringify(claimedMissions));
        saveData(); updateUI();
        if (totalReward > 0) {
            const missionText = missionNames.join(', ');
            showToast('+' + totalReward + ' ' + (state.lang === 'ru' ? 'монет за:' : 'coins from:') + ' ' + missionText);
        }
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:var(--success-color); color:#000; padding:20px 40px; border-radius:20px; font-weight:bold; font-size:1.2rem; z-index:9999; box-shadow:0 0 30px var(--success-color); animation:fadeIn 0.3s;';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(function() {
        toast.style.animation = 'fadeIn 0.3s reverse';
        setTimeout(function() { toast.remove(); }, 300);
    }, 2500);
}

async function renderLeaderboard() {
    const list = document.getElementById('leader-list');
    if (!list) return;
    list.innerHTML = '<p style="text-align:center; padding:20px;">Загрузка...</p>';
    const data = await ServerAPI.getLeaderboard();
    if (data && data.length > 0) {
        list.innerHTML = data.map((player, i) => `
            <div style="background:var(--card-onyx); padding:12px 20px; border-radius:15px; display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; border: 1px solid ${i < 3 ? 'var(--gold)' : 'var(--glass-border)'};">
                <div style="display:flex; align-items:center; gap:12px;">
                    <span style="font-weight:900; color:var(--gold); width:20px;">${i + 1}</span>
                    <span style="font-weight:bold;">${player.display_name || I18N[state.lang].player_name}</span>
                </div>
                <div style="text-align:right;">
                    <div style="font-weight:bold; color:var(--accent);">${player.xp} XP</div>
                    <div style="font-size:0.7rem; color:var(--text-dim);">УР. ${player.level}</div>
                </div>
            </div>
        `).join('');
    } else {
        list.innerHTML = '<p style="text-align:center; color:var(--text-dim); padding:20px;">Рейтинг пока пуст</p>';
    }
}

async function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    const ART_COLLECTION = [
        { id: 1, name: "Neon", url: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=600", levels_start: 0, pieces: 9 },
        { id: 2, name: "Math", url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600", levels_start: 9, pieces: 16 },
        { id: 3, name: "Cyber", url: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600", levels_start: 25, pieces: 25 }
    ];
    const s = await ServerAPI.getStats();
    const solved = s?.total_solved || state.stats.totalSolved;
    grid.innerHTML = ART_COLLECTION.map(art => {
        const unlockedPieces = Math.max(0, Math.min(art.pieces, solved - art.levels_start));
        const isUnlocked = unlockedPieces === art.pieces;
        
        const cols = Math.sqrt(art.pieces); // 3x3, 4x4, 5x5
        let puzzleHtml = '';
        for (let i = 0; i < art.pieces; i++) {
            const isPieceUnlocked = i < unlockedPieces;
            puzzleHtml += `<div style="background: ${isPieceUnlocked ? 'transparent' : 'rgba(10,10,10,0.95)'}; border: 1px solid rgba(255,255,255,0.1);"></div>`;
        }

        return `<div class="art-card" onclick="window.viewArt('${art.url}', ${isUnlocked})" style="position:relative; aspect-ratio:1; border-radius:20px; overflow:hidden; background:var(--card-onyx); border:1px solid var(--glass-border); cursor:${isUnlocked ? 'pointer' : 'default'};">
            <img src="${art.url}" style="position:absolute; width:100%; height:100%; object-fit:cover; filter:${isUnlocked ? 'none' : 'blur(2px)'};">
            <div style="position:absolute; inset:0; display:grid; grid-template-columns: repeat(${cols}, 1fr); grid-template-rows: repeat(${cols}, 1fr);">
                ${puzzleHtml}
            </div>
            ${!isUnlocked ? `<div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; background:rgba(0,0,0,0.3); pointer-events:none;">
                <span style="font-size:1.5rem; font-weight:bold; color:#fff; text-shadow:0 0 10px #000;">${unlockedPieces}/${art.pieces}</span>
            </div>` : `<div style="position:absolute; top:10px; right:10px; background:rgba(0,0,0,0.5); padding:5px; border-radius:50%; display:flex;"><i data-lucide="maximize-2" style="color:#fff; width:16px; height:16px;"></i></div>`}
        </div>`;
    }).join('');
    if (window.lucide) lucide.createIcons();
}

window.viewArt = function(url, isUnlocked) {
    if (!isUnlocked) return;
    Haptics.medium();
    const viewer = document.getElementById('art-viewer-modal');
    const img = document.getElementById('art-viewer-img');
    const downloadBtn = document.getElementById('download-art-btn');
    if (viewer && img) {
        img.src = url;
        if (downloadBtn) {
            downloadBtn.onclick = async (e) => {
                e.stopPropagation(); // prevent modal close
                try {
                    const response = await fetch(url);
                    const blob = await response.blob();
                    const blobUrl = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = blobUrl;
                    link.download = 'MathX_Art.jpg';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(blobUrl);
                    Haptics.success();
                } catch (err) {
                    console.error('Download failed', err);
                    // Fallback for CORS or iOS
                    window.open(url, '_blank');
                }
            };
        }
        viewer.classList.remove('hidden');
    }
};

function renderLevelMap() {
    const map = document.getElementById('level-map-grid');
    if (!map) return;
    map.innerHTML = '';
    let unlockedCount = state.unlocked;
    if (state.currentDiffTab === 'medium') unlockedCount = state.unlockedMedium;
    if (state.currentDiffTab === 'hard') unlockedCount = state.unlockedHard;
    if (state.currentDiffTab === 'expert') unlockedCount = state.unlockedExpert;
    for (let i = 1; i <= 50; i++) {
        const btn = document.createElement('button');
        const isUnlocked = i <= unlockedCount;
        btn.className = `level-btn ${isUnlocked ? 'unlocked' : 'locked'}`;
        if (i === unlockedCount) btn.classList.add('current');
        btn.textContent = i;
        btn.onclick = () => { if (isUnlocked) startLevel(state.currentDiffTab, i); };
        map.appendChild(btn);
    }
}

function renderNumberPad() {
    const pad = document.getElementById('number-pad');
    if (!pad) return;
    pad.innerHTML = '';
    for (let i = 1; i <= 9; i++) {
        const b = document.createElement('button');
        b.className = 'num-btn'; b.textContent = i;
        b.onclick = () => inputNum(i);
        pad.appendChild(b);
    }
    const del = document.createElement('button');
    del.className = 'num-btn delete'; del.innerHTML = '<i data-lucide="delete"></i>';
    del.onclick = () => inputNum('');
    pad.appendChild(del);
    if (window.lucide) lucide.createIcons();
}

document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        state.externalNavigationUntil = 0;
        document.body.classList.remove('suspend-effects');
    }
    if (ServerAPI.isTelegram) return;
    if (document.hidden && state.externalNavigationUntil > Date.now()) return;
    if (document.hidden && state.isGameActive && !state.isBattle) {
        pauseGame();
        saveCurrentToSession(true);
    }
});

window.addEventListener('beforeunload', () => {
    if (state.isGameActive && !state.isBattle) {
        saveCurrentToSession(true);
    }
});

window.addEventListener('focus', () => {
    document.body.classList.remove('suspend-effects');
});

document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        if (Date.now() < state.externalNavigationUntil) {
            document.body.classList.add('suspend-effects');
            scheduleEffectsResume();
        }
        tryHandleLaunchData();
    }
});

window.addEventListener('focus', () => {
    if (Date.now() < state.externalNavigationUntil) {
        document.body.classList.add('suspend-effects');
        scheduleEffectsResume();
    }
    tryHandleLaunchData();
});

window.addEventListener('pageshow', () => {
    if (Date.now() < state.externalNavigationUntil) {
        document.body.classList.add('suspend-effects');
        scheduleEffectsResume();
    }
    tryHandleLaunchData();
});
