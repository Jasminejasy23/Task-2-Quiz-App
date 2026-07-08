const questionBank = {
  html: [
    {
      question: "What does HTML stand for?",
      answers: [
        { text: "Hyper Text Markup Language", correct: true },
        { text: "Home Tool Markup Language", correct: false },
        { text: "Hyper Tool Machine Language", correct: false },
        { text: "Hyperlinks Text Language", correct: false }
      ]
    },
    {
      question: "Which tag inserts an image?",
      answers: [
        { text: "<picture>", correct: false },
        { text: "<img>", correct: true },
        { text: "<src>", correct: false },
        { text: "<image>", correct: false }
      ]
    },
    {
      question: "Which tag creates a hyperlink?",
      answers: [
        { text: "<a>", correct: true },
        { text: "<img>", correct: false },
        { text: "<p>", correct: false },
        { text: "<h1>", correct: false }
      ]
    }
  ],

  css: [
    {
      question: "Which property changes text color?",
      answers: [
        { text: "font", correct: false },
        { text: "color", correct: true },
        { text: "background", correct: false },
        { text: "text-style", correct: false }
      ]
    },
    {
      question: "Which property changes font size?",
      answers: [
        { text: "font-size", correct: true },
        { text: "size", correct: false },
        { text: "text-size", correct: false },
        { text: "font-style", correct: false }
      ]
    }
  ],

  js: [
    {
      question: "Which keyword declares a variable?",
      answers: [
        { text: "let", correct: true },
        { text: "define", correct: false },
        { text: "constant", correct: false },
        { text: "variable", correct: false }
      ]
    },
    {
      question: "Which method displays a message box?",
      answers: [
        { text: "alert()", correct: true },
        { text: "message()", correct: false },
        { text: "display()", correct: false },
        { text: "prompt()", correct: false }
      ]
    }
  ]
};

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

const categoryBtns = document.querySelectorAll(".category-btn");
const categoryScreen = document.getElementById("category-screen");
const quizScreen = document.getElementById("quiz-screen");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score-display");
const scoreContainer = document.getElementById("score-container");
const scoreText = document.getElementById("score-text");
const highScoreText = document.getElementById("high-score");
const questionNumber = document.getElementById("question-number");
const progress = document.getElementById("progress");
const timerText = document.getElementById("timer");

categoryBtns.forEach(btn=>{
  btn.addEventListener("click",()=>{
    questions=[...questionBank[btn.dataset.category]];
    questions.sort(()=>Math.random()-0.5);

    currentQuestionIndex=0;
    score=0;
    scoreDisplay.textContent="Score: 0";

    categoryScreen.classList.add("hide");
    quizScreen.classList.remove("hide");

    showQuestion();
  });
});

function showQuestion(){
  resetState();

  const currentQuestion=questions[currentQuestionIndex];
  const letters=["A","B","C","D"];

  currentQuestion.answers.sort(()=>Math.random()-0.5);

  questionNumber.textContent=
    `Question ${currentQuestionIndex+1} of ${questions.length}`;

  progress.style.width=
    `${((currentQuestionIndex+1)/questions.length)*100}%`;

  questionElement.textContent=
    currentQuestion.question;

  currentQuestion.answers.forEach((answer,index)=>{
    const button=document.createElement("button");

    button.textContent=
      `${letters[index]}. ${answer.text}`;

    button.classList.add("btn");

    if(answer.correct){
      button.dataset.correct=true;
    }

    button.addEventListener(
      "click",
      selectAnswer
    );

    answerButtons.appendChild(button);
  });

  startTimer();
}

function resetState(){
  clearInterval(timer);
  nextBtn.style.display="none";
  answerButtons.innerHTML="";
}

function startTimer(){
  timeLeft=15;
  timerText.textContent=
    `⏳ Time Left: ${timeLeft}s`;

  timer=setInterval(()=>{
    timeLeft--;

    timerText.textContent=
      `⏳ Time Left: ${timeLeft}s`;

    if(timeLeft<=0){
      clearInterval(timer);
      nextBtn.style.display="block";
    }
  },1000);
}

function selectAnswer(e){
  clearInterval(timer);

  const selectedBtn=e.target;
  const isCorrect=
    selectedBtn.dataset.correct==="true";

  if(isCorrect){
    score++;
    scoreDisplay.textContent=
      `Score: ${score}`;
    selectedBtn.classList.add("correct");
  }else{
    selectedBtn.classList.add("wrong");
  }

  Array.from(answerButtons.children)
    .forEach(button=>{
      if(button.dataset.correct==="true"){
        button.classList.add("correct");
      }
      button.disabled=true;
    });

  nextBtn.style.display="block";
}

nextBtn.addEventListener("click",()=>{
  currentQuestionIndex++;

  if(currentQuestionIndex<questions.length){
    showQuestion();
  }else{
    showScore();
  }
});

function showScore(){
  quizScreen.classList.add("hide");
  scoreContainer.classList.remove("hide");

  scoreText.textContent=
    `You scored ${score} out of ${questions.length}`;

  let highScore=
    localStorage.getItem("highScore") || 0;

  if(score>highScore){
    localStorage.setItem(
      "highScore",
      score
    );
    highScore=score;
  }

  highScoreText.textContent=
    `🏆 Highest Score: ${highScore}`;
}

document.getElementById("restart-btn")
.addEventListener("click",()=>{
  scoreContainer.classList.add("hide");
  categoryScreen.classList.remove("hide");
});