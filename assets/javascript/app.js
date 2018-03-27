/*
Game Plan: 

1. Attach tags to index.html elements
    a. Area to hold countdown timer
    b. Area for questions
    c. Area for buttons
        i. Answer 1
        ii. Answer 2
        iii. Answer 3
        iv. Answer 4

2. Make the elements change dynamically depending on their tags
    a. Show countdown time
    b. Display question
    c. Display "skip" button
    d. Display answers on buttons, and bind the correct answer to one button.

3. When someone selects an answer button,
    a. Question and button section disappear.
    b. Timer stops.
    c. If answer is right,
        i. Display "Correct!" in the question section.
        ii. # of correct answers go up by 1.
    d. If answer is wrong,
        i. Display "Incorrect!" in the question section.
        ii. Also display correct answer.
        iii. # of incorrect answers go up by 1.
    e. If time runs out, or if skip button is pressed,
        i. Go to next question.
        ii. # of skipped questions go up by 1.
    f. Button appears. Click to go to next question.

4. As someone goes to the next question,
    a. Timer resets
    b. Displays new questions
    c. Display new answer buttons.

5. At the end of the questions,
    a. Display number of correct, incorrect, and skipped answers.
    b. Create a button that, if pressed, reloads the page ("play again" button).

*/

//////////////////////////////////////////////////////////////////////////////////////

/*
More Detailed Game Plan:

The following occurs if questions have not been exhausted.

* As long as the time > 0, then you can perform actions on the current page.

    actions:

    * A question is displayed.
    * A skip button is displayed.
        a. If this button is pressed, then next question displayed.
    * Buttons with possible answers appear.
        a. If right answer selected,
            i. Display "Correct!"
            ii. # right goes up by 1
        b. If wrong answer selected,
            i. Display "Incorrect!"
            ii. # wrong goes up by 1

* If time === 0,
    a. Display "Time's up!"
    b. Answer buttons can no longer be clicked.
    c. Skip button becomes "next question" button.
        i. If this button pressed, # skipped goes up by 1.
        ii. Next question displayed.


*/

/* 
Troubleshooting:

1. questionArray loops too quickly
    * As the array loops, it skips elements (questions).
    * The skipped questions act as if they are automatically answered (displays "correct" or "wrong" automatically)
    a. Look at functions in which questionArray is called.
        i. Result: Found error!
    b. Explanation: 
        * Calling the selectButton() function when it was inside of another function caused the selectButton() function to run
            multiple times for some reason.
        * I called the function outside of its parent function, and the selectButton() function worked as intended.

2. When answering the questions, the count of incorrectly answered questions increases by one randomly.
    a. Specify the "else" statement in the selectButton() function
        i. Result: No difference
    b. Found Error!
        * When timer hits 0, incorrect answers go up by 1. 
        * But I still need to properly implement the timer function
        * For now, I commented the offending statement out.

*/

var questions = {
    q1: "Which Pokemon types were added in the second generation of Pokemon games?",
    q2: "What Pokemon type has never had its own gym in any of the Pokemon games?",
    q3: "What are the weaknesses of the Fairy type?",
    q4: "Which team of Pokemon members had a message of Pokemon liberation?",
    q5: "New Pokemon types were introduced in the second generation to balance which Pokemon type?",
    q6: "The introduction of the Fairy type in the sixth generation of Pokemon was meant to balance which Pokemon type?",
    q7: "When beginning their journey, new Pokemon trainers choose a starter Pokemon. These starter Pokemon are of which types?",
    q8: "Which of these types are super-effective against the Fighting type?",
    q9: "Which Pokemon type combination has not appeared in any Pokemon yet?",
    q10: "Which Pokemon can evolve by turning the game system upside-down?"
};

var questionArray = Object.values(questions);
// console.log("Question array: " + questionArray);

var correctAnswers = {
    a1: "Dark and Steel",
    a2: "The Dark Type",
    a3: "Steel and Poison",
    a4: "Team Plasma",
    a5: "The Psychic Type",
    a6: "The Dragon Type",
    a7: "Fire, Water, and Grass",
    a8: "The Flying Type",
    a9: "Fire/Grass",
    a10: "Inkay"
};

var correctArray = Object.values(correctAnswers);

var q1Buttons = [
    "Ground and Bug",
    "Dark and Steel",
    "Steel and Fairy",
    "Fairy and Ice"
]

var q2Buttons = [
    "The Poison Type",
    "The Ground Type",
    "The Fairy Type",
    "The Dark Type"
]

var q3Buttons = [
    "Steel and Poison",
    "Ghost and Dark",
    "Fire and Fighting",
    "Electric and Rock",
]

var q4Buttons = [
    "Team Galactic",
    "Team Flare",
    "Team Plasma",
    "Team Skull"
]

var q5Buttons = [
    "The Psychic Type",
    "The Ghost Type",
    "The Rock Type",
    "The Flying Type"
]

var q6Buttons = [
    "The Fighting Type",
    "The Dragon Type", 
    "The Dark Type",
    "The Grass Type"
]

var q7Buttons = [
    "Electric, Water, and Fire",
    "Flying, Electric, and Bug",
    "Bug, Normal, and Flying",
    "Fire, Water, and Grass"
]

var q8Buttons = [
    "The Flying Type",
    "The Ground Type",
    "The Dark Type",
    "The Poison Type"
]

var q9Buttons = [
    "Ghost/Fairy",
    "Fire/Grass",
    "Fire/Water",
    "Electric/Psychic"
]

var q10Buttons = [
    "Doublade",
    "Voltorb",
    "Baltoy",
    "Inkay"
]

// an array containing smaller arrays
var buttonArray = [q1Buttons, q2Buttons, q3Buttons, q4Buttons, q5Buttons, q6Buttons, q7Buttons, q8Buttons, q9Buttons, q10Buttons];

// makes appending to the elements with these classes easier
var buttonDivArray = ["#btn-1", "#btn-2", "#btn-3", "#btn-4"];

/////////////////////////////////

// console.log(Object.keys(questions));
// console.log(Object.values(questions));
// console.log(Object.values(questions).length);
// console.log(Object.values(questions)[0]);

/////////////////////////////////

/*
In order to express an object's properties as an array, use this:

Object.values(object_name)

*/


var timer = 20;
// var timer = 5;                                           // for test purposes only
var intervalId;                                             // for the timer
var position = 0;                                           // a variable that holds question position
var skipIsClicked = false;
var answerIsClicked = false;
var correctAnswers = 0;
var incorrectAnswers = 0;
var skippedQuestions = 0;
var selectedAnswer;                                         // variable to hold the answer user clicked

// function for counting down the timer.
function countdown() {
    $("#time").html("");                                    // one way to make sure the element with the #time id is fully cleared
    clearInterval(intervalId);                              // makes sure that any current countdown is stopped
    intervalId = setInterval(decrement, 1000);              // every 1 second, the decrement function runs.
}

// function used in the countdown() function
function decrement() {
    $("#time").html(timer + " seconds remaining!");         // displays the amount of time remaining
    timer--;                                                // timer goes down by 1


    // when timer runs out
    if (timer === 0) {                                      
        stop();                                             // stops the countdown
        // $("#time").html("Time's up!");
        alert("Time's Up!");
        incorrectAnswers++;                                 // # of incorrect answers increases by 1
        position++;                                         // goes to next "position"
        timer = 20;                                         // resets timer to 20.
        // timer = 5;                                       // for test purposes only

        displayQuestion();
        displayButtons();
        // selectButton();

    }

}

// stops the countdown
function stop() {                                      
    clearInterval(intervalId);
}

 // displays the question to the screen
function displayQuestion() {                               

    countdown();

    $("#question").empty();                                             // empties whatever is in the #question element
    $("#question").html(questionArray[position]);                       // displays the current question
    console.log("Current question " + questionArray[position]);
}

// what happens when user clicks the skip button
function skipQuestion() {
    $("#skipBtn").on("click", function() {
        
        position++;
        skippedQuestions++;

        if (position === questionArray.length-1) {          // if the position variable goes past the length of the questionArray, then...
            displayEndScreen();                             // shows the end screen
        }

        else {                                              // otherwise...
            displayQuestion();                              // displays the next question
            clearButtons();                                 // clears the buttons and adds new ones
        }
    })

}

// if the user answers correctly
function rightAnswer() {
    correctAnswers++;
    console.log("Correct Answers: " + correctAnswers);
    console.log("Incorrect Answers: " + incorrectAnswers);
    alert("Correct!");

    if (position === questionArray.length-1) {
        displayEndScreen();
    }

    else {
        position++;
        stop();
        timer = 20;
        displayQuestion();
    }
}

function wrongAnswer() {
    incorrectAnswers++;
    console.log("Correct Answers: " + correctAnswers);
    console.log("Incorrect Answers: " + incorrectAnswers);
    alert("Wrong!");

    if (position === questionArray.length-1) {
        displayEndScreen();
    }

    else {
        position++;
        stop();
        timer = 20;
        displayQuestion();
    }
}

function displayButtons() {

    for (i = 0; i < buttonArray[position].length; i++) {
        // $(buttonDivArray[i]).empty();
        $(buttonDivArray[i]).html(buttonArray[position][i]);    // displays the possible answer in the button.
        // console.log($(buttonDivArray[i]).html());
        // $(buttonDivArray[i]).on("click", selectButton());
    }

    /* 
    The above loop loops from i = 0 to i = 3.
        For each loop, adds the ith element of the array at the buttonArray[position] array.
        e.g. buttonArray[1] has the q2Buttons array, with 4 elements.
        i = 0: $("#btn-1").html(q2Buttons[0]);
        i = 1: $("#btn-2").html(q2Buttons[1]);
        i = 2: $("#btn-3").html(q2Buttons[2]);
        i = 3: $("#btn-4").html(q2Buttons[3]);
    */

    //////
}

// to make the answer buttons selectable, and to dictate what happens when they are clicked.
function selectButton() {

    $("#btn-1").on("click", function() {
        selectedAnswer = $(this).html();                                // stores the text content of the button

        console.log(selectedAnswer);

        if (selectedAnswer === correctArray[position]) {                // if the selected answer is part of the correctArray, then...
            rightAnswer();
        }

        else if (selectedAnswer != correctArray[position]) {            // otherwise...
            wrongAnswer();
        }
        selectedAnswer = null;
        clearButtons();

    })

    $("#btn-2").on("click", function() {
        selectedAnswer = $(this).html();

        console.log(selectedAnswer);

        if (selectedAnswer === correctArray[position]) {
            rightAnswer();
        }

        else if (selectedAnswer != correctArray[position]) {
            wrongAnswer();
        }
        selectedAnswer = null;
        clearButtons();

    })

    $("#btn-3").on("click", function() {
        selectedAnswer = $(this).html();

        console.log(selectedAnswer);

        if (selectedAnswer === correctArray[position]) {
            rightAnswer();
        }

        else if (selectedAnswer != correctArray[position]) {
            wrongAnswer();
        }
        selectedAnswer = null;
        clearButtons();

    })

    $("#btn-4").on("click", function() {
        selectedAnswer = $(this).html();

        console.log(selectedAnswer);

        if (selectedAnswer === correctArray[position]) {
            rightAnswer();
        }

        else if (selectedAnswer != correctArray[position]) {
            wrongAnswer();
        }
        selectedAnswer = null;
        clearButtons();
    })
}

// to clear the buttons of their displays
function clearButtons() {
    for (i = 0; i < buttonArray[position].length; i++) {
        $(buttonDivArray[i]).empty();
    }

    displayButtons();
}



function displayEndScreen() {
    alert("Game Over!");
    alert("Correct answers: " + correctAnswers);
    alert("Incorrect answers: " + incorrectAnswers);
    
}


/////////////////////////////////////////////////////////////////

// ===== Actual Game =====



// countdown();
displayQuestion();
displayButtons();
selectButton();
skipQuestion();

