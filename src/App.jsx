import React from "react"
import {nanoid} from "nanoid"
import Start from "./components/Start"
import Question from "./components/Question"
import blobYellow from "./images/blob-yellow.svg"
import blobBlue from "./images/blob-blue.svg"
import Confetti from 'react-confetti'

export default function App(){
    
    const [quizOptions, setQuizOptions] = React.useState({category:"", difficulty:""})
    const [start, setStart] = React.useState(false)
    const [quizData, setQuizData] = React.useState([])
    const [quizQuestions, setQuizQuestions] = React.useState([])
    const [showAnswers, setShowAnswers] = React.useState(false)
    const [finalScore, setFinalScore] = React.useState()
    const [showConfetti, setShowConfetti] = React.useState(false)
        
    //Fetch API
    React.useEffect(() =>{      
        fetch(`https://opentdb.com/api.php?amount=5&category=${quizOptions.category}&difficulty=${quizOptions.difficulty}`)
        .then((response) => response.json())
        .then((data) => setQuizData(data.results))

    }, [quizOptions, start])

    function updateQuizOptions(event){
        const {name, value} = event.target
        setQuizOptions(prevOptions => {
            return {
                ...prevOptions,
                [name]: value
            }
        })
        
    }        
        
        
    //Store questions in state
    function getQuestions(){
        const questionsArr = []
        quizData.map(quiz => {
            
            const options = [...quiz.incorrect_answers]
            options.push(quiz.correct_answer)
            options.sort()

            questionsArr.push({
                question: quiz.question,
                answer: quiz.correct_answer,
                selected: "",
                options: options,
                isCorrect: false
                
            }) 
        }) 
        setQuizQuestions(questionsArr)
    }
    
    //Start app
    function startQuiz(){         
        setStart(true)
        getQuestions()
    }

    //set selected answer
    function selectAnswer(thisQuestion, selected){
        setQuizQuestions(prevQuizQuestions => {
            const newQuizQuestions = []
            prevQuizQuestions.map(question => {
                
                var isCorrect = ""
                selected === question.answer ? isCorrect = true : isCorrect = false
                
                if (question.question === thisQuestion ){
                    newQuizQuestions.push({
                        ...question,
                        selected: selected,    
                        isCorrect: isCorrect                
                    })    
                                    
                }else {
                    newQuizQuestions.push({
                        ...question,             
                    })  
                }   
            })
            return newQuizQuestions
        })
    }
    
    function checkAnswers(){
        setShowAnswers(true)
        var score = 0
        quizQuestions.map(question => {
            question.isCorrect ? score = score + 1 : "" 
        })
        setFinalScore(score + "/" + quizQuestions.length)
        score === quizQuestions.length ? setShowConfetti(true) : null
    }

      
    
    const questionElements = quizQuestions.map(question => {
        return <Question 
            key={nanoid()}
            question={question.question}
            options={question.options}
            answer={question.answer}
            selected={question.selected}
            selectAnswer={selectAnswer}
            isCorrect={question.isCorrect}
            showAnswers={showAnswers}

        />
    })
    
    //restart quiz  
    function restartQuiz(){
        setShowAnswers(false)
        setStart(false)
        setQuizOptions({category:"", difficulty:""})
        setShowConfetti(false)
    }  
      
    return (
        <>
        <img src={blobYellow} className="blob blob-top top-blob"/>
        <img src={blobBlue} className="blob bottom-blob"/>
        <main>
            {start ? "" :
            <Start
                startQuiz={startQuiz}
                updateQuizOptions={updateQuizOptions}
            />}
            
            {start && questionElements}
            
            <div className="quiz-footer">
                {showAnswers && <p className="score">You scored {finalScore} correct answers</p>}       
                {start &&  <button
                    className="check-button"
                    onClick={showAnswers ? restartQuiz : checkAnswers}
                >
                    {showAnswers ? "Play Again" : "Check Answers" }
                </button>}
            </div>
        </main>
        {showConfetti && <Confetti height={document.body.scrollHeight} />}        
        </>
    )

}

