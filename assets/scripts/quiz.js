const btnStart = document.querySelector("#btn-start-quiz");
const btnStartModal = document.querySelector("#btn-start-quiz-modal");


async function fetchQuizData(quizId) {
    const url = `https://jvhnn.github.io/Code-Quiz/assets/json/quiz-${quizId}.json`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch quiz data:", error);
        document.querySelector("#quiz-error").textContent = "Failed to load quiz data.";
        document.querySelector("#quiz-error").classList.remove('d-none');
        return null;
    }
}

const renderQuiz = async function( ) {

    const quizError = document.querySelector("#quiz-error");
    const quizInfo = document.querySelector("#quiz-info");
    quizId = parseInt( localStorage.getItem("quizeId") );

    if( isNaN( quizId ) ) {

        quizInfo.classList.add("d-none");
        quizError.classList.remove("d-none");
       
    } else {

        quizInfo.classList.remove("d-none");
        quizError.classList.add("d-none");

        const quiz = await fetchQuizData(quizId);

        const quizName = document.querySelector("#quiz-name");
        const quizDesc = document.querySelector("#quiz-desc");
        const totalCount = document.querySelector("#quiz-ques");

        quizName.textContent = quiz.quizName;
        quizDesc.textContent = quiz.quizDesc;
        totalCount.textContent = quiz.questions.length;

    }
    
}


btnStart.addEventListener('click',function(){
    
    var myModal = new bootstrap.Modal(document.getElementById('modal-username'));
    document.querySelector("#username-error").classList.add('d-none');
    myModal.show();


});



btnStartModal.addEventListener('click', function () {
    const usernameError = document.querySelector("#username-error");
    const username = document.querySelector("#username").value.trim();

    if (username === "") {
        usernameError.textContent = 'Enter username to start quiz.';
        usernameError.classList.remove('d-none');
    } else {
        usernameError.classList.add('d-none');
        localStorage.setItem("username", username);

        let url = 'question.html';
        if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
            url = '../question.html';
        }

        console.log(`Navigating to URL: ${url}`);
        location.assign(url);
    }
});


renderQuiz();

