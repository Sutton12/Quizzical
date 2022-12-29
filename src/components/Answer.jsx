import React from "react"
import {nanoid} from "nanoid"
import {decode} from "html-entities"

export default function Answer(props){
   
    const selectedStyle = props.selected === props.value ? {background:"#D6DBF5"} : null
    
    function answerStyle(){
        if (props.value === props.answer){
            return {background:"#94D7A2", borderColor:"#94D7A2"}
        }else if ( props.selected === props.value) {
            return {background:"#F8BCBC", borderColor:"#F8BCBC"}
        }else {
            return {opacity:".5"}
        }
    }
    
    return (
        <li
            style={props.showAnswers ? answerStyle() : selectedStyle}
            onClick={props.showAnswers ? null : () => props.selectAnswer(props.question, props.value)}

        >
            {decode(props.value)}
        </li>

        
    )
}