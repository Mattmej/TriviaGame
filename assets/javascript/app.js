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

