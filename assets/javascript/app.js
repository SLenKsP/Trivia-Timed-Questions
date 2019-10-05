var answered = 0;
var notAnswered = 0;
var correct = 0;
var notCorrect = 0;
var total = 10;
var timeLeft = 10;
var remainingTime;
var correctAns;
var selectedAnswer;
var totalQuestions;
// trivia game object
var trivia = {
  // style page
  mainPageStyle: function() {
    $(".container-fluid").addClass("text-light");
  },
  // set header text
  headerText: function() {
    return "Trivia";
  },
  // write header to html
  setHeader: function() {
    var headerTag = $("<h1 class= 'text-center text-danger'>");
    $("#header").append(headerTag.text(this.headerText()));
    $(headerTag).addClass("display-1");
  },
  setTimerLine: function() {
    var timerLine = $(
      "<h2 id='timer' class= 'text-center text-warning pb-2 mb-4'>Time Remaining: <span class = 'font-weight-bold text-light'>" +
        timeLeft +
        "</span> seconds.</h2> "
    );

    $("#content").append(timerLine);
  },
  // trivia questions - currently placeholder
  triviaQuestions: [
    {
      question: "What type of Language javascript is?",
      options: [
        "Scripting",
        "Programming",
        "Scripting and Programming",
        "Application"
      ],
      correctAnswer: "Scripting"
    },
    {
      question: "Which was the first browser to support JavaScript?",
      options: ["Mozilla Firefox", "Netscape", "Google Chrome", "IE"],
      correctAnswer: "Netscape"
    },
    {
      question: "JavaScript is ______ Side scripting language.",
      options: ["Server", "Client", "ISP", "Browser"],
      correctAnswer: "Browser"
    },
    {
      question: "The external JavaScript file must contain <script> tag.",
      options: ["True", "False"],
      correctAnswer: "False"
    },
    {
      question:
        "JavaScript code between a pair of “script” tags are called ______",
      options: ["Non-inline", "External", "Referenced", "Inline"],
      correctAnswer: "Inline"
    },
    {
      question:
        "Which of the following attribute can hold the JavaScript version?",
      options: ["LANGUAGE", "SCRIPT", "VERSION", "None of the above"],
      correctAnswer: "LANGUAGE"
    },
    {
      question:
        "Which of the following is not considered a JavaScript operator?",
      options: ["new", "this", "delete", "typeof"],
      correctAnswer: "this"
    },
    {
      question:
        "Which method of an Array object adds and/or removes elements from an array.",
      options: ["Reverse", "Shift", "Slice", "Splice"],
      correctAnswer: "Splice"
    },
    {
      question: "Using which statement you can test for a specific condition.",
      options: ["select", "if", "switch", "for"],
      correctAnswer: "if"
    },
    {
      question: "Is it possible to nest functions in JavaScript?",
      options: ["True", "False"],
      correctAnswer: "True"
    }
  ],
  winImage: function() {
    var imgSection = $("<img>");
    imgSection.attr(
      "src",
      "https://media.giphy.com/media/26FxCOdhlvEQXbeH6/giphy.gif"
    );
    return imgSection;
  },
  lossImage: function() {
    var imgSection = $("<img>");
    imgSection.attr(
      "src",
      "https://media.giphy.com/media/wWue0rCDOphOE/giphy.gif"
    );
    return imgSection;
  },
  timeOutImage: function() {
    var imgSection = $("<img>");
    imgSection.attr(
      "src",
      "https://media.giphy.com/media/XOmKPMJDxqKje/giphy.gif"
    );
    return imgSection;
  },
  // setting up done button after all questions answered or not answered
  setDoneBtn: function() {
    $("#content").append(
      "<button id='done' type='button' class='btn text-info'><h1 class='display-4'>Done</h4>"
    );
  },
  // add questions to html
  loadQuestions: function() {
    // total = this.triviaQuestions.length;
    // notAnswered = total;
    var form = $("<form class= 'questions text-center'>");
    // var totalQuestions = this.total.length;
    var questionBlock = $("<div id=questionBlock>");
    form.append(questionBlock);
    var questionTag = $("<h3 id= 'loaded' class='pt-0'>");
    questionBlock.append(
      "<hr>",
      questionTag.text(this.triviaQuestions[total - 1].question)
    );

    for (var k = 0; k < this.triviaQuestions[total - 1].options.length; k++) {
      var Btn = $(
        '<input class="answer" type="button" data-type="answer" name = ' +
          this.triviaQuestions[total - 1].correctAnswer +
          ">"
      );
      var lbl = $("<label class='mx-4'>");
      Btn.attr("value", this.triviaQuestions[total - 1].options[k]);
      lbl.prepend(Btn);
      questionBlock.append(lbl);
    }
    $("#content").append(form);
  },
  // click start to  play the game
  clickStart: function() {
    $("#startBtn").click(function(e) {
      e.preventDefault();
      $(this).addClass("d-none");
      trivia.startTimer();
      trivia.setTimerLine();
      trivia.loadQuestions();
      trivia.checkAnswer();
    });
  },
  // starting up a timer
  startTimer: function() {
    remainingTime = setInterval(countDown, 1000);
    console.log("timer");
    function countDown() {
      console.log("timer again");

      if (timeLeft === 0) {
        notAnswered++;
        correctAns = $("input:first-child").attr("name");
        console.log("correct Answer is:" + correctAns);
        $(".answer").remove();
        $("#questionBlock").append(
          $(
            "<h1 class='played'>Correct Answer Was: <strong class='text-info'>" +
              correctAns +
              "</strong></h1>"
          )
        );
        $("#questionBlock").append(trivia.timeOutImage());
        setTimeout(() => {
          trivia.nextQuestion();
        }, 4000);
        $("#timer").remove();
        $("#done").remove();
        clearTimeout(remainingTime);
      } else {
        --timeLeft;
        // $("#content").prepend;
        $("span").text(timeLeft);
      }
    }
  },
  // click done actions
  // check the clicked answered
  checkAnswer: function() {
    $("input:button").click(function() {
      console.log("Test");
      $("#loaded").addClass("played");
      $(".answer").addClass("played");
      answered++;
      correctAns = $(this).attr("name");
      selectedAnswer = $(this).attr("value");
      if (selectedAnswer === correctAns) {
        $("#questionBlock").append(
          $(
            "<h1 class='played'><strong class='text-success'>Yup, </strong>Correct Answer is: <strong class='text-success'>" +
              correctAns +
              "</strong></h1>"
          )
        );
        $(".answer").remove();
        $("#timer").remove();
        console.log("correct: " + correct);
        $("#questionBlock").append(trivia.winImage());
        correctAns = "";
        clearTimeout(remainingTime);
        setTimeout(() => {
          trivia.nextQuestion();
        }, 3000);
        correct++;
      } else {
        $("#questionBlock").append(
          $(
            "<h1 class='played'><strong class='text-danger'>Nope, </strong>Correct Answer Was: <strong class='text-info'>" +
              correctAns +
              "</strong></h1>"
          )
        );
        $(".answer").remove();
        $("#timer").remove();
        $("#questionBlock").append(trivia.lossImage());
        correctAns = "";
        clearTimeout(remainingTime);
        setTimeout(() => {
          trivia.nextQuestion();
        }, 3000);
        notCorrect++;
      }
    });
  },
  nextQuestion: function() {
    console.log("played");
    correctAns = "";
    selectedAnswer = "";
    // e.preventDefault();
    $("#questionBlock").remove();
    // trivia.triviaQuestions.pop();
    // total = trivia.triviaQuestions.length;
    total--;
    if (total > 0) {
      timeLeft = 10;
      console.log("remaining time:" + remainingTime);
      console.log("remaining questions: " + total);
      trivia.setTimerLine();
      trivia.loadQuestions();
      trivia.checkAnswer();
      trivia.startTimer();
    } else {
      trivia.showSummary();
      console.log("next worked");
    }
  },
  // setting up summary page
  showSummary: function() {
    var summary = $("<div id='summary'>");
    var summaryTitle = $("<h3>");
    console.log("answered Value: " + answered);
    summary.append(`<h3>Total: 10`);
    summary.append(`<h3>Answered: ${answered}`);
    summary.append(`<h3>Not Answered: ${notAnswered}`);
    summary.append(`<h3>Correct: ${correct}`);
    summary.append(`<h3>Wrong: ${notCorrect}`);
    summary.append(
      "<button id='restart' type='button' class='btn text-light d-block mx-auto'><h1 class='display-4 text-info'>Play again...</h4>"
    );
    $(".container-fluid").append(summary);
    trivia.gameReload();
  },
  // reload the game (not working)
  gameReload: function() {
    $("#restart").click(function(e) {
      e.preventDefault();
      console.log("resetting everything");
      $("form").trigger("reset");
      trivia.resetData();
      // clearTimeout(remainingTime);
      $("#startBtn").removeClass("d-none");
      $("#content").removeClass("d-none");
      $("#summary").remove();
      $(this).remove();
    });
  },
  // reset data (not working)
  resetData: function() {
    answered = 0;
    notAnswered = 0;
    correct = 0;
    notCorrect = 0;
    // trivia.triviaQuestions();
    total = 10;
    console.log(total);
    timeLeft = 10;
    remainingTime;
    $("#timer").text("");
    $("#rules").show();
  },
  // initiate the game
  gameInit: function() {
    $("#next").hide();
    this.mainPageStyle();
    this.setHeader();
    this.clickStart();
  }
};
// load js
$(document).ready(function() {
  trivia.gameInit();
});
