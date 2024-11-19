let questions = [
  {
    question:
      "Welches HTML-Tag wird verwendet, um eine Überschrift der höchsten Ebene zu erstellen?",
    answer_1: "<header>",
    answer_2: "<h1>",
    answer_3: "<heading>",
    answer_4: "<title>",
    right_answer: 2,
  },
  {
    question: "Wie definiert man einen JavaScript-Array?",
    answer_1: "let array = 'item1', 'item2';",
    answer_2: "let array = (item1, item2);",
    answer_3: "let array = ['item1', 'item2'];",
    answer_4: "let array = {'item1', 'item2'};",
    right_answer: 3,
  },
  {
    question:
      "Welches CSS-Attribut wird verwendet, um den Hintergrund einer Webseite zu ändern?",
    answer_1: "color",
    answer_2: "background-color",
    answer_3: "font-color",
    answer_4: "bgcolor",
    right_answer: 2,
  },
  {
    question: "Wie fügt man einen Kommentar in eine CSS-Datei ein?",
    answer_1: "// Dies ist ein Kommentar",
    answer_2: "<!-- Dies ist ein Kommentar -->",
    answer_3: "' Dies ist ein Kommentar",
    answer_4: "/* Dies ist ein Kommentar */",
    right_answer: 4,
  },
  {
    question:
      "Wie greift man in JavaScript auf ein Element mit der ID 'myElement' zu?",
    answer_1: "document.querySelector('#myElement')",
    answer_2: "document.getElementById('myElement')",
    answer_3: "document.getElement('myElement')",
    answer_4: "document.elementById('myElement')",
    right_answer: 2,
  },
  {
    question:
      "Welches HTML-Tag wird verwendet, um eine Liste mit Aufzählungszeichen zu erstellen?",
    answer_1: "<ul>",
    answer_2: "<ol>",
    answer_3: "<li>",
    answer_4: "<list>",
    right_answer: 1,
  },
  {
    question:
      "Welches Attribut wird verwendet, um Text in einem Eingabefeld zu deaktivieren?",
    answer_1: "readonly",
    answer_2: "disabled",
    answer_3: "inactive",
    answer_4: "noedit",
    right_answer: 2,
  },
];

let currentQuestion = 0;
let rightQuestions = 0;
let audioSuccess = new Audio("audio/yes.mp3");
let audioWrong = new Audio("audio/wrong.mp3");
let arnold = new Audio("audio/arnold.mp3");

function init() {
  document.getElementById("allQuestions").innerHTML = questions.length;

  showQuestion();
}

function showQuestion() {
  if (gameIsOver()) {
    showEndScreen();
  } else {
    updateProgressBar();
    showActualQuestion();
  }
}

function gameIsOver() {
  return currentQuestion >= questions.length;
}

function answer(selection) {
  let question = questions[currentQuestion];
  // console.log('Selectet answer ist', selection);
  let selectedQuestionNumber = selection.slice(-1);
  // console.log('selectedQuestionnumber is', selectedQuestionNumber);
  // console.log('Right answer is', question.right_answer);

  let idOfRightAnswer = `answer_${question.right_answer}`;

  if (rightAnswerSelected(selectedQuestionNumber, question)) {
    // console.log('richtige antwort!!')
    document.getElementById(selection).parentNode.classList.add("bg-success");
    audioSuccess.play();
    rightQuestions++;
  } else {
    document.getElementById(selection).parentNode.classList.add("bg-danger");
    document
      .getElementById(idOfRightAnswer)
      .parentNode.classList.add("bg-success");
    audioWrong.play();
    // console.log('falsche antwort!!')
  }
  document.getElementById("nextButton").disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber, question) {
  return selectedQuestionNumber == question.right_answer;
}

function nextQuestion() {
  currentQuestion++; //wird erhöht von 0 auf 1
  document.getElementById("nextButton").disabled = true;
  resetAnswerButtons();
  showQuestion(); //danach wird der diese funktion wieder ausgeführt
  stopAudio();
}

function resetAnswerButtons() {
  document.getElementById("answer_1").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_1").parentNode.classList.remove("bg-success");
  document.getElementById("answer_2").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_2").parentNode.classList.remove("bg-success");
  document.getElementById("answer_3").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_3").parentNode.classList.remove("bg-success");
  document.getElementById("answer_4").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_4").parentNode.classList.remove("bg-success");
}

function restartGame() {
  document.getElementById("headerImage").src = "./img/pencil.jpg";
  currentQuestion = 0; // das let kann man weglassen weil wir die variablen nicht neu definieren sondern nur überschreiben
  rightQuestions = 0;
  document.getElementById("questionBody").style = ""; // questionbody wieder anzeigen
  document.getElementById("endScreen").style = "display: none"; // Endscreen ausblenden
  init(); // spiel wieder neu starten
}

function showEndScreen() {
  document.getElementById("endScreen").style = "";
  document.getElementById("questionBody").style = "display: none";

  document.getElementById("amountOfQuestions").innerHTML = questions.length;
  document.getElementById("amountOfRightQuestions").innerHTML = rightQuestions;
  document.getElementById("headerImage").src = "./img/arnoldradler.png";

  document.getElementById("progressBar").style = `width: 100%;`;
  document.getElementById("progressBar").innerHTML = `100%`;

  arnold.play();
}

function stopAudio() {
  audioSuccess.pause();
  audioSuccess.currentTime = 0;

  audioWrong.pause();
  audioWrong.currentTime = 0;
}

function showActualQuestion() {
  let question = questions[currentQuestion];

  document.getElementById("questionNumber").innerHTML = currentQuestion + 1;
  document.getElementById("questionText").innerHTML = question.question;
  document.getElementById("answer_1").innerText = question.answer_1;
  document.getElementById("answer_2").innerText = question.answer_2;
  document.getElementById("answer_3").innerText = question.answer_3;
  document.getElementById("answer_4").innerText = question.answer_4;
}

function updateProgressBar() {
  let percent = currentQuestion / questions.length;
  percent = Math.round(percent * 100);
  // console.log("Fortschritt", percent);

  document.getElementById("progressBar").innerHTML = `${percent} %`;
  document.getElementById("progressBar").style = `width: ${percent}%;`;
}
