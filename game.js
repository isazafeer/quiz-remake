// Questions for quiz//

const questions = [
    {
        question: "Commonly used data types DOES NOT include:",
        answers: [
            { text: "Strings", correct: false},
            { text: "Booleans", correct: false},
            { text: "Alerts", correct: true},
            { text: "Numbers", correct: false},
        ]    
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: [
            { text: "Quotes", correct: false},
            { text: "Curly brackets", correct: false},
            { text: "Parenthesess", correct: true},
            { text: "Square brackets", correct: false},
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        answers: [
            { text: "Numbers and strings", correct: false},
            { text: "Other arrays", correct: false},
            { text: "Booleans", correct: false},
            { text: "All of the above", correct: true},
        ]
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: [
            { text: "Quotes", correct: true},
            { text: "Commmas", correct: false},
            { text: "Parentheses", correct: false},
            { text: "Curley brackets", correct: false},
        ]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            { text: "Javascript", correct: false},
            { text: "Console.log", correct: true},
            { text: "For loops", correct: false},
            { text: "Terminal/bash", correct: false},
        ]
    }    
];

// Quiz variables//
const quizSection = document.querySelector(".quiz");
const resultSection = document.querySelector(".result");
const questionElement = document.getElementById("question");
const answerButtons= document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const startBtn = document.getElementById("start-btn");
const saveScoreBtn = document.getElementById("saveScore");

let currentQuestionIndex = 0;
let score = 0;

var timeLeft = 45;
var timerEl = document.querySelector('.time-left');
var timerId;

// Functions for quiz to run//

    // Start //
function startQuiz (){

    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    timeLeft = 45;
    
    // Start the Countdown timer //
    timerId = setInterval(tick, 1000);

    // Show the first question //
    showQuestion();
    
    // Show Quiz Section when the game starts //
    quizSection.style.display = "block";
}

function tick() {
    timeLeft--;
    timerEl.innerHTML = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timerId);
    }
}

    // Show Question //
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextBtn.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
    // Correct/incorrect answer color //
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
        timeLeft -=5;
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}
    // Result //
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
    resultSection.style.display = "block";
    startBtn.style.display = "none";
    clearInterval(timerId);
}
    // Reveal 'next' button //
function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

function saveScore() {
    var name = document.getElementById("name").value;
    
    localStorage.setItem(name, score);
}

    // Event Listeners //

nextBtn.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }else{
        startQuiz();
    }
});

function init() {
    quizSection.style.display = "none";
    resultSection.style.display = "none";
}

    // Initialise the Quiz
init();

saveScoreBtn.addEventListener("click", saveScore);
startBtn.addEventListener("click", startQuiz);