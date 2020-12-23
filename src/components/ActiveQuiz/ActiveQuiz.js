import React from 'react'
import classes from './ActiveQuiz.module.css'
import AnswerList from './AnswersList/AnswerList'


const ActiveQuiz = (props) => {
    return (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                <strong>{props.answerNumber}.</strong>&nbsp;
                {props.question}
            </span>

            <small>{props.answerNumber} из { props.quizLength }</small>
        </p>
        
        <AnswerList
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
        state={props.state}
        />
    </div>
) 
}

export default ActiveQuiz