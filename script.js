// script.js

// --- DOM Elements ---
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const levelCompleteScreen = document.getElementById('level-complete-screen');
const gameOverScreen = document.getElementById('game-over-screen');

const startNormalBtn = document.getElementById('start-normal-btn');
const startDifficultBtn = document.getElementById('start-difficult-btn');
const nextLevelBtn = document.getElementById('next-level-btn');
const quitGameBtn = document.getElementById('quit-game-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const homeScreenBtn = document.getElementById('home-screen-btn');

const currentLevelSpan = document.getElementById('current-level');
const currentScoreSpan = document.getElementById('current-score');
const currentLivesSpan = document.getElementById('current-lives');
const countdownTimerSpan = document.getElementById('countdown-timer');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const motivationMessage = document.getElementById('motivation-message');
const nextQuestionBtn = document.getElementById('next-question-btn');
const completedLevelSpan = document.getElementById('completed-level');
const gameOverMessage = document.getElementById('game-over-message');

// Audio Elements
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');


// --- Game State Variables ---
let currentLevel = 1;
let score = 0;
let lives = 5; // User starts with 5 lives
let difficulty = 'normal'; // Default difficulty
let currentQuestionIndex = 0;
let levelQuestions = []; // Questions for the current level
let timer;
const TIME_PER_QUESTION = 15; // seconds
const QUESTIONS_PER_LEVEL = 10;
const MAX_LEVELS = 20; // As requested, we can extend questions.js for this.

// --- Helper Functions ---

function showScreen(screenId) {
    // Hide all screens
    startScreen.classList.add('hidden');
    gameScreen.classList.add('hidden');
    levelCompleteScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');

    // Show the requested screen
    screenId.classList.remove('hidden');
}

function resetGame() {
    currentLevel = 1;
    score = 0;
    lives = 5;
    currentQuestionIndex = 0;
    clearInterval(timer); // Clear any running timer
    updateUI(); // Update score, lives, level display
}

function updateUI() {
    currentLevelSpan.textContent = currentLevel;
    currentScoreSpan.textContent = score;
    currentLivesSpan.textContent = lives;
    motivationMessage.textContent = ''; // Clear previous messages
    nextQuestionBtn.classList.add('hidden'); // Hide next button by default
    optionsContainer.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('correct', 'wrong'); // Clear feedback styles
        btn.disabled = false; // Enable buttons
    });
}

function getQuestionsForLevel(level, difficulty) {
    // Ensure we have questions for this level and difficulty
    if (questionsByLevel[level] && questionsByLevel[level][difficulty]) {
        // Take QUESTIONS_PER_LEVEL questions for the current level.
        // If there are fewer than 10, take all available.
        // Also, create a shallow copy to prevent modifying the original array if we shuffle.
        return questionsByLevel[level][difficulty].slice(0, QUESTIONS_PER_LEVEL);
    }
    console.warn(`No questions found for Level ${level} with difficulty ${difficulty}.`);
    return [];
}


function startTimer() {
    let timeLeft = TIME_PER_QUESTION;
    countdownTimerSpan.textContent = timeLeft;

    clearInterval(timer); // Clear any existing timer
    timer = setInterval(() => {
        timeLeft--;
        countdownTimerSpan.textContent = timeLeft;

        if (timeLeft <= 5) {
            countdownTimerSpan.style.color = '#E91E63'; // Make timer red when low
        } else {
            countdownTimerSpan.style.color = '#FFC107'; // Yellow otherwise
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeOut();
        }
    }, 1000);
}

function handleTimeOut() {
    motivationMessage.textContent = "Time's up! You lost a life.";
    wrongSound.play(); // Play wrong sound on timeout
    lives--;
    currentLivesSpan.textContent = lives;
    optionsContainer.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true); // Disable options
    nextQuestionBtn.classList.remove('hidden'); // Show next question button

    if (lives <= 0) {
        endGame("You ran out of lives! Better luck next time.");
    } else {
        // Optionally, highlight the correct answer if time runs out
        const currentQ = levelQuestions[currentQuestionIndex];
        optionsContainer.querySelectorAll('.option-btn').forEach(btn => {
            if (btn.dataset.option === currentQ.correct_answer) {
                btn.classList.add('correct');
            }
        });
    }
}

function loadQuestion() {
    updateUI(); // Reset UI state for new question

    // Check if there are enough questions for the current level.
    // If not, it means we've exhausted questions for this difficulty/level range.
    if (currentQuestionIndex >= levelQuestions.length || levelQuestions.length === 0) {
        // All questions for the current level answered OR no questions found for this level
        if (currentLevel < MAX_LEVELS) {
            clearInterval(timer);
            showScreen(levelCompleteScreen);
            completedLevelSpan.textContent = currentLevel;
        } else {
            // Player completed all available levels or reached MAX_LEVELS
            endGame("Congratulations! You completed all available levels!", true);
        }
        return;
    }

    const question = levelQuestions[currentQuestionIndex];
    questionText.textContent = question.question_text;
    optionsContainer.innerHTML = ''; // Clear previous options

    // Shuffle options for the current question
    const shuffledOptions = shuffleArray([...question.options]);

    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.textContent = option;
        // Store the actual answer text in data-option for comparison
        button.dataset.option = option;
        button.addEventListener('click', () => checkAnswer(button, question.correct_answer, question.motivation_message));
        optionsContainer.appendChild(button);
    });

    startTimer(); // Start timer for the new question
}

function checkAnswer(selectedButton, correctAnswer, motivationMsg) {
    clearInterval(timer); // Stop the timer

    const selectedAnswer = selectedButton.dataset.option;
    optionsContainer.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true); // Disable all options after selection

    if (selectedAnswer === correctAnswer) {
        score += 10; // Increase score for correct answer
        motivationMessage.textContent = motivationMsg;
        selectedButton.classList.add('correct');
        currentScoreSpan.textContent = score; // Update score display
        correctSound.play(); // Play correct sound
    } else {
        lives--; // Deduct a life for incorrect answer
        motivationMessage.textContent = `Oops! That's not right. The correct answer was: ${correctAnswer}.`;
        selectedButton.classList.add('wrong');
        currentLivesSpan.textContent = lives; // Update lives display
        wrongSound.play(); // Play wrong sound

        // Highlight the correct answer
        optionsContainer.querySelectorAll('.option-btn').forEach(btn => {
            if (btn.dataset.option === correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }

    // Check for game over condition
    if (lives <= 0) {
        endGame("You ran out of lives! Game Over.");
    } else {
        nextQuestionBtn.classList.remove('hidden'); // Show "Next Question" button
    }
}

function endGame(message, completedAllLevels = false) {
    clearInterval(timer);
    showScreen(gameOverScreen);
    gameOverMessage.textContent = message;
    if (completedAllLevels) {
        gameOverMessage.textContent += ` You scored a magnificent ${score} points!`;
    } else {
        gameOverMessage.textContent += ` Your final score: ${score} points.`;
    }
}

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// --- Event Listeners ---

startNormalBtn.addEventListener('click', () => {
    difficulty = 'normal';
    resetGame();
    // Get all questions for the current level and difficulty, then shuffle them for this session
    levelQuestions = shuffleArray(getQuestionsForLevel(currentLevel, difficulty));
    currentQuestionIndex = 0; // Reset question index for the new level
    showScreen(gameScreen);
    loadQuestion();
});

startDifficultBtn.addEventListener('click', () => {
    difficulty = 'difficult';
    resetGame();
    // Get all questions for the current level and difficulty, then shuffle them for this session
    levelQuestions = shuffleArray(getQuestionsForLevel(currentLevel, difficulty));
    currentQuestionIndex = 0; // Reset question index for the new level
    showScreen(gameScreen);
    loadQuestion();
});

nextQuestionBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    loadQuestion();
});

nextLevelBtn.addEventListener('click', () => {
    currentLevel++;
    currentQuestionIndex = 0; // Reset question index for the new level
    // Get questions for the new level and current difficulty
    levelQuestions = shuffleArray(getQuestionsForLevel(currentLevel, difficulty));
    if (levelQuestions.length === 0) {
        // If no questions for the next level, treat as game complete
        endGame("You've completed all available levels for this difficulty! More levels coming soon!", true);
        return;
    }
    showScreen(gameScreen);
    loadQuestion();
});

quitGameBtn.addEventListener('click', () => {
    resetGame();
    showScreen(startScreen);
});

playAgainBtn.addEventListener('click', () => {
    resetGame();
    // Go back to start screen to choose difficulty again
    showScreen(startScreen);
});

homeScreenBtn.addEventListener('click', () => {
    resetGame();
    showScreen(startScreen);
});

// Initial display: show the start screen
showScreen(startScreen);