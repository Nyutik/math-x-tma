// MathX Infinity Generator 4.1 - Fast & Stable
(function() {
    const GRID_SIZES = { easy: 5, medium: 7, hard: 9, expert: 11 };

    // Быстрый и надежный генератор случайных чисел по сиду
    class SeededRNG {
        constructor(seed) { this.seed = seed; }
        next() {
            this.seed = (this.seed * 16807) % 2147483647;
            return (this.seed - 1) / 2147483646;
        }
        randomInt(min, max) { return Math.floor(this.next() * (max - min + 1)) + min; }
    }

    const LevelGenerator = {
        GRID_SIZES,
        
        calculate(a, b, op) {
            if (op === '+') return a + b;
            if (op === '-') return a - b;
            if (op === '*') return a * b;
            if (op === '/') return b !== 0 && a % b === 0 ? a / b : null;
            return null;
        },

        generateLevel(difficulty = 'easy', seed = null) {
            const rng = new SeededRNG(seed || Math.floor(Math.random() * 1000000));
            const size = GRID_SIZES[difficulty] || 5;
            let operators = difficulty === 'easy' ? ['+', '-'] : (difficulty === 'medium' ? ['+', '-', '*'] : ['+', '-', '*', '/']);

            let attempts = 0;
            const maxAttempts = difficulty === 'expert' ? 500 : 200;
            
            while (attempts < maxAttempts) {
                attempts++;
                const grid = Array(size).fill().map(() => Array(size).fill(''));
                const values = {};
                
                // 1. Сначала заполняем только ячейки для чисел
                const maxNum = 9;
                for (let r = 0; r < size - 1; r += 2) {
                    for (let c = 0; c < size - 1; c += 2) {
                        values[`${r}-${c}`] = rng.randomInt(1, maxNum);
                    }
                }

                let isValid = true;
                // 2. Рассчитываем горизонтали
                for (let r = 0; r < size - 1; r += 2) {
                    let res = values[`${r}-0`];
                    for (let c = 1; c < size - 2; c += 2) {
                        let op = operators[rng.randomInt(0, operators.length - 1)];
                        let next = values[`${r}-${c+1}`];
                        if (op === '/' && res % next !== 0) op = '+';
                        res = this.calculate(res, next, op);
                        if (res === null || res < 1 || res > 400) { isValid = false; break; }
                        grid[r][c] = op;
                    }
                    if (!isValid) break;
                    grid[r][size - 2] = '=';
                    grid[r][size - 1] = String(res);
                }
                if (!isValid) continue;

                // 3. Рассчитываем вертикали
                for (let c = 0; c < size - 1; c += 2) {
                    let res = values[`0-${c}`];
                    for (let r = 1; r < size - 2; r += 2) {
                        let op = operators[rng.randomInt(0, operators.length - 1)];
                        let next = values[`${r+1}-${c}`];
                        if (op === '/' && res % next !== 0) op = '+';
                        res = this.calculate(res, next, op);
                        if (res === null || res < 1 || res > 400) { isValid = false; break; }
                        grid[r][c] = op;
                    }
                    if (!isValid) break;
                    grid[size - 2][c] = '=';
                    grid[size - 1][c] = String(res);
                }
                if (!isValid) continue;

                // 4. Скрытие ячеек
                const answers = {};
                const fixedCells = {};
                const hides = { easy: 4, medium: 9, hard: 16, expert: 25 };
                const targetHidden = hides[difficulty] || 5;
                
                let possible = [];
                for (let r = 0; r < size - 1; r += 2) {
                    for (let c = 0; c < size - 1; c += 2) possible.push({r, c});
                }
                
                for (let i = possible.length - 1; i > 0; i--) {
                    const j = Math.floor(rng.next() * (i + 1));
                    [possible[i], possible[j]] = [possible[j], possible[i]];
                }

                let hiddenCount = 0;
                possible.forEach(pos => {
                    const val = String(values[`${pos.r}-${pos.c}`]);
                    if (hiddenCount < targetHidden) {
                        grid[pos.r][pos.c] = '';
                        answers[`${pos.r}-${pos.c}`] = val;
                        hiddenCount++;
                    } else {
                        grid[pos.r][pos.c] = val;
                        fixedCells[`${pos.r}-${pos.c}`] = true;
                    }
                });

                // Операторы и результаты всегда фиксированы
                for (let r = 0; r < size; r++) {
                    for (let c = 0; c < size; c++) {
                        if (grid[r][c] !== '' && !answers[`${r}-${c}`]) {
                            fixedCells[`${r}-${c}`] = true;
                        }
                    }
                }

                return { grid, answers, fixedCells, difficulty, size };
            }
            return this.generateFallback(difficulty);
        },

        generateDaily(dateStr) {
            const seed = parseInt(dateStr.replace(/-/g, ''));
            return this.generateLevel('hard', seed);
        },

        generateFallback(diff) {
            const grid = [['1','+','2','=','3'],['+','','+','',''],['4','+','5','=','9'],['=','','=','',''],['5','','7','','']];
            return { grid, answers: {'0-0':'1','0-2':'2','2-0':'4','2-2':'5'}, fixedCells: {'0-1':true,'0-3':true,'0-4':true,'1-0':true,'1-2':true,'2-1':true,'2-3':true,'2-4':true,'3-0':true,'3-2':true,'4-0':true,'4-2':true}, difficulty: diff, size: 5 };
        }
    };
    window.LevelGenerator = LevelGenerator;
})();
