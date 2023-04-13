const questions=[
    {
        question:"What type of a language is HTML?",
        answers: [
            {text : "Scripting Language", correct: false},
            {text : "Markup Language", correct: true},
            {text : "Programming Language", correct: false},
            {text : "Network Protocol", correct: false},
        ]
    },
    {
        question:"What tag is used to display a picture in a HTML page?",
        answers: [
            {text : "Src", correct: false},
            {text : "Image", correct: false},
            {text : "Img", correct: true},
            {text : "Picture", correct: false},
        ]
    },
    {
        question:"HTML are web pages read and rendered by",
        answers: [
            {text : "Compiler", correct: false},
            {text : "Interpreter", correct: false},
            {text : "Server", correct: false},
            {text : "Web Browser", correct: true},
        ]
    },
    {
        question:" HTML documents are saved in",
        answers: [
            {text : "ASCII text", correct: true},
            {text : "Special binary format", correct: false},
            {text : "Machine language codes", correct: false},
            {text : "None of above", correct: false},
        ]
    }, 
]

const questionEl=document.getElementById('question');
const answerBtns=document.getElementById('ans-btns');
const nextBtn=document.getElementById('next-btn');

function startQuiz()
{
    currentQuestionIndex=0;
    score=0;
    nextBtn.innerText="Next"; 
    showQuestion();
}

function showQuestion()
{
    resetState();

    let currentQuestion=questions[currentQuestionIndex];
    let questionNo= currentQuestionIndex + 1;
    questionEl.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement('button');
        button.innerHTML=answer.text;
        button.classList.add('btn');
        answerBtns.appendChild(button);

        if(answer.correct)
        {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener('click',selectAns);
    })
}

function resetState()
{
     nextBtn.style.display = "none";
     while(answerBtns.firstChild)
     {
        answerBtns.removeChild(answerBtns.firstChild)
     }
}

function selectAns(e)
{
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';

    if(isCorrect)
    {
        selectedBtn.classList.add('correct');
        score++;
    }
    else
    {
        selectedBtn.classList.add('incorrect');
    }

    Array.from(answerBtns.children).forEach(button =>{
        if(button.dataset.correct)
        {
            button.classList.add('correct');
        }
        button.disabled = true;
    })
    nextBtn.style.display = "block";
}

function showScore()
{
    resetState();
    questionEl.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn()
{
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length)
    {
        showQuestion();
    }
    else
    {
        showScore();
    }
}

nextBtn.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length)
    {
        handleNextBtn();
    }
    else
    {
        startQuiz()
    }
})

startQuiz();