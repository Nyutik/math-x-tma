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
            while (attempts < 200) {
                attempts++;
                const grid = Array(size).fill().map(() => Array(size).fill(''));
                const values = {};
                
                // 1. Генерируем числа
                for (let r = 0; r < size; r += 2) {
                    for (let c = 0; c < size; c += 2) {
                        values[`${r}-${c}`] = rng.randomInt(1, 9);
                    }
                }

                let isValid = true;
                // 2. Горизонтали
                for (let r = 0; r < size; r += 2) {
                    let res = values[`${r}-0`];
                    for (let c = 1; c < size - 1; c += 2) {
                        let op = operators[rng.randomInt(0, operators.length - 1)];
                        let next = values[`${r}-${c+1}`];
                        if (op === '/' && res % next !== 0) op = '+';
                        res = this.calculate(res, next, op);
                        if (res === null || res < 1 || res > 100) { isValid = false; break; }
                        grid[r][c] = op;
                    }
                    if (!isValid) break;
                    grid[r][size-2] = '=';
                    grid[r][size-1] = String(res);
                }
                if (!isValid) continue;

                // 3. Вертикали
                for (let c = 0; c < size; c += 2) {
                    let res = values[`0-${c}`];
                    for (let r = 1; r < size - 1; r += 2) {
                        let op = operators[rng.randomInt(0, operators.length - 1)];
                        let next = values[`${r+1}-${c}`];
                        if (op === '/' && res % next !== 0) op = '+';
                        res = this.calculate(res, next, op);
                        if (res === null || res < 1 || res > 100) { isValid = false; break; }
                        grid[r][c] = op;
                    }
                    if (!isValid) break;
                    grid[size-2][c] = '=';
                    grid[size-1][c] = String(res);
                }
                if (!isValid) continue;

                // 4. Скрытие ячеек
                const answers = {};
                const fixedCells = {};
                const targetHidden = difficulty === 'easy' ? 3 : (difficulty === 'medium' ? 7 : (difficulty === 'hard' ? 12 : 20));
                
                let cells = [];
                for (let r = 0; r < size - 1; r += 2) {
                    for (let c = 0; c < size - 1; c += 2) cells.push({r, c});
                }
                
                // Перемешиваем клетки
                for (let i = cells.length - 1; i > 0; i--) {
                    const j = Math.floor(rng.next() * (i + 1));
                    [cells[i], cells[j]] = [cells[j], cells[i]];
                }

                let hidden = 0;
                cells.forEach(cell => {
                    const val = String(values[`${cell.r}-${cell.c}`]);
                    if (hidden < targetHidden) {
                        grid[cell.r][cell.c] = '';
                        answers[`${cell.r}-${cell.c}`] = val;
                        hidden++;
                    } else {
                        grid[cell.r][cell.c] = val;
                        fixedCells[`${cell.r}-${cell.c}`] = true;
                    }
                });

                // Добавляем операторы и результаты в fixed
                for (let r = 0; r < size; r++) {
                    for (let c = 0; c < size; c++) {
                        if (grid[r][c] !== '' && !fixedCells[`${r}-${c}`]) fixedCells[`${r}-${c}`] = true;
                    }
                }

                return { grid, answers, fixedCells, difficulty, size };
            }
            return this.generateFallback(difficulty, size);
        },

        generateDaily(dateStr) {
            const seed = parseInt(dateStr.replace(/-/g, ''));
            return this.generateLevel('hard', seed);
        },

        generateFallback(diff, size) {
            const grid = Array(size).fill().map(() => Array(size).fill(''));
            const answers = {};
            const fixedCells = {};
            for(let r=0; r<size; r+=2) {
                for(let c=0; c<size; c+=2) {
                    if (c < size-2) {
                        grid[r][c] = '1'; grid[r][c+1] = '+'; 
                        fixedCells[`${r}-${c}`] = true; fixedCells[`${r}-${c+1}`] = true;
                    } else {
                        grid[r][c] = String((size-1)/2); // Simplified horizontal sum
                        fixedCells[`${r}-${c}`] = true;
                    }
                    if (c === 0 && r < size-1) {
                         grid[r+1][c] = '+'; fixedCells[`${r+1}-${c}`] = true;
                    }
                }
                if (r < size-2) grid[r][size-2] = '=';
            }
            // Just a dummy valid-ish grid for emergency
            return { grid, answers: {}, fixedCells, difficulty: diff, size };
        }
    };
    window.LevelGenerator = LevelGenerator;
})();
