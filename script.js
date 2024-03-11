

// Variables
let count = 1;
var username = 'test';
let totalQuestion = 0;
let correctAnswer = '';
let givenAnswer = '';
let score = 0;
let timeRemains = 30;
// Display Containers
let userDataContainer = document.getElementById('user-data');
let instructionContainer = document.getElementById('instruction');
let quizContainer = document.getElementById('quiz-container');
let resultContainer = document.getElementById('result-container');


//  ------------------------ Questions Data Start---------------------

const htmlQuestions = [
    ["What does HTML stand for?", 'Hyper Text Markup Language', 'Hyperlinks and Text Markup Language', 'Home Tool Markup Language', 'Hyper Text Markup Language'],
    ["Which tag is used to define an image in HTML?", '<img>', '<image>', '<picture>', '<img>'],
    ["What is the correct HTML element for the largest heading?", '<h1>', '<head>', '<heading>', '<h1>'],
    ["Which attribute is used to provide an alternative text for an image?", 'alt', 'src', 'href', 'alt'],
    ["Which HTML tag is used to define an unordered list?", '<ul>', '<list>', '<ol>', '<ul>'],
    ["What is the correct HTML for creating a hyperlink?", '<a href="http://www.example.com">Click here</a>', '<hyperlink>http://www.example.com</hyperlink>', '<link src="http://www.example.com">Click here</link>', '<a href="http://www.example.com">Click here</a>'],
    ["Which tag is used to define a paragraph in HTML?", '<p>', '<paragraph>', '<para>', '<p>'],
    ["Which attribute is used to specify the URL of the page that the link goes to?", 'href', 'src', 'link', 'href'],
    ["In HTML, what is the element called that contains all the content of the page?", '<body>', '<head>', '<html>', '<body>'],
    ["Which tag is used to define a table row in HTML?", '<tr>', '<td>', '<table-row>', '<tr>']
];

const cssQuestions = [
    ["What does CSS stand for?", 'Cascading Style Sheets', 'Creative Style Sheets', 'Computer Style Sheets', 'Cascading Style Sheets'],
    ["Which CSS property is used to change the text color of an element?", 'color', 'text-color', 'font-color', 'color'],
    ["Which CSS property is used to control the spacing between lines of text?", 'line-height', 'spacing', 'text-spacing', 'line-height'],
    ["Which CSS property is used to make a rounded corner for an element?", 'border-radius', 'corner-radius', 'rounded-corner', 'border-radius'],
    ["Which CSS property is used to change the size of an element's font?", 'font-size', 'text-size', 'size', 'font-size'],
    ["Which CSS property is used to create shadows around an element's box?", 'box-shadow', 'shadow', 'element-shadow', 'box-shadow'],
    ["Which CSS property is used to make a background image fixed (not scrollable) when a user scrolls down a page?", 'background-attachment', 'fixed-background', 'background-scroll', 'background-attachment'],
    ["Which CSS property is used to set the distance between the borders of adjacent cells in a table?", 'border-spacing', 'cell-spacing', 'table-spacing', 'border-spacing'],
    ["Which CSS property is used to set the style of the cursor when hovering over an element?", 'cursor', 'pointer', 'hover-cursor', 'cursor'],
    ["Which CSS property is used to create a transition effect when changing the CSS property value of an element?", 'transition', 'animation', 'transform', 'transition']
];

const javascriptQuestions = [
    ["What is JavaScript?", 'A programming language', 'A markup language', 'A styling language', 'A programming language'],
    ["Which built-in method returns the length of the string?", 'length()', 'size()', 'index()', 'length()'],
    ["Which keyword is used to declare variables in JavaScript?", 'var', 'let', 'const', 'var'],
    ["Which built-in method removes the last element from an array and returns that element?", 'pop()', 'push()', 'remove()', 'pop()'],
    ["Which operator is used to concatenate two or more strings?", '+', '&', 'concat()', '+'],
    ["Which function is used to parse a string and return it as a floating-point number?", 'parseFloat()', 'parseString()', 'toNumber()', 'parseFloat()'],
    ["Which method adds one or more elements to the end of an array and returns the new length of the array?", 'push()', 'append()', 'addToEnd()', 'push()'],
    ["Which type of loop is suitable when the number of iterations is fixed?", 'for loop', 'while loop', 'do-while loop', 'for loop'],
    ["Which keyword is used to exit a loop?", 'break', 'stop', 'exit', 'break'],
    ["Which built-in method reverses the order of the elements of an array?", 'reverse()', 'sort()', 'changeOrder()', 'reverse()']
];

//  ------------------------ Questions Data End---------------------




// ------------------ Fisher-Yates algorithm to shuffle Array ------------------
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
// ----------------------------------------------------------------------------

// -------------------------- Display Function --------------------------------
function displayQuestion() {
    if (count <= questionsData.length) {
        document.getElementById("question-number").innerHTML = count;
        document.getElementById("question-content").innerHTML = questionsData[count - 1][0];
        document.getElementById('next-question-btn').setAttribute('disabled', 'disabled');
        correctAnswer = questionsData[count - 1][4]

        document.getElementById("radio-group").innerHTML = '';

        for (let i = 1; i <= 3; i++) {
            let optionId = `option-${i}`;
            let optionLabel = questionsData[count - 1][i];
            let radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.addEventListener('click', function () {
                document.getElementById('next-question-btn').removeAttribute('disabled');
                givenAnswer = optionLabel;
                console.log(givenAnswer);

            });
            radioInput.id = optionId;
            radioInput.name = 'questionOptions';
            radioInput.value = optionLabel;

            let label = document.createElement('label');
            label.classList.add('w-95')
            label.htmlFor = optionId;
            label.textContent = optionLabel;


            let divContainer = document.createElement('div');
            divContainer.classList.add('border', 'p-2', 'rounded', 'd-flex', 'gap-2', 'align-items-center');

            divContainer.appendChild(radioInput);
            divContainer.appendChild(label);

            let radioGroup = document.getElementById("radio-group");
            radioGroup.appendChild(divContainer);
        }

        if (count == questionsData.length) {
            document.getElementById('next-question-btn').innerHTML = 'Finish';
        }
    }

    else {
        finishQuiz();
    }
}
// --------------------------------------------------------------------

// --------------------Function to Submit User's Data -------------------------
function submit() {
    username = document.getElementById('name').value;
    rollNumber = document.getElementById('roll-number').value;
    testType = document.getElementById('test-Type').value;

    // Check If Fields are null , show alert 
    if (username.trim() != "" && rollNumber.trim() != "") {

        if (testType.trim() === 'html') {
            questionsData = htmlQuestions;
        } else if (testType.trim() === 'css') {
            questionsData = cssQuestions;
        } else {
            questionsData = javascriptQuestions;
        }

        // Hide the user-data div 
        userDataContainer.style.display = 'none';
        // Show the instruction div 
        instructionContainer.style.display = 'block';
        // Show the profile of User
        document.getElementById('username').innerHTML = username;

    } else {
        // Alert if fields are Empty
        alert('Please complete all fields');
    }
}
// ----------------------------------------------------------------------


// ------------------- Function to Start Quiz -------------------------
function startQuiz() {
    console.log(instructionContainer.style.display);
    instructionContainer.style.display = 'none';
    quizContainer.style.display = 'block';

    shuffleArray(questionsData);
    shuffleOptions()
    // countDown()
    displayQuestion();
}
// ---------------------------------------------------------------------

function shuffleOptions() {
    for (let i = 0; i < questionsData.length; i++) {
        questionsData[i].splice(1, 3, ...shuffleArray(questionsData[i].slice(1, 4)));
    }
}

// -------------------------- Next Question Function ---------------------
function nextQuestion() {

    count++;
    if (givenAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        score = score + 1;
        console.log('correct answer');
        console.log(score);

    } else {
        console.log('incorrect answer')
    }
    displayQuestion();

}
// --------------------------------------------------------------------------

// ---------------------- Finish Quiz Function --------------------------------
function finishQuiz() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block'
    document.getElementById('score').innerHTML = `You got <span>${score}</span> marks out of ${questionsData.length}.`
    let status = document.getElementById('status')
    if (score > 6) {
        status.innerHTML = 'Congratulations <i class="fa-regular fa-face-smile"></i>'
        status.style.color = 'green'
    } else {
        status.style.color = 'red'
    }
}
// -----------------------------------------------------------------------------

// ------------------ Function to Show Count Down ------------------------------
function countDown() {
    timeRemains = setInterval(timeout, 1000);
}

function timeout() {
    let timeDisplay = document.getElementById('count-down');

    if (timeRemains <= 0) {
        clearInterval(timeRemains);
        timeDisplay.innerHTML = 'Time Out'

    }
    else {
        timeDisplay.innerHTML = timeRemains--;
    }
}



