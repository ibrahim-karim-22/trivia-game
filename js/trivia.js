const questionDiv = document.querySelector('#question');
const answerDiv = document.querySelector('#answer');
const feedbackDiv = document.querySelector('#feedback');
//const newQuestionBtn = document.querySelector('#questionBtn');
//newQuestionBtn.addEventListener('click', displayQuestion);
let currentQuestion = null;

function getTriviaQuestion() {
    return new Promise((resolve, reject)=> {
        setTimeout(()=> {
            const index = Math.floor(Math.random() * questions.length);
            const question = questions[index];
            if (index > questions.length) {
                reject('An error occured while fetching the trivia question');
            } else {
                resolve(question);
            }
        }, 1000)
    });
}
function displayQuestion(triviaQuestion) {
    questionDiv.textContent = triviaQuestion.question // give new content to the div
    answerDiv.value = ''; // reset the answer field
    feedbackDiv.textContent = ''; //reset the feedback div
}
document.querySelector('#questionBtn').addEventListener('click', () => {
    getTriviaQuestion().then((question)=> { // get a random question
        currentQuestion = question; // update the currentQuestion variable
        displayQuestion(question); // pass the question to the displayQuesttion function
    })
    .catch((error) => {
        console.error(error); // log any errors
    })
});
document.querySelector('#answerBtn').addEventListener('click', () => {
    let feedbackMessage; //temporary variable to store a message
    const userAnswer = answerDiv.value.trim().toLowerCase(); // normalizes the user's answer
    console.log(userAnswer, currentQuestion.answer); // prints both answers to the log to help with the debugging
    if (currentQuestion && userAnswer === currentQuestion.answer.toLowerCase()) {
        feedbackDiv.computedStyleMap.color = 'green'; // update font color of the feedbackDiv object
        feedbackMessage = 'Great job! Your answer is correct.'; // update the message variable
    } else {
        feedbackDiv.style.color = 'red';
        feedbackMessage = `Sorry, that is incorrect. The correct Answer is: "${currentQuestion.answer}". Try another question!`; // update the message variable
    }
    feedbackDiv.textContent = feedbackMessage; // update the feedbackDiv with the message content
})