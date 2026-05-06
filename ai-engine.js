class AIPuzzleEngine {
    constructor() {
        this.puzzleTypes = ['riddle', 'pattern', 'math', 'logic', 'wordplay'];
        this.difficulty = 1;
    }

    generatePuzzle() {
        const type = this.puzzleTypes[Math.floor(Math.random() * this.puzzleTypes.length)];
        
        switch(type) {
            case 'riddle':
                return this.generateRiddle();
            case 'pattern':
                return this.generatePattern();
            case 'math':
                return this.generateMath();
            case 'logic':
                return this.generateLogic();
            case 'wordplay':
                return this.generateWordplay();
            default:
                return this.generateRiddle();
        }
    }

    generateRiddle() {
        const riddles = [
            {
                question: "I speak without a mouth and hear without ears. I have no body, but come alive with wind. What am I?",
                answer: "echo",
                options: ["shadow", "echo", "mirror", "wind"],
                explanation: "An echo repeats sound without having a mouth, and 'hears' without ears."
            },
            {
                question: "The more of this you take, the more you leave behind. What is it?",
                answer: "footsteps",
                options: ["time", "memories", "footsteps", "money"],
                explanation: "Each step you take leaves a footprint behind."
            },
            {
                question: "I have keys but no locks. I have space but no room. You can enter but can't go outside. What am I?",
                answer: "keyboard",
                options: ["map", "keyboard", "book", "computer"],
                explanation: "A keyboard has keys, space bar, and Enter key."
            },
            {
                question: "What has hands but cannot clap?",
                answer: "clock",
                options: ["clock", "puppet", "owl", "beggar"],
                explanation: "A clock has hour and minute hands but cannot clap."
            },
            {
                question: "What can travel around the world while staying in a corner?",
                answer: "stamp",
                options: ["bird", "plane", "stamp", "shadow"],
                explanation: "A stamp stays in the corner of an envelope but travels worldwide."
            },
            {
                question: "I'm tall when I'm young, and short when I'm old. What am I?",
                answer: "candle",
                options: ["tree", "candle", "person", "mountain"],
                explanation: "A candle is tall when new and becomes shorter as it burns."
            },
            {
                question: "What has many teeth but cannot bite?",
                answer: "comb",
                options: ["saw", "comb", "zipper", "fork"],
                explanation: "A comb has many teeth but cannot bite."
            },
            {
                question: "What gets wetter the more it dries?",
                answer: "towel",
                options: ["cloud", "towel", "sponge", "rain"],
                explanation: "A towel gets wetter as it dries things off."
            }
        ];
        
        return {
            type: 'Riddle',
            ...riddles[Math.floor(Math.random() * riddles.length)]
        };
    }

    generatePattern() {
        const patterns = [
            {
                question: "What comes next: 2, 4, 8, 16, ?",
                answer: "32",
                options: ["24", "30", "32", "64"],
                explanation: "Each number is multiplied by 2 (powers of 2)."
            },
            {
                question: "Complete the pattern: A, C, E, G, ?",
                answer: "I",
                options: ["H", "I", "J", "K"],
                explanation: "Every other letter in the alphabet (skip one each time)."
            },
            {
                question: "What comes next: 1, 1, 2, 3, 5, 8, ?",
                answer: "13",
                options: ["11", "12", "13", "15"],
                explanation: "Fibonacci sequence - each number is the sum of two preceding ones."
            },
            {
                question: "Find the next: Monday, Wednesday, Friday, ?",
                answer: "Sunday",
                options: ["Saturday", "Sunday", "Tuesday", "Thursday"],
                explanation: "Skipping one day each time (every other day)."
            },
            {
                question: "What comes next: 1, 4, 9, 16, ?",
                answer: "25",
                options: ["20", "24", "25", "36"],
                explanation: "Square numbers: 1², 2², 3², 4², 5² = 25."
            },
            {
                question: "Complete: Z, X, V, T, ?",
                answer: "R",
                options: ["S", "R", "Q", "P"],
                explanation: "Skipping one letter backwards in the alphabet each time."
            }
        ];
        
        return {
            type: 'Pattern Recognition',
            ...patterns[Math.floor(Math.random() * patterns.length)]
        };
    }

    generateMath() {
        const operations = ['+', '-', '*'];
        const op = operations[Math.floor(Math.random() * operations.length)];
        let num1, num2, answer;
        
        if (op === '+') {
            num1 = Math.floor(Math.random() * 50) + 1;
            num2 = Math.floor(Math.random() * 50) + 1;
            answer = num1 + num2;
        } else if (op === '-') {
            num1 = Math.floor(Math.random() * 50) + 20;
            num2 = Math.floor(Math.random() * 20) + 1;
            answer = num1 - num2;
        } else {
            num1 = Math.floor(Math.random() * 12) + 1;
            num2 = Math.floor(Math.random() * 12) + 1;
            answer = num1 * num2;
        }
        
        const wrongAnswers = [
            answer + Math.floor(Math.random() * 10) + 1,
            answer - Math.floor(Math.random() * 10) - 1,
            answer + Math.floor(Math.random() * 20) + 10
        ].filter(n => n !== answer);
        
        const options = [answer, ...wrongAnswers.slice(0, 3)];
        
        return {
            type: 'Math Puzzle',
            question: `Solve: ${num1} ${op} ${num2} = ?`,
            answer: answer.toString(),
            options: this.shuffleArray(options).map(String),
            explanation: `${num1} ${op} ${num2} = ${answer}`
        };
    }

    generateLogic() {
        const logics = [
            {
                question: "All cats are animals. Some animals can fly. Which statement is definitely true?",
                answer: "Some cats might fly",
                options: ["All cats can fly", "Some cats might fly", "No cats can fly", "All animals can fly"],
                explanation: "Since only SOME animals can fly, cats (being animals) MIGHT be among those that can fly."
            },
            {
                question: "If it rains, the ground gets wet. The ground is wet. What can we conclude?",
                answer: "It might have rained",
                options: ["It definitely rained", "It might have rained", "It didn't rain", "The sprinkler is on"],
                explanation: "Wet ground doesn't guarantee rain - there could be other causes (sprinkler, etc)."
            },
            {
                question: "Alice is taller than Bob. Bob is taller than Charlie. Who is shortest?",
                answer: "Charlie",
                options: ["Alice", "Bob", "Charlie", "Cannot tell"],
                explanation: "Alice > Bob > Charlie, so Charlie is the shortest."
            },
            {
                question: "In a race, you pass the person in 2nd place. What position are you in now?",
                answer: "2nd place",
                options: ["1st place", "2nd place", "3rd place", "Last place"],
                explanation: "If you pass 2nd place, you take their position - 2nd place."
            },
            {
                question: "A farmer has 10 sheep, all but 3 die. How many are left?",
                answer: "3",
                options: ["7", "3", "10", "0"],
                explanation: "'All but 3 die' means 3 survive."
            }
        ];
        
        return {
            type: 'Logic Puzzle',
            ...logics[Math.floor(Math.random() * logics.length)]
        };
    }

    generateWordplay() {
        const wordplays = [
            {
                question: "What word becomes shorter when you add two letters to it?",
                answer: "short",
                options: ["long", "short", "small", "tiny"],
                explanation: "Add 'er' to 'short' and it becomes 'shorter' (longer word but means shorter)."
            },
            {
                question: "Which weighs more: a pound of feathers or a pound of bricks?",
                answer: "same",
                options: ["feathers", "bricks", "same", "depends"],
                explanation: "A pound is a pound regardless of what's being weighed."
            },
            {
                question: "What has a head and a tail but no body?",
                answer: "coin",
                options: ["snake", "coin", "fish", "arrow"],
                explanation: "Coins have 'heads' and 'tails' sides but no body."
            },
            {
                question: "What 5-letter word becomes shorter when you add two letters to it?",
                answer: "short",
                options: ["small", "short", "tiny", "brief"],
                explanation: "SHORT + ER = SHORTER (the word means 'shorter' but has more letters)."
            },
            {
                question: "If you have 3 apples and take away 2, how many do you have?",
                answer: "2",
                options: ["1", "2", "3", "0"],
                explanation: "You took 2 apples, so you HAVE 2 apples."
            }
        ];
        
        return {
            type: 'Wordplay',
            ...wordplays[Math.floor(Math.random() * wordplays.length)]
        };
    }

    shuffleArray(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
}
