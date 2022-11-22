"use strict";

//Quiz questions
const questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "<script>", correct: true },
      { text: "<scripting>", correct: false },
      { text: "<js>", correct: false },
      { text: "<javascript>", correct: false },
    ],
  },
  {
    question: "Where the <script> tag can be used?",
    answers: [
      { text: "<head>", correct: false },
      { text: "<footer>", correct: false },
      { text: "<body>", correct: false },
      { text: "<body> and <head>", correct: true },
    ],
  },
  {
    question: "How do you call a function named 'myFunc'?",
    answers: [
      { text: "myFunc()", correct: true },
      { text: "call myFunc()", correct: false },
      { text: "call function", correct: false },
      { text: "get myFunc()", correct: false },
    ],
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js' ?",
    answers: [
      { text: "<script src=", correct: true },
      { text: "<script name=", correct: false },
      { text: "<script href", correct: false },
      { text: "<script link=", correct: false },
    ],
  },
  {
    question: "How do you write 'Hello' in an alert box?",
    answers: [
      { text: "msg('Hello')", correct: false },
      { text: "alertBox('Hello')", correct: false },
      { text: "alert('Hello')", correct: true },
      { text: "msgBox('Hello')", correct: false },
    ],
  },
  {
    question: "How to write an IF statement in JavaScript?",
    answers: [
      { text: "if(i==5)", correct: true },
      { text: "if i==5 then", correct: false },
      { text: "if i=5 then", correct: false },
      { text: "if i=5", correct: false },
    ],
  },
  {
    question:
      "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
    answers: [
      { text: "if (i!=5)", correct: true },
      { text: "if i=!5 then", correct: false },
      { text: "if (i<>5)", correct: false },
      { text: "if i<>5", correct: false },
    ],
  },
  {
    question: "How does a WHILE loop start?",
    answers: [
      { text: "while (i<1;i)", correct: false },
      { text: "while i= 1 to 10", correct: false },
      { text: "while (i<=10)", correct: true },
      { text: "while i if 1", correct: false },
    ],
  },
  {
    question: "How does a FOR loop start?",
    answers: [
      { text: "for i if", correct: false },
      { text: "for let i=0;", correct: true },
      { text: "for i 1 to 5", correct: false },
      { text: "for i++", correct: false },
    ],
  },
  {
    question: "How do you round the number 7.25, to the nearest integer?",
    answers: [
      { text: "round(7.25)", correct: false },
      { text: "Math.rnd(7.25)", correct: false },
      { text: "rnd(7.25)", correct: false },
      { text: "Math.round(7.25)", correct: true },
    ],
  },
];

//Element manipulation assignments
let shuffledQuiz, currentQuestionIndex;
const mainWindow = document.getElementById("section-main");
let submition = document.querySelector(".all-done");
const labelTimer = document.querySelector(".timer");
const bestScore = document.querySelector(".best-score");
const timer = document.getElementById("timer");
const resultCorrect = document.getElementById("result-correct");
const resultWrong = document.getElementById("result-wrong");
const questionElement = document.getElementById("question");
const answerBtnsElement = document.getElementById("answer-btns");
const welcomeMessage = document.getElementById("welcome-txt");
const sectionBtn = document.getElementById("section-start--btn");
const sectionQuestion = document.getElementById("section-question");
const submit = document.querySelector(".input-submit");
const inputInitials = document.getElementById("initials");
const scoreList = document.querySelector(".score-list");
const uList = document.getElementById("list");
const goBack = document.getElementById("go-back");
const clear = document.getElementById("clear");

const startBtn = document.getElementById("start-btn");

///Assignments for mutable variables
let time = 0;
let totalScore = 0;
let bestScoreList = [];
let initials = {};

//Event handler forsubmition button.
submit.addEventListener("click", submitionForm);

//Event handler for starting Quiz
startBtn.addEventListener("click", startQuiz);

//Event function for "GO back" button
goBack.addEventListener("click", function () {
  submition.classList.add("hide");
  sectionBtn.classList.remove("hide");
  welcomeMessage.classList.remove("hide");
  sectionQuestion.classList.add("hide");
  scoreList.classList.add("hide");
  timer.classList.add("hide");
  totalScore = 0;
});

//Event handler for "Show best score" button
bestScore.addEventListener("click", function () {
  welcomeMessage.classList.add("hide");
  sectionBtn.classList.add("hide");
  sectionQuestion.classList.add("hide");
  submition.classList.add("hide");
  if (!uList.firstChild) {
    renderScore();
  }
  scoreList.classList.remove("hide");
});

//Clear all best scores list and local storage
clear.addEventListener("click", function () {
  bestScoreList = [];
  localStorage.clear();
  uList.innerHTML = "";
});

//Function for begining quiz
function startQuiz() {
  welcomeMessage.classList.add("hide");
  sectionBtn.classList.add("hide");
  sectionQuestion.classList.remove("hide");
  shuffledQuiz = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  time = 70;
  setNextQuestion();
  startFinishTimer();
  timer.classList.remove("hide");
}

//Function to stop quize
function quizOver() {
  submition.classList.remove("hide");
  sectionBtn.classList.add("hide");
  welcomeMessage.classList.add("hide");
  sectionQuestion.classList.add("hide");
  timer.classList.add("hide");
  inputInitials.innerText = "";
}

//Setting the next question after the answer
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuiz[currentQuestionIndex]);
  currentQuestionIndex++;
}

//Function to render answers
function showQuestion(question) {
  if (currentQuestionIndex === shuffledQuiz.length) {
    sectionQuestion.classList.add("hide");
    submition.classList.remove("hide");
  } else {
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
      const btn = document.createElement("button");
      btn.innerText = answer.text;
      btn.classList.add("answer-btn");
      if (answer.correct) {
        btn.dataset.correct = answer.correct;
      }
      btn.addEventListener("click", selectAnswer);
      answerBtnsElement.appendChild(btn);
    });
  }
}

//Function too reset wrong and correct answers
function resetState() {
  while (answerBtnsElement.firstChild) {
    answerBtnsElement.removeChild(answerBtnsElement.firstChild);
    resultWrong.classList.add("hide");
    resultCorrect.classList.add("hide");
    mainWindow.classList.remove("correct");
    mainWindow.classList.remove("wrong");
  }
}

//Checking answer for corrector wrong features
function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct;
  setStatusClass(mainWindow, correct);
  if (correct) {
    totalScore += 5;
    resultCorrect.classList.remove("hide");
  } else {
    resultWrong.classList.remove("hide");
    time -= 10;
  }
  setStatusClass(selectedBtn, correct);
  setTimeout(setNextQuestion, 1500);
}

//Identifies correct and incorrect answers
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

//clears the styles adopted as a result of a correct or incorrect answer
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

//Timer and its configurations
function startFinishTimer() {
  //Set time to 1 min 10 sec
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    if (
      time === 0 ||
      !submition.classList.contains("hide") ||
      !scoreList.classList.contains("hide")
    ) {
      clearInterval(timer);
      quizOver();
      time = 0;
    } else if (
      time < 0 ||
      !submition.classList.contains("hide") ||
      !scoreList.classList.contains("hide")
    ) {
      time = 0;
      clearInterval(timer);
      quizOver();
    }
    time--;
  };

  // Call the timer every sec
  const timer = setInterval(tick, 1000);

  return timer;

  // When 0 sec, stop timer
}

//Submission function, triggered after the end of the course or the end of the time
function submitionForm() {
  initials.initials = inputInitials.value.toUpperCase();
  initials.score = totalScore;
  bestScoreList.push(initials);
  timer.classList.add("hide");
  submition.classList.add("hide");
  renderScore();
  scoreList.classList.remove("hide");
  updateStorage();
}

//Function that adds scores to local storage
function updateStorage() {
  localStorage.setItem("scores", JSON.stringify(bestScoreList));
  bestScoreList = [];

  bestScoreList = JSON.parse(localStorage.getItem("scores"));
}

//A function that renders records from local storage into a list with the highest scores
function renderScore() {
  if (uList.firstChild) {
    uList.removeChild(uList.firstChild);
    for (let i = 0; i < bestScoreList.length; i++) {
      const li = document.createElement("li");
      li.innerText = `${i + 1}. ${bestScoreList[i].initials} -${
        bestScoreList[i].score
      }`;
      uList.appendChild(li);
    }
  } else {
    for (let i = 0; i < bestScoreList.length; i++) {
      const li = document.createElement("li");
      li.innerText = `${i + 1}. ${bestScoreList[i].initials} -${
        bestScoreList[i].score
      }`;
      uList.appendChild(li);
    }
  }
}
