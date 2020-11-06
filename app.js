/**
 * Example store structure
 */
// quizStarted: false;
// questionNumber: 0;
// score: 0;
const STORE = {
  // 5 or more questions are required
  questions: [
    {
      question: 'Who is the owner of the Krusty Krab?',
      answers: [
        'Krusty the Clown',
        'Spongebob',
        'Mr. Krabs',
        'King Neptune'
      ],
      correctAnswer: 'Mr. Krabs'
    },
    {
      question: "What instrument does Patrick play at the Bubble Bowl?",
      answers: [
        'Clarinet',
        'Harmonica',
        'The Drums',
        'Mayonnaise'
      ],
      correctAnswer: 'The Drums'
    },
    {
      question: "Who lives bewtween Spongebob and Patrick?",
      answers: [
        'Sandy Cheeks',
        'Larry the Lobster',
        'Squidward Tentacles',
        'Gary the Snail'
      ],
      correctAnswer: 'Squidward Tentacles'
    },
    {
      question: "Which actor has a cameo in The Spongebob Squarepants Movie?",
      answers: [
        'Robin Williams',
        'Jeff Goldblum',
        'David Hasslehoff',
        'James Franco'
      ],
      correctAnswer: 'David Hasslehoff'
    },
    {
      question: "What is the name of Plankton's computer wife?",
      answers: [
        'Judy',
        'Carroll',
        'Coral',
        'Karen'
      ],
      correctAnswer: 'Karen'
    },
  ],
    quizStarted: false,
    questionNumber: 0,
    score: 0
};

var currentQuestion = '';







/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates
function generateStartQuizPage(){
  let sqp = "";
  sqp = `<div class = "start">
  <button id = "startQuiz" type = "button">Start Quiz</button>
  </div>
  `
  

return sqp;
};


function submitAnswer() {
  let currentQuestion = ""
  let cQuestion = STORE.questions[STORE.questionNumber]
    currentQuestion = `<div class = "question">
    <p class = 'questionText'>${cQuestion.question}
    </p>
    <form id = 'submitForm'>
    <input type = 'radio' name = 'answers' id = "1" value = '${cQuestion.answers[0]}'> ${cQuestion.answers[0]}
    <input type = 'radio' name = 'answers' id = "2" value = '${cQuestion.answers[1]}'> ${cQuestion.answers[1]}
    <input type = 'radio' name = 'answers' id = "3" value = '${cQuestion.answers[2]}'> ${cQuestion.answers[2]}
    <input type = 'radio' name = 'answers' id = "4" value = '${cQuestion.answers[3]}'> ${cQuestion.answers[3]}
    <button id = 'submit'>Submit</button>
    </form>
    </div>
    `
    return currentQuestion;

};

function generateScoreCount(){
  let score = STORE.score
  let qNum = STORE.questionNumber
  let scoreCount = `<div class = 'score'>
  <h1>Spongebob Quiz</h1>
  <p>Question ${qNum + 1} out of 5</p>
  <p>Score: ${score} out of 5</p>
  </div>
  `
  return scoreCount
};

function generateResultsPage(){
  let grandTotal = `<div class = "results">
  <p class = "results_message">Congratulations! You answered ${STORE.score} out of 5 questions right.<p>
  <button id = "restartQuiz" type = "button">Restart Quiz</button>
  </div>
  `
  return grandTotal
};




/********** RENDER FUNCTION(S) **********/

function renderStartPage() {
  const startScreen = generateStartQuizPage();
  console.log(startScreen);
  $("main").html(startScreen)
};

function renderQuestion() {
  // render the next question in the DOM
  if (STORE.questionNumber < 5){
    const displayedQuestion = submitAnswer();
    $("header").html(generateScoreCount)
    $("main").html(displayedQuestion);
  } else {
    $("main").html(generateResultsPage)
  }
  
};









// This function conditionally replaces the contents of the <main> tag based on the state of the store
$(document).ready(renderStartPage);

function renderStartPage() {
  const startScreen = generateStartQuizPage()
  $("main").html(startScreen)
};


/********** EVENT HANDLER FUNCTIONS **********/
// These functions handle events (submit, click, etc)


//startQuiz button handler
$('main').on('click', '#startQuiz', function(e){
  e.preventDefault();
  STORE.quizStarted = true;
  renderQuestion();
});


//submit handler
$('main').on('click', '#submit', function(e){
  e.preventDefault(); 
  let cQuestion = STORE.questions[STORE.questionNumber]
  let selectorAnswer = $('input[name="answers"]:checked').val()
  let wrongAnswer = `<div class = "wrongAnswer">
  <p><span class = "incorrect">INCORRECT</span> The correct answer is ${cQuestion.correctAnswer} .</p>
  <button id = 'next'>Next Question</button>
  </div> ` 
  let correctAnswer = `<div class = "correctAnswer">
  <p><span class = "correct">CORRECT</span></p>
  <button id = 'next'>Next Question</button>
  </div> `
  // let restartButton = `<div class = "start">
//   <button id = "startQuiz" type = "button">Restart Quiz</button>
//   </div>
//   `
  //create responses for each correct answer to show that i know how to create new objects and iterate through them.
  //ie: "Mr. Krabs is the founder and owner of the krusty krab restaurant where spongebob works."
 
  if (selectorAnswer === cQuestion.correctAnswer) {
    STORE.score+=1
    $(".question").html(correctAnswer)
    $("header").html(generateScoreCount)
  } else {
    $(".question").html(wrongAnswer)
  // find way to send alert if no answer is selcted

    // STORE.questionNumber += 1;
  }
  console.log(STORE.questionNumber)
});

// next question button handler
$('main').on('click', '#next', function(e){
  e.preventDefault();

  STORE.questionNumber += 1;
  renderQuestion();
  
});

$('main').on('click', '#restartQuiz', function (e) {
  e.preventDefault();
  STORE.quizStarted = true;
  STORE.questionNumber = 0;
  STORE.score = 0;
  renderQuestion();
});

// let restartButton = `<div class = "start">
//   <button id = "startQuiz" type = "button">Restart Quiz</button>
//   </div>
//   `
// if (STORE.questionNumber = 4) {
//   $(".question").html(restartButton)
// }


