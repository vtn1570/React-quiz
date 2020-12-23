import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishQuiz from '../../components/FinishQuiz/FinishQuiz'

class Quiz extends Component {
    state = {
        results: {}, 
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                question: 'Сан книжка это:',
                rightAnswer: 4,
                id: 1,
                answers: [
                    {text: 'Димон', id: 1},
                    {text: 'Димон и книжка', id: 2},
                    {text: 'Димонка', id: 3},
                    {text: 'надо на логисту', id: 4},
                ]
            },
            {
                question: 'Какой расход в бумере',
                rightAnswer: 1,
                id: 2,
                answers: [
                    {text: '10 литров', id: 1},
                    {text: '13 литров', id: 2},
                    {text: '8 литров', id: 3},
                    {text: '6 литров', id: 4},
                ]
            }
        ]
    }

    onAnswerClickHandler = answerId => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if (question.rightAnswer === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })

            const timeout = setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true,
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                clearTimeout(timeout)
            }, 1000)
            
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            results: {},
            isFinished: false,
            activeQuestion: 0,
            answerState: null,
        })
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    
                    {
                        this.state.isFinished 
                        ? <FinishQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                          />
                        : <ActiveQuiz
                        answers= {this.state.quiz[this.state.activeQuestion].answers}
                        question= {this.state.quiz[this.state.activeQuestion].question}
                        onAnswerClick={this.onAnswerClickHandler}
                        quizLength={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion + 1}
                        state={this.state.answerState}
                    />  
                    }
                </div>
            </div>
        )
    }
}

export default Quiz