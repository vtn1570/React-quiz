import React from 'react'
import AnswerItem from './AnswerItem/AnswerItem'
import classes from './AnswerList.module.css'

const AnswerList = props => {
    return(
    <ul className={classes.AnswerList} >
       {props.answers.map(((answer, index) => {
           return (
           <AnswerItem
           state={props.state ? props.state[answer.id] : null}
           key={index}
           answer={answer}
           onAnswerClick={props.onAnswerClick}
           />
           )
       }))}
    </ul>
)
}

export default AnswerList