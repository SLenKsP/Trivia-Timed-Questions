# Trivia-Timed-Questions

### Theme : Javascript


    - This allows user to pick one of four options for the question pop up on the screen
    - Correct answer gets Applaud Gif
    - Wrong gets Laugh Gif
    - Time out will see Mario die Gif

### Technologies Used 

- HTML 5
- CSS
- Javascript
- Jquery
- Bootstrap

### Problem

- Setting up time interval and time out

```
// solution sample code

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
        }, 4500);
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
```