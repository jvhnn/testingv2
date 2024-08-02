const btnStart = document.querySelector("#btn-start-quiz");
const btnStartModal = document.querySelector("#btn-start-quiz-modal");

async function fetchQuizData(quizId) {
    const requestURL = `./assets/json/quiz-${quizId}.json`;
    
    try {
      const response = await fetch(requestURL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const quiz = await response.json();
      console.log("Fetched quiz data:", quiz); // Log fetched data
      return quiz;
    } catch (error) {
      console.error(`Failed to fetch quiz data: ${error}`);
    }
  }

  const renderQuiz = async function() {
    const quizError = document.querySelector("#quiz-error");
    const quizInfo = document.querySelector("#quiz-info");
    const quizId = parseInt(localStorage.getItem("quizeId"));
  
    if (isNaN(quizId)) {
        quizInfo.classList.add("d-none");
        quizError.classList.remove("d-none");
        console.log("Quiz ID is not a number. Displaying error message.");
    } else {
        quizInfo.classList.remove("d-none");
        quizError.classList.add("d-none");
  
        const quiz = await fetchQuizData(quizId);
  
        if (quiz) {
            const quizName = document.querySelector("#quiz-name");
            const quizDesc = document.querySelector("#quiz-desc");
            const totalCount = document.querySelector("#quiz-ques");
  
            quizName.textContent = quiz.quizName;
            quizDesc.textContent = quiz.quizDesc;
            totalCount.textContent = quiz.questions.length;
            console.log("Quiz data rendered successfully.");
        } else {
            quizInfo.classList.add("d-none");
            quizError.classList.remove("d-none");
            console.error("Quiz data is null or undefined. Displaying error message.");
        }
    }
};


btnStart.addEventListener('click', function() {
    var myModal = new bootstrap.Modal(document.getElementById('modal-username'));
    document.querySelector("#username-error").classList.add('d-none');
    myModal.show();
    console.log("Start quiz button clicked, modal shown.");
  });
  
  btnStartModal.addEventListener('click', function() {
    const usernameError = document.querySelector("#username-error");
    const username = document.querySelector("#username").value.trim();
    
    if (username === "") {
      usernameError.textContent = 'Enter username to start quiz.';
      usernameError.classList.remove('d-none');
      console.log("Username is empty, showing error.");
    } else {
      usernameError.classList.add('d-none');
      localStorage.setItem("username", username);
      console.log("Username set in localStorage:", username);
      
      let url = '';
      if (window.location.pathname === '/Code-Quiz/') {
        url = window.location.origin + window.location.pathname + "question.html";
      } else {
        url = window.location.origin + "/Code-Quiz/question.html";
      }
      
      location.assign(url);
      console.log("Navigating to:", url);
    }
  });


renderQuiz();

