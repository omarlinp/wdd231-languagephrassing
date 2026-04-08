import { getUserPhrases } from "./storage.js";

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const quizContainer = document.getElementById("quizContainer");
const startContainer = document.getElementById("startContainer");
const endContainer = document.getElementById("endContainer");
const questionCounterEl = document.getElementById("questionCounter");
const finalScoreEl = document.getElementById("finalScore");

let phrases = [];
let currentQuestion = null;
let score = 0;
let questionCount = 0;
const maxQuestions = 5;
let quizStarted = false;

async function loadPhrases() {
    try{
        const response = await fetch("phrases.json");
        const apiPhrases = await response.json();
        const userPhrases = getUserPhrases();
        phrases = [...apiPhrases, ...userPhrases];
    } catch (err) {
        console.error(err);
        throw new Error("Error loading phrases.");
    }
}

async function startQuiz() {
    try {
        if (!quizStarted) {
            await loadPhrases();
            quizStarted = true;
        }
        if (phrases.length < 4) {
            questionEl.textContent = "Not enough phrases to start the quiz.";
            startContainer.style.display = "none";
            quizContainer.style.display = "block";
            nextBtn.style.display = "none";
            return;
        }
        resetQuiz();
        startContainer.style.display = "none";
        endContainer.style.display = "none";
        quizContainer.style.display = "block";
        nextQuestion();
    } catch (err) {
        questionEl.textContent = err.message;
        startContainer.style.display = "none";
        quizContainer.style.display = "block";
        nextBtn.style.display = "none";
    }
}

function resetQuiz() {
    score = 0;
    questionCount = 0;
    scoreEl.textContent = "Score: 0";
    questionCounterEl.textContent = "";
    nextBtn.style.display = "block";
    nextBtn.textContent = "Next Question";
}

function nextQuestion() {
if(questionCount >= maxQuestions) {
    endQuiz();
    return;
}

questionCount++;
currentQuestion = phrases[Math.floor(Math.random() * phrases.length)];

questionCounterEl.textContent = `Question ${questionCount} / ${maxQuestions}`;
questionEl.textContent = `What is the translation of "${currentQuestion.original}"?`;
let options = [currentQuestion.translation];

while (options.length < 4) {
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    if (!options.includes(randomPhrase.translation)) {
        options.push(randomPhrase.translation);
    }
}

options = options.sort(() => Math.random() - 0.5);

optionsEl.innerHTML = "";

options.forEach(opt=> {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => {
        if (opt === currentQuestion.translation) {
            score++;
            btn.style.background = "green";
        } else {
            btn.style.background = "red";
        }

        document.querySelectorAll("#options button").forEach(b => b.disabled = true);
        scoreEl.textContent = `Score: ${score}`;
    };
    optionsEl.appendChild(btn);
});
}

function endQuiz() {
    questionEl.textContent = `Quiz Over!`;
    optionsEl.innerHTML = "";
    scoreEl.textContent = `Score: ${score}`;
    nextBtn.style.display = "none";
    quizContainer.style.display = "none";
    endContainer.style.display = "block";
    finalScoreEl.textContent = `Final Score: ${score} / ${questionCount}`;
}

nextBtn.addEventListener("click", nextQuestion);
startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", startQuiz);