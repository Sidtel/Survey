// Check if a session ID already exists, if not, generate a new one
let sessionId = localStorage.getItem('sessionID');
let currentQuestionIndex = 0;
const questions = [
    { id: 1, text: "How satisfied are you with our products?", type: "rating", min: 1, max: 5 },
    { id: 2, text: "How fair are the prices compared to similar retailers?", type: "rating", min: 1, max: 5 },
    { id: 3, text: "How satisfied are you with the value for money of your purchase?", type: "rating", min: 1, max: 5 },
    { id: 4, text: "On a scale of 1-10, how would you recommend us to your friends and family?", type: "rating", min: 1, max: 10 },
    { id: 5, text: "What could we do to improve our service?", type: "text" }
];
// Check if a session ID already exists, if not, generate a new one
if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem('sessionID', sessionId);
}

// Create a data structure for survey answers in local storage
if (!localStorage.getItem(sessionId)) {
    localStorage.setItem(sessionId, JSON.stringify({}));
}

// Function to generate a unique session ID
function generateSessionId() {
    return 'session_' + Date.now();
}

// Function to handle the welcome screen
function startSurvey() {
    // Code to transition to the first question (you can replace this with your logic)
    // alert('Survey Started!'); // Example: Display an alert, you may navigate to the first question screen
    // Hide the welcome screen
    sessionId = generateSessionId();
    localStorage.setItem('sessionID', sessionId);

    if (!localStorage.getItem(sessionId)) {
        localStorage.setItem(sessionId, JSON.stringify({}));
    }
    document.getElementById('welcomeScreen').style.display = 'none';
    
    // Show the questionnaire
    document.getElementById('questionnaire').style.display = 'block';
    showCurrentQuestion();
}

// Attach an event listener to the "Start" button
document.getElementById('startButton').addEventListener('click', startSurvey);

// ... (previous JavaScript code) ...

// Function to handle the questionnaire
function showQuestion(questionText) {
    // document.getElementById('questionContainer').innerHTML = questionText;
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.innerHTML = `<p>${questionText.text}</p>`;
    if (questionText.type === 'rating') {
        // Display a rating input
        questionContainer.innerHTML += `
            <label for="ratingInput">Rate:</label>
            <input type="number" id="ratingInput" min="${questionText.min}" max="${questionText.max}">
        `;
    } else if (questionText.type === 'text') {
        // Display a text input
        questionContainer.innerHTML += `
            <label for="textInput">Answer:</label>
            <textarea id="textInput" rows="4" cols="50"></textarea>
        `;
    }
}





// Attach event listeners to navigation buttons
document.getElementById('prevButton').addEventListener('click', navigateToPreviousQuestion);
document.getElementById('skipButton').addEventListener('click', skipQuestion);
document.getElementById('nextButton').addEventListener('click', navigateToNextQuestion);

// Function to handle the confirmation dialog
function showConfirmationDialog() {
    document.getElementById('confirmationDialog').style.display = 'block';
}

function confirmSubmission() {
    // Code to set the 'COMPLETED' flag in local storage (you can replace this with your logic)
    // alert('Survey Submitted!'); // Example: Display an alert, you may set the 'COMPLETED' flag
    localStorage.setItem(`${sessionId}_COMPLETED`, 'true');
    currentQuestionIndex = 0;
    showThankYouScreen();
}

// Attach event listeners to confirmation dialog buttons
document.getElementById('confirmButton').addEventListener('click', confirmSubmission);
document.getElementById('cancelButton').addEventListener('click', () => {
    document.getElementById('confirmationDialog').style.display = 'none';
});

// Function to handle the thank you screen
function showThankYouScreen() {
    document.getElementById('thankYouScreen').style.display = 'block';
    document.getElementById('questionnaire').style.display = 'none';
    document.getElementById('confirmationDialog').style.display = 'none';
    setTimeout(() => {
        document.getElementById('welcomeScreen').style.display = 'block';
        document.getElementById('questionnaire').style.display = 'none';
        document.getElementById('thankYouScreen').style.display = 'none';
        document.getElementById('confirmationDialog').style.display = 'none';
    }, 5000); // Redirect to welcome screen after 5 seconds
}

function showCurrentQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Update UI with the current question
    showQuestion(currentQuestion);
    // Update UI with the current question number
    updateUI();
}

function navigateToNextQuestion() {
    // saveAnswer(questions[currentQuestionIndex].id, 'Users answer'); // Replace with your logic to save the answer
    // Get the user's answer (replace with your logic to get the answer)
    const userAnswer = document.getElementById('ratingInput') ? document.getElementById('ratingInput').value : document.getElementById('textInput').value;

    // Save the answer for the current question
    saveAnswer(questions[currentQuestionIndex].id, userAnswer);

    // Move to the next question
  
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showCurrentQuestion();
    } else {
        // If it's the last question, show the confirmation dialog
        showConfirmationDialog();
    }
}

function navigateToPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showCurrentQuestion();
    }
}

function skipQuestion() {
    navigateToNextQuestion();
}

// Function to update UI with the current question number and progress
function updateUI() {
    const progress = (currentQuestionIndex + 1) / questions.length * 100;
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    progressBar.style.width = `${progress}%`;
    progressText.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

function saveAnswer(questionId, answer) {
    const surveyData = JSON.parse(localStorage.getItem(sessionId)) || {};

    // Save the answer with the question ID
    surveyData[questionId] = answer;

    // Save the updated survey data back to local storage
    localStorage.setItem(sessionId, JSON.stringify(surveyData));
}


// ... (other functions and logic) ...
