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
        theme_onyx: "Оникс", theme_light: "Светлая", theme_amethyst: "Аметист", theme_paper: "Бумага", theme_telegram: "Телеграм"
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
        theme_onyx: "Onyx", theme_light: "Light", theme_amethyst: "Amethyst", theme_paper: "Paper", theme_telegram: "Telegram"
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
    inventory: JSON.parse(localStorage.getItem('mx_inv') || '{"hints":3,"freezes":0,"crystals":0,"themes":["onyx","light","telegram"]}'),
    lastDaily: localStorage.getItem('mx_last_daily') || '',
    lastBonus: localStorage.getItem('mx_last_bonus') || '',
    stats: (() => {
        const saved = JSON.parse(localStorage.getItem('mx_stats') || 'null');
        if (saved && saved.totalSolved > 0) return saved;
        const currentXp = parseInt(localStorage.getItem('mx_xp') || '0');
        return { totalSolved: Math.floor(currentXp / 20) };
    })(),
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
    currentLevelNum: 1
};

const tg = window.Telegram?.WebApp || { 
    ready: () => {}, expand: () => {}, 
    HapticFeedback: { impactOccurred: () => {}, notificationOccurred: () => {} },
    initDataUnsafe: { user: { first_name: "Игрок", id: 12345 } }
};

const API_URL = window.location.origin;

const ServerAPI = {
    get isTelegram() { return typeof tg !== 'undefined' && tg.initDataUnsafe?.user; },
    get enabled() { return this.isTelegram; }, // Only use backend in Telegram
    getTId() { return this.isTelegram ? tg.initDataUnsafe.user.id : 12345; },
    async call(path, method = 'GET', body = null) {
        if (!this.enabled) return null;
        try {
            const options = { method, headers: { 'Content-Type': 'application/json' } };
            if (body) options.body = JSON.stringify(body);
            const res = await fetch(`${API_URL}${path}`, options);
            if (!res.ok) return null;
            return await res.json();
        } catch (e) { return null; }
    },
    async auth(user) { 
        return this.call('/auth', 'POST', { telegram_id: user.id, username: user.username, display_name: user.first_name }); 
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
            streak: 0 
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
    light: () => tg.HapticFeedback.impactOccurred('light'),
    medium: () => tg.HapticFeedback.impactOccurred('medium'),
    success: () => tg.HapticFeedback.notificationOccurred('success'),
    error: () => tg.HapticFeedback.notificationOccurred('error'),
    warning: () => tg.HapticFeedback.notificationOccurred('warning')
};

function applyLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (I18N[state.lang] && I18N[state.lang][key]) el.innerHTML = I18N[state.lang][key];
    });
}

function applyTheme(t) { 
    state.theme = t;
    document.body.className = `theme-${t}`; 
    localStorage.setItem('mx_theme', t);
    document.querySelectorAll('.theme-circle').forEach(c => {
        c.classList.toggle('active', c.dataset.theme === t);
    });
}

function updateUI() {
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

    const hintText = document.querySelector('#hint-btn span');
    if (hintText) hintText.textContent = `${I18N[state.lang].hint} (${state.inventory.hints})`;

    const freezeCount = document.getElementById('freeze-count');
    if (freezeCount) freezeCount.textContent = state.inventory.freezes;

    const crystalCount = document.getElementById('crystal-count');
    if (crystalCount) crystalCount.textContent = state.inventory.crystals;

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
    const today = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    const bonusAvailable = state.lastBonus !== today;
    const claimNotif = document.getElementById('claim-notif');
    if (claimNotif) claimNotif.style.display = bonusAvailable ? 'block' : 'none';
    
    const modalClaimBtn = document.getElementById('claim-btn');
    if (modalClaimBtn) {
        modalClaimBtn.classList.toggle('disabled', !bonusAvailable);
        if (!bonusAvailable) {
            modalClaimBtn.innerHTML = state.lang === 'ru' ? 'ПОЛУЧЕНО' : 'CLAIMED';
        } else {
            modalClaimBtn.innerHTML = `<span data-i18n="claim">${I18N[state.lang].claim}</span> <span id="reward-amount">50</span> <i data-lucide="coins" style="width:18px; height:18px; vertical-align:middle; margin-left:4px;"></i>`;
            if (window.lucide) lucide.createIcons();
        }
    }

    document.querySelectorAll('#theme-selector .theme-circle').forEach(circle => {
        const theme = circle.dataset.theme;
        const isOwned = state.inventory.themes.includes(theme);
        circle.classList.toggle('hidden', !isOwned);
        circle.classList.toggle('active', theme === state.theme);
        circle.title = I18N[state.lang][`theme_${theme}`] || theme;
    });
}

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
    localStorage.setItem('mx_last_bonus', state.lastBonus);
    localStorage.setItem('mx_stats', JSON.stringify(state.stats));
    localStorage.setItem('mx_active_session', JSON.stringify(state.activeSession));
    ServerAPI.sync();
}

window.onload = async () => {
    tg.ready(); tg.expand();
    try { if (tg.requestFullscreen) tg.requestFullscreen(); } catch(e) {}
    if (typeof AudioManager !== 'undefined') AudioManager.init();
    
    const serverData = await ServerAPI.auth(tg.initDataUnsafe.user || { id: 12345 });
    if (serverData?.user) {
        state.coins = serverData.user.coins;
        state.xp = serverData.user.xp;
        state.level = serverData.user.level;
    }

    applyLanguage();
    applyTheme(state.theme);
    updateUI();
    initApp();
    initShop();
};

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
    safeSetClick('start-daily-btn', () => { startLevel('hard', 'Daily'); });
    safeSetClick('open-battle', () => { showModal('battle-lobby'); });
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
        switchScreen('menu');
        state.isGameActive = false;
        state.activeSession = null;
        localStorage.removeItem('mx_active_session');
        updateUI();
        if (typeof AudioManager !== 'undefined') AudioManager.playMusic();
    });
    safeSetClick('pause-game-btn', pauseGame);
    safeSetClick('resume-game-btn', resumeGame);
    safeSetClick('hint-btn', useHint);
    safeSetClick('freeze-btn', useFreeze);
    safeSetClick('crystal-btn', useCrystal);

    safeSetClick('claim-btn', () => {
        const now = new Date();
        const today = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
        if (state.lastBonus === today) return;
        state.coins += 50;
        state.lastBonus = today;
        Haptics.success();
        saveData(); updateUI(); closeModal();
    });

    safeSetClick('toggle-music-btn', () => { 
        if (typeof AudioManager !== 'undefined') { AudioManager.toggleMusic(); updateUI(); }
    });
    safeSetClick('toggle-sound-btn', () => { 
        if (typeof AudioManager !== 'undefined') { AudioManager.toggleSound(); updateUI(); }
    });

    document.querySelectorAll('.btn-close-modal').forEach(b => {
        if (!b.id || (b.id !== 'pause-to-menu-btn' && b.id !== 'win-to-menu-btn')) {
            b.onclick = () => { Haptics.light(); closeModal(); };
        }
    });

    document.querySelectorAll('.bot-btn').forEach(btn => {
        btn.onclick = () => {
            Haptics.light();
            const stake = parseInt(btn.dataset.stake);
            if (state.coins < stake) { Haptics.error(); return alert('Недостаточно монет!'); }
            state.coins -= stake;
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

    document.querySelectorAll('.theme-circle').forEach(btn => {
        btn.onclick = () => { Haptics.medium(); applyTheme(btn.dataset.theme); };
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
    switchScreen('menu');
    state.isGameActive = false;
    state.activeSession = null;
    localStorage.removeItem('mx_active_session');
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
            if (id.startsWith('hint')) state.inventory.hints += (id === 'hint_5' ? 5 : 1);
            else if (id === 'freeze') state.inventory.freezes++;
            else if (id.startsWith('crystal')) state.inventory.crystals += (id === 'crystal_3' ? 3 : 1);
            else if (id.startsWith('theme_')) {
                const themeName = id.replace('theme_', '');
                state.inventory.themes.push(themeName);
                ServerAPI.addToInventory('theme', themeName);
            }

            Haptics.success();
            saveData(); updateUI(); updateShopButtons();
            if (window.lucide) lucide.createIcons();
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

function startLevel(diff, num) {
    state.isBattle = (num === 'BATTLE');
    state.isDaily = (num === 'Daily');
    if (state.isDaily) {
        const today = new Date().toISOString().slice(0, 10);
        if (state.lastDaily === today) return alert('Вызов уже выполнен!');
    }

    let level;
    let seconds = 0;

    if (state.activeSession && state.activeSession.diff === diff && state.activeSession.num === num) {
        level = { grid: state.activeSession.grid, answers: state.activeSession.answers, fixedCells: state.activeSession.fixedCells };
        state.lastGeneratedGrid = state.activeSession.lastGeneratedGrid;
        seconds = state.activeSession.seconds;
    } else {
        level = state.isDaily ? window.LevelGenerator.generateDaily(new Date().toISOString().slice(0, 10)) : window.LevelGenerator.generateLevel(diff);
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

    renderGrid(level.grid);
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
    container.style.gridTemplateColumns = `repeat(${grid.length}, 1fr)`;
    grid.forEach((row, r) => {
        row.forEach((val, c) => {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.r = r; cell.dataset.c = c;
            const isFixed = state.fixedCells[`${r}-${c}`];
            if (['+','-','*','/','='].includes(val)) {
                cell.classList.add('operator');
                cell.textContent = val;
            } else if (isFixed) {
                cell.textContent = val;
                cell.classList.add('fixed');
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
    state.activeSession = null;
    localStorage.removeItem('mx_active_session');
    if (state.isDaily) state.lastDaily = new Date().toISOString().slice(0, 10);
    else if (!state.isBattle) {
        if (state.diff === 'easy' && state.currentLevelNum === state.unlocked) state.unlocked++;
        else if (state.diff === 'medium' && state.currentLevelNum === state.unlockedMedium) state.unlockedMedium++;
        else if (state.diff === 'hard' && state.currentLevelNum === state.unlockedHard) state.unlockedHard++;
        else if (state.diff === 'expert' && state.currentLevelNum === state.unlockedExpert) state.unlockedExpert++;
    }
    
    const reward = (state.isDaily ? 200 : (state.isBattle ? state.battleStake * 2 : (state.diff === 'hard' ? 50 : 30)));
    state.coins += reward;
    state.xp += 20;
    state.level = Math.floor(state.xp / 100) + 1;
    
    const winRewardText = document.getElementById('win-reward-text');
    if (winRewardText) winRewardText.textContent = `+${reward} 🪙`;
    
    saveData();
    ServerAPI.saveScore(state.diff, state.secondsElapsed, reward);
    
    showModal(state.isBattle ? 'battle-result' : 'win');
    if (typeof confetti !== 'undefined') confetti({ particleCount: 150 });
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
    if (state.isBattle) startBot();
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

function saveCurrentToSession() {
    if (!state.lastGeneratedGrid || state.isBattle) return;
    const emptyCells = Array.from(document.querySelectorAll('.cell.empty'));
    const hasInput = emptyCells.some(c => c.textContent !== '');
    if (!hasInput) {
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
    state.activeSession = { diff: state.diff, num: state.currentLevelNum, grid, answers: state.currentAnswers, fixedCells: state.fixedCells, seconds: state.secondsElapsed, lastGeneratedGrid: state.lastGeneratedGrid };
    saveData();
}

function selectCell(el) {
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
}

function closeModal() { document.getElementById('modal-container').classList.add('hidden'); }

function useHint() {
    if (state.inventory.hints <= 0 || !state.isGameActive) { Haptics.error(); return; }
    const cells = document.querySelectorAll('.cell.empty');
    for (let c of cells) {
        const ans = state.currentAnswers[`${c.dataset.r}-${c.dataset.c}`];
        if (c.textContent !== ans) {
            Haptics.success();
            c.textContent = ans;
            state.inventory.hints--;
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
        const ans = state.currentAnswers[`${c.dataset.r}-${c.dataset.c}`];
        if (c.textContent !== ans) {
            c.textContent = ans;
            count++;
            if (count >= 3) break;
        }
    }
    saveCurrentToSession();
    updateUI();
    updateProgressBar();
    checkWin();
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
}

async function renderMissions() {
    const list = document.getElementById('missions-list');
    if (!list) return;
    const m = await ServerAPI.getMissions();
    const missions = m && m.length > 0 ? m : [
        { id: 'solve_3', title: 'Реши 3 уровня', goal: 3, progress: Math.min(state.stats.totalSolved, 3), reward: 50 },
        { id: 'solve_10', title: 'Математик: 10 уровней', goal: 10, progress: Math.min(state.stats.totalSolved, 10), reward: 200 }
    ];
    list.innerHTML = missions.map(x => `
        <div style="background:var(--card-onyx); padding:15px; border-radius:15px; display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border: 1px solid var(--glass-border);">
            <div style="display:flex; flex-direction:column;">
                <span style="font-weight:bold;">${x.title}</span>
                <span style="font-size:0.8rem; color:var(--text-dim);">${x.progress}/${x.goal}</span>
            </div>
            <button class="buy-btn ${x.progress < x.goal ? 'disabled' : ''}" onclick="window.claimMissionReward('${x.id}', ${x.reward})" style="padding: 8px 12px; font-size: 0.8rem;">${x.reward} <i data-lucide="coins" style="width:12px; height:12px;"></i></button>
        </div>
    `).join('');
    if (window.lucide) lucide.createIcons();
}

window.claimMissionReward = async (id, reward) => {
    const res = await ServerAPI.claimMission(id);
    if (res?.status === 'reward_claimed') {
        Haptics.success();
        state.coins += reward;
        saveData(); updateUI(); renderMissions();
    }
};

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
                    <span style="font-weight:bold;">${player.display_name || 'Игрок'}</span>
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
        { id: 1, name: "Neon", url: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=600", levels_required: 5 },
        { id: 2, name: "Math", url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600", levels_required: 15 }
    ];
    const s = await ServerAPI.getStats();
    const solved = s?.total_solved || state.stats.totalSolved;
    grid.innerHTML = ART_COLLECTION.map(art => {
        const isUnlocked = solved >= art.levels_required;
        return `<div class="art-card" style="position:relative; aspect-ratio:1; border-radius:20px; overflow:hidden; background:var(--card-onyx); border:1px solid var(--glass-border);">
            <img src="${art.url}" style="width:100%; height:100%; object-fit:cover; filter:${isUnlocked ? 'none' : 'blur(15px)'}; opacity:${isUnlocked ? '1' : '0.4'};">
            ${!isUnlocked ? `<div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; background:rgba(0,0,0,0.5);">
                <i data-lucide="lock" style="color:var(--gold); margin-bottom:5px;"></i><span style="font-size:0.7rem;">${solved}/${art.levels_required}</span>
            </div>` : ''}
        </div>`;
    }).join('');
    if (window.lucide) lucide.createIcons();
}

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
    if (document.hidden && state.isGameActive && !state.isBattle) pauseGame();
});
