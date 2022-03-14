import React, { Component } from "react";
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {
    state = {
        results: {}, //{[id]: 'success' 'error'}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, //для текущего состояния Answeritem{[id]: 'success' 'error'}
        quiz: [
            {
                question: 'Какого цвета небо?',
                rightAnswer: 2,
                id: 1,
                answers: [
                    { text: 'черный', id: 1 },
                    { text: 'синий', id: 2 },
                    { text: 'красный', id: 3 },
                    { text: 'зеленый', id: 4 },
                ]
            },
            {
                question: 'В каком году был основан Санкт-Петербург?',
                rightAnswer: 3,
                id: 2,
                answers: [
                    { text: '1700', id: 1 },
                    { text: '1702', id: 2 },
                    { text: '1703', id: 3 },
                    { text: '1803', id: 4 },
                ]
            }
        ]
    }



    onAnswerClickHandler = answerId => {

        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const results = this.state.results

        const question = this.state.quiz[this.state.activeQuestion]

        if (question.rightAnswer === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            this.setState({
                answerState: { [answerId]: 'success' },
                results
            })

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                }
                else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)
        }
        else {
            // this.setState(
            //     { activeQuestion: this.state.activeQuestion + 1 }
            // )
            results[question.id] = 'error'
            this.setState({
                answerState: { [answerId]: 'error' },
                results
            })

        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }


    retryHandler = () => {
        this.setState({
            isFinished: false,
            results: {},
            answerState: null,
            activeQuestion: 0,
        })
    }


    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    {this.state.isFinished ?
                        <FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                        />
                        :
                        <ActiveQuiz
                            answers={this.state.quiz[this.state.activeQuestion].answers}
                            question={this.state.quiz[this.state.activeQuestion].question}
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