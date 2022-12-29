import React from "react"

export default function Start(props){
    return (
        <div className="start-screen">
            <h1>Quizzical</h1>
            <div className="quiz-options">
                <label htmlFor="difficulty">Select Difficulty</label>
                <select if="difficulty" onChange={props.updateQuizOptions} name="difficulty">
                    <option value="">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <label htmlFor="category">Select Category</label>
                <select id="category" name="category" onChange={props.updateQuizOptions}>
                    <option value="">Any Category</option>
                    <option value="9">General Knowledge</option>
                    <option value="10">Entertainment: Books</option>
                    <option value="11">Entertainment: Film</option>
                    <option value="12">Entertainment: Music</option>
                    <option value="13">Entertainment: Musicals and Theatres</option>
                    <option value="14">Entertainment: Television</option>
                    <option value="15">Video Games</option>
                    <option value="16">Board Games</option>
                    <option value="17">Science and Nature</option>
                    <option value="18">Science: Computers</option>
                    <option value="19">Science: Mathematics</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="25">Arts</option>
                    <option value="26">Celebrities</option>
                    <option value="27">Animals</option>
                    <option value="28">Vehicles</option>
                    <option value="29">Entertainment: Comics</option>
                    <option value="30">Science: Gadgets</option>
                    <option value="31">Entertainment: Japanese Anime and Manga</option>
                    <option value="32">Entertainment: Cartoon and Animations</option>
                </select> 
            </div>              
            
            <button
                className="start-button"
                onClick={props.startQuiz}
                >
                Start quiz
            </button>
        </div>
    )
}