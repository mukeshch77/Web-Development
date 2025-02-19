let score = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let timeLeft = 60;
let currentLevel = 1;
let currentQuestion;

function startGame() {
    generateQuestion();
    startTimer();
}

function generateQuestion() {
    const level = currentLevel;
    const num1 = Math.floor(Math.random() * (10 * level));
    const num2 = Math.floor(Math.random() * (10 * level));
    currentQuestion = num1 + num2;
    document.getElementById('question').innerText = `What is ${num1} + ${num2}?`;
}

function submitAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    if (userAnswer === currentQuestion) {
        score++;
        correctAnswers++;
        timeLeft = 60;
        currentLevel++;
        generateQuestion();
    } else {
        incorrectAnswers++;
    }
    document.getElementById('answer').value = '';
}

function startTimer() {
    const timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time').innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Time is up! Your score: ' + score);
            // Redirect to results page
            location.href = 'results.html';
        }
    }, 1000);
}

function exitGame() {
    if (confirm("Are you sure you want to exit?")) {
        window.close();
    }
}

window.onload = startGame;
