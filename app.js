const App = {
    currentPage: 'home',
    scores: {
        arabic: { score: 0, level: 1, lives: 3, currentName: null, hintLevel: 0 },
        english: { score: 0, level: 1, lives: 3, currentName: null, hintLevel: 0 },
        ai: { score: 0, solved: 0, currentPuzzle: null }
    },
    leaderboard: { arabic: [], english: [], ai: [] },
    aiEngine: new AIPuzzleEngine(),

    init() {
        this.loadScores();
        this.setupNavigation();
        this.setupGames();
        this.setupLeaderboard();
        this.showPage('home');
    },

    loadScores() {
        const saved = localStorage.getItem('puzzleScores');
        if (saved) {
            this.scores = JSON.parse(saved);
        }
        const lb = localStorage.getItem('leaderboard');
        if (lb) {
            this.leaderboard = JSON.parse(lb);
        }
    },

    saveScores() {
        localStorage.setItem('puzzleScores', JSON.stringify(this.scores));
    },

    saveLeaderboard() {
        localStorage.setItem('leaderboard', JSON.stringify(this.leaderboard));
    },

    setupNavigation() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.showPage(btn.dataset.page);
            });
        });

        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.classList.contains('play-btn')) {
                    this.showPage(card.dataset.page);
                }
            });
        });

        document.querySelectorAll('.play-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = btn.closest('.card');
                this.showPage(card.dataset.page);
            });
        });
    },

    showPage(page) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        
        document.getElementById(page).classList.add('active');
        document.querySelector(`.nav-btn[data-page="${page}"]`).classList.add('active');
        
        this.currentPage = page;

        if (page === 'arabic-names') this.startNameGame('arabic');
        if (page === 'english-names') this.startNameGame('english');
        if (page === 'ai-puzzle') this.startAIPuzzle();
        if (page === 'leaderboard') this.updateLeaderboard();
    },

    startNameGame(type) {
        const state = this.scores[type];
        state.currentName = NameDatabase.getRandomName(type);
        state.hintLevel = 0;
        state.options = this.generateNameOptions(type, state.currentName);
        
        this.updateGameUI(type);
    },

    generateNameOptions(type, correctName) {
        const list = type === 'arabic' ? NameDatabase.arabic : NameDatabase.english;
        const options = [correctName.name];
        
        while (options.length < 4) {
            const randomName = list[Math.floor(Math.random() * list.length)].name;
            if (!options.includes(randomName)) {
                options.push(randomName);
            }
        }
        
        return this.shuffleArray(options);
    },

    shuffleArray(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    },

    updateGameUI(type) {
        const state = this.scores[type];
        const nameObj = state.currentName;
        
        document.getElementById(`${type}-score`).textContent = state.score;
        document.getElementById(`${type}-level`).textContent = state.level;
        document.getElementById(`${type}-lives`).textContent = '❤️'.repeat(state.lives);
        
        document.getElementById(`${type}-clue`).textContent = `Clue: ${nameObj.clue}`;
        document.getElementById(`${type}-scrambled`).textContent = NameDatabase.scramble(nameObj.name);
        document.getElementById(`${type}-feedback`).textContent = '';
        document.getElementById(`${type}-hint`).textContent = '';
        
        const optionsContainer = document.getElementById(`${type}-options`);
        optionsContainer.innerHTML = '';
        
        state.options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option;
            btn.setAttribute('dir', type === 'arabic' ? 'rtl' : 'ltr');
            btn.addEventListener('click', () => this.checkNameGuess(type, option));
            optionsContainer.appendChild(btn);
        });
    },

    setupGames() {
        this.setupNameGame('arabic');
        this.setupNameGame('english');
        this.setupAIGame();
    },

    setupNameGame(type) {
        const hintBtn = document.getElementById(`${type}-hint-btn`);
        const skipBtn = document.getElementById(`${type}-skip`);

        hintBtn.addEventListener('click', () => this.showHint(type));
        skipBtn.addEventListener('click', () => this.skipName(type));
    },

    checkNameGuess(type, guess) {
        const state = this.scores[type];
        const feedback = document.getElementById(`${type}-feedback`);
        
        if (!guess) return;
        
        if (guess === state.currentName.name) {
            feedback.textContent = '✅ Correct!';
            feedback.className = 'feedback correct';
            state.score += 10 * state.level;
            state.level++;
            this.saveScores();
            
            setTimeout(() => {
                state.currentName = NameDatabase.getRandomName(type);
                state.hintLevel = 0;
                state.options = this.generateNameOptions(type, state.currentName);
                this.updateGameUI(type);
            }, 1000);
        } else {
            feedback.textContent = `❌ Wrong! The answer was: ${state.currentName.name} (${state.currentName.transliteration})`;
            feedback.className = 'feedback wrong';
            state.lives--;
            this.saveScores();
            
            if (state.lives <= 0) {
                setTimeout(() => {
                    this.gameOver(type);
                }, 1500);
            } else {
                setTimeout(() => {
                    state.currentName = NameDatabase.getRandomName(type);
                    state.hintLevel = 0;
                    state.options = this.generateNameOptions(type, state.currentName);
                    this.updateGameUI(type);
                }, 2000);
            }
        }
    },

    showHint(type) {
        const state = this.scores[type];
        state.hintLevel++;
        const hint = NameDatabase.getHint(state.currentName, state.hintLevel);
        document.getElementById(`${type}-hint`).textContent = `Hint: ${hint}`;
        state.score = Math.max(0, state.score - 5);
        this.saveScores();
        this.updateGameUI(type);
    },

    skipName(type) {
        const state = this.scores[type];
        state.lives--;
        this.saveScores();
        
        if (state.lives <= 0) {
            this.gameOver(type);
        } else {
            state.currentName = NameDatabase.getRandomName(type);
            state.hintLevel = 0;
            this.updateGameUI(type);
        }
    },

    gameOver(type) {
        const state = this.scores[type];
        alert(`Game Over! Final Score: ${state.score}`);
        
        this.leaderboard[type].push({
            player: 'Player',
            score: state.score,
            date: new Date().toLocaleDateString()
        });
        this.leaderboard[type].sort((a, b) => b.score - a.score);
        this.leaderboard[type] = this.leaderboard[type].slice(0, 10);
        this.saveLeaderboard();
        
        state.score = 0;
        state.level = 1;
        state.lives = 3;
        this.saveScores();
        this.startNameGame(type);
    },

    startAIPuzzle() {
        document.getElementById('ai-loading').classList.remove('hidden');
        document.getElementById('ai-puzzle-content').classList.add('hidden');
        
        setTimeout(() => {
            const puzzle = this.aiEngine.generatePuzzle();
            this.scores.ai.currentPuzzle = puzzle;
            
            document.getElementById('ai-puzzle-type').textContent = `Type: ${puzzle.type}`;
            document.getElementById('ai-question').textContent = puzzle.question;
            document.getElementById('ai-feedback').textContent = '';
            document.getElementById('ai-explanation').textContent = '';
            document.getElementById('ai-input').value = '';
            
            const optionsContainer = document.getElementById('ai-options');
            optionsContainer.innerHTML = '';
            
            if (puzzle.options) {
                puzzle.options.forEach(option => {
                    const btn = document.createElement('button');
                    btn.className = 'option-btn';
                    btn.textContent = option;
                    btn.addEventListener('click', () => {
                        document.getElementById('ai-input').value = option;
                    });
                    optionsContainer.appendChild(btn);
                });
                document.getElementById('ai-input').classList.add('hidden');
            } else {
                document.getElementById('ai-input').classList.remove('hidden');
            }
            
            document.getElementById('ai-loading').classList.add('hidden');
            document.getElementById('ai-puzzle-content').classList.remove('hidden');
        }, 800);
    },

    setupAIGame() {
        document.getElementById('ai-submit').addEventListener('click', () => this.checkAIPuzzle());
        document.getElementById('ai-new').addEventListener('click', () => this.startAIPuzzle());
        
        document.getElementById('ai-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkAIPuzzle();
        });
    },

    checkAIPuzzle() {
        const state = this.scores.ai;
        const puzzle = state.currentPuzzle;
        const input = document.getElementById('ai-input');
        const guess = input.value.trim().toLowerCase();
        const feedback = document.getElementById('ai-feedback');
        const explanation = document.getElementById('ai-explanation');
        
        if (!guess) return;
        
        if (guess === puzzle.answer.toLowerCase()) {
            feedback.textContent = '✅ Correct!';
            feedback.className = 'feedback correct';
            state.score += 15;
            state.solved++;
            this.saveScores();
            
            document.getElementById('ai-score').textContent = state.score;
            document.getElementById('ai-solved').textContent = state.solved;
            
            explanation.textContent = `Explanation: ${puzzle.explanation}`;
            explanation.className = 'explanation show';
            
            setTimeout(() => this.startAIPuzzle(), 3000);
        } else {
            feedback.textContent = `❌ Wrong! The answer was: ${puzzle.answer}`;
            feedback.className = 'feedback wrong';
            explanation.textContent = `Explanation: ${puzzle.explanation}`;
            explanation.className = 'explanation show';
            
            setTimeout(() => this.startAIPuzzle(), 3000);
        }
    },

    setupLeaderboard() {
        document.querySelectorAll('.lb-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.lb-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.updateLeaderboard(tab.dataset.lb);
            });
        });
        
        document.getElementById('reset-scores').addEventListener('click', () => {
            if (confirm('Reset all scores and leaderboard?')) {
                localStorage.clear();
                this.scores = {
                    arabic: { score: 0, level: 1, lives: 3, currentName: null, hintLevel: 0 },
                    english: { score: 0, level: 1, lives: 3, currentName: null, hintLevel: 0 },
                    ai: { score: 0, solved: 0, currentPuzzle: null }
                };
                this.leaderboard = { arabic: [], english: [], ai: [] };
                this.saveScores();
                this.saveLeaderboard();
                this.updateLeaderboard();
            }
        });
    },

    updateLeaderboard(type = 'arabic') {
        const tbody = document.getElementById('lb-body');
        const data = this.leaderboard[type] || [];
        
        tbody.innerHTML = data.map((entry, index) => `
            <tr>
                <td>${['🥇', '🥈', '🥉', '4', '5', '6', '7', '8', '9', '10'][index]}</td>
                <td>${entry.player}</td>
                <td>${entry.score}</td>
                <td>${entry.date}</td>
            </tr>
        `).join('') || '<tr><td colspan="4">No scores yet. Play a game!</td></tr>';
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
