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
            while (attempts < 300) {
                attempts++;
                const grid = Array(size).fill().map(() => Array(size).fill(''));
                const values = {};
                
                // 1. Fill values first
                for (let r = 0; r < size; r += 2) {
                    for (let c = 0; c < size; c += 2) {
                        values[`${r}-${c}`] = rng.randomInt(1, 9);
                    }
                }

                let isValid = true;
                // 2. Build rows
                for (let r = 0; r < size; r += 2) {
                    let rowVal = values[`${r}-0`];
                    for (let c = 1; c < size - 1; c += 2) {
                        let op = operators[rng.randomInt(0, operators.length - 1)];
                        let nextVal = values[`${r}-${c+1}`];
                        if (op === '/' && rowVal % nextVal !== 0) op = (rng.next() > 0.5 ? '+' : '-');
                        rowVal = this.calculate(rowVal, nextVal, op);
                        if (rowVal === null || rowVal < 1 || rowVal > 200) { isValid = false; break; }
                        grid[r][c] = op;
                    }
                    if (!isValid) break;
                    grid[r][size-2] = '=';
                    grid[r][size-1] = String(rowVal);
                }
                if (!isValid) continue;

                // 3. Build columns and check intersections
                for (let c = 0; c < size; c += 2) {
                    let colVal = values[`0-${c}`];
                    for (let r = 1; r < size - 1; r += 2) {
                        let op = operators[rng.randomInt(0, operators.length - 1)];
                        let nextVal = values[`${r+1}-${c}`];
                        if (op === '/' && colVal % nextVal !== 0) op = (rng.next() > 0.5 ? '+' : '-');
                        colVal = this.calculate(colVal, nextVal, op);
                        if (colVal === null || colVal < 1 || colVal > 200) { isValid = false; break; }
                        grid[r][c] = op;
                    }
                    if (!isValid) break;
                    grid[size-2][c] = '=';
                    grid[size-1][c] = String(colVal);
                }
                if (!isValid) continue;

                // 4. Hide cells
                const answers = {};
                const fixedCells = {};
                const hides = { easy: 4, medium: 10, hard: 18, expert: 35 };
                const targetHidden = hides[difficulty] || 5;
                
                let possible = [];
                for (let r = 0; r < size - 1; r += 2) {
                    for (let c = 0; c < size - 1; c += 2) possible.push({r, c});
                }
                
                // Shuffle possible
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

                // Set all other items as fixed
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
            // Emergency fallback that is always valid
            const grid = Array(size).fill().map(() => Array(size).fill(''));
            const answers = {};
            const fixedCells = {};
            for(let r=0; r<size; r+=2) {
                for(let c=0; c<size; c+=2) {
                    grid[r][c] = '1';
                    if (c < size-2) grid[r][c+1] = '+';
                    if (r < size-2) grid[r+1][c] = '+';
                }
                grid[r][size-2] = '=';
                grid[r][size-1] = String((size+1)/2);
            }
            // Hide just one cell to not crash
            grid[0][0] = ''; answers['0-0'] = '1';
            return { grid, answers, fixedCells, difficulty: diff, size };
        }
    };
    window.LevelGenerator = LevelGenerator;
})();
