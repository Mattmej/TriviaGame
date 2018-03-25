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

var buttonArray = [q1Buttons, q2Buttons, q3Buttons, q4Buttons, q5Buttons, q6Buttons, q7Buttons, q8Buttons, q9Buttons, q10Buttons];

