
let count = 1;
var username = 'test';
let totalQuestion = 0;

const questionData = [
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

console.log(questionData)

// function submit() {
//     // Get all input fields 
//     let inputFields = document.getElementsByTagName('input');
//     // To check the fields
//     let check = true;


//     // Loop to check fields
//     for (input of inputFields) {
//         if (input.value === "") {
//             // If any field is empty, check will false & loop will break
//             check = false;
//             break;
//         }
//     }

//     // If check will remain true , it will further proceeds
//     if (check) {
//         // Get username to call user later
//         username = document.getElementById('name').value;

//         // Loop to clear all fields for later use
//         for (input of inputFields) {
//             input.value = '';
//         }


//         // Get user-data and instruction div to change their visibilty.
//         let dataContainer = document.getElementById('user-data');
//         let insContainer = document.getElementById('instruction');

//         // Change their display
//         insContainer.style.display = 'block';
//         dataContainer.style.display = 'none';

//         // Write username to profile
//         document.getElementById('username').innerHTML = username;



//     } else {
//         alert('Please fill in required fields');
//     }
// }






function submit() {
    // Get the username from the input field
    username = document.getElementById('name').value;
    rollNumber = document.getElementById('roll-number').value;

    // Validate if username is not empty
    if (username.trim() === "" || rollNumber.trim() === "") {
        alert('Please complete all fields');
        return;
    }

    // Hide user-data container and show instruction container
    document.getElementById('user-data').style.display = 'none';
    document.getElementById('instruction').style.display = 'block';

    // Display the username
    document.getElementById('username').innerHTML = username;
}

function startQuiz() {
    // Hide instruction container and show quiz container
    document.getElementById('instruction').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';

    // Display the first question
    displayQuestion();
}


function displayQuestion() {
    console.log('Start Working')
    if (count <= questionData.length) {
        document.getElementById("question-number").innerHTML = count;
        document.getElementById("question-content").innerHTML = questionData[count - 1][0];
        document.getElementById('next-question-btn').setAttribute('disabled', 'disabled');

        // Clear previous radio inputs
        document.getElementById("radio-group").innerHTML = '';

        // Create and append new radio inputs for the options
        for (let i = 1; i <= 3; i++) {
            let optionId = `option-${i}`;
            let optionLabel = questionData[count - 1][i];
            let radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.addEventListener('click', function () {
                document.getElementById('next-question-btn').removeAttribute('disabled');
            });
            radioInput.id = optionId;
            radioInput.name = 'questionOptions';
            radioInput.value = optionLabel;
            let label = document.createElement('label');
            label.htmlFor = optionId;
            label.textContent = optionLabel;
            let br = document.createElement('br');
            document.getElementById("radio-group").appendChild(radioInput);
            document.getElementById("radio-group").appendChild(label);
            document.getElementById("radio-group").appendChild(br);
        }

        if (count == questionData.length) {
            document.getElementById('next-question-btn').innerHTML = 'Finish';
        }


    }

    else {
        finishQuiz();
    }
}


function nextQuestion() {
    count++;
    displayQuestion();
}

function finishQuiz() {
    // Add finishing logic here (e.g., display results)
    alert('Congratulations! You have completed the quiz.');
}




