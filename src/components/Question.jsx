import React from "react"
import {nanoid} from "nanoid"
import {decode} from "html-entities"
import Answer from "./Answer"

export default function Question(props){
      
   
    const answers = props.options.map(option => {      
        return (
            <Answer 
                key={nanoid()}
                question={props.question}
                value={option}
                answer={props.answer}
                selected={props.selected}
                selectAnswer={props.selectAnswer}
                showAnswers={props.showAnswers}
            />
        )
    })
    return (
        <div className="question-wrap">
            <h4 className="question">{decode(props.question)}</h4>
            <ul className="options">
                {answers}
            </ul>
        </div>
    )
}