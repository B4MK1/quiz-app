const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Нарны аймагт хэдэн гараг байдаг вэ?',
        choice1: '12',
        choice2: '4',
        choice3: '8',
        choice4: '6',
        answer: 3,
    },
    {
        question:
            "Санчир гараг хэдэн дагуултай вэ?",
        choice1: "15",
        choice2: "85",
        choice3: "62",
        choice4: "Дагуулгүй",
        answer: 3,
    },
    {
        question: "Uranus(Тэнгэрийн ван) гарагийн диаметр?",
        choice1: "50,724km",
        choice2: "45.645km",
        choice3: "32,678km",
        choice4: "123.473km",
        answer: 1,
    },
    {
        question: "Нарны аймгийн хамгийн том гараг (Нарыг оролцуулахгүй)?",
        choice1: "Буд",
        choice2: "Ангараг",
        choice3: "Санчир",
        choice4: "Бархасбадь",
        answer: 4,
    },
    {
        question: "Нарнаас хамгийн хол байдаг гараг?",
        choice1: "Тэнгэрийн ван",
        choice2: "Дэлхийн ван",
        choice3: "Бархасбадь",
        choice4: "Ангараг",
        answer: 2,
    }
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
