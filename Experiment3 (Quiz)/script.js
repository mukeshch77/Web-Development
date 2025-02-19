let currentTime = 60;
let timerInterval;
let currentExpression;
let difficulty = 1; // Starting difficulty
let score = 0;
const expressions = [
    { operator: '+', difficulty: 1, min: 1, max: 10 },
    { operator: '-', difficulty: 2, min: 5, max: 15 },
    { operator: '*', difficulty: 3, min: 2, max: 10 },
    { operator: '/', difficulty: 4, min: 10, max: 30 },
];

document.getElementById('submitBtn').addEventListener('click', checkAnswer);
document.getElementById('answer').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

function generateExpression() {
    const exp = expressions[difficulty - 1];
    const num1 = Math.floor(Math.random() * (exp.max - exp.min + 1)) + exp.min;
    const num2 = Math.floor(Math.random() * (exp.max - exp.min + 1)) + exp.min;

    let answer;
    switch (exp.operator) {
        case '+':
            answer = num1 + num2;
            break;
        case '-':
            answer = num1 - num2;
            break;
        case '*':
            answer = num1 * num2;
            break;
        case '/':
            answer = (num1 / num2).toFixed(2);
            break;
    }

    currentExpression = { expression: `${num1} ${exp.operator} ${num2}`, answer };
    document.getElementById('expression').textContent = currentExpression.expression;
}

function checkAnswer() {
    const userAnswer = document.getElementById('answer').value;

    if (parseFloat(userAnswer) === parseFloat(currentExpression.answer)) {
        score += 1;
        document.getElementById('status').textContent = `Score: ${score}`;
        document.getElementById('feedback').textContent = 'Correct! Moving to next...';
        document.getElementById('answer').value = '';
        document.getElementById('answer').focus();
        difficulty = Math.min(difficulty + 1, expressions.length);
        generateExpression();
        resetTimer();
    } else {
        document.getElementById('feedback').textContent = 'Incorrect, try again!';
    }
}

function resetTimer() {
    currentTime = 60;
    document.getElementById('timer').textContent = `Time Left: ${currentTime}`;
    clearInterval(timerInterval);
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (currentTime > 0) {
            currentTime--;
            document.getElementById('timer').textContent = `Time Left: ${currentTime}`;
        } else {
            clearInterval(timerInterval);
            document.getElementById('feedback').textContent = 'Time is up! Try again.';
            document.getElementById('answer').disabled = true;
        }
    }, 1000);
}

// Initialize the first expression
generateExpression();
startTimer();
