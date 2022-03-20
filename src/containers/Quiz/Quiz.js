import React, { Component } from "react";
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import { connect } from "react-redux";
import { fetchQuizById, quizAnswerClick, retryQuiz } from "../../store/actions/quiz";
import { Navigate, Route, Routes } from "react-router-dom";





class Quiz extends Component {

    componentDidMount() {
        this.props.fetchQuizById(this.props.activeQuizId);
    }

    //при выходе из теста, сбросить все ответы
    componentWillUnmount() {

        this.props.retryQuiz()

    }

    render() {
        if (this.props.quiz && this.props.activeQuizId && !this.props.loading) {
            console.log('!!!!!!!!!')
            return (
                <div className={classes.Quiz}>
                    <div className={classes.QuizWrapper}>
                        <h1>Ответьте на все вопросы</h1>
                        {
                            this.props.isFinished ?
                                <FinishedQuiz
                                    results={this.props.results}
                                    quiz={this.props.quiz}
                                    onRetry={this.props.retryQuiz}
                                />
                                :
                                <ActiveQuiz
                                    answers={this.props.quiz[this.props.activeQuestion].answers}
                                    question={this.props.quiz[this.props.activeQuestion].question}
                                    onAnswerClick={this.props.quizAnswerClick}
                                    quizLength={this.props.quiz.length}
                                    answerNumber={this.props.activeQuestion + 1}
                                    state={this.props.answerState}
                                />
                        }
                    </div>
                </div>
            )
        }
        if (!this.props.activeQuizId && !this.props.loading) {
            console.log('--------')
            return (
                <Navigate to={'/'} />
            )
        }

        else {
            return (
                <div className={classes.Quiz}>
                    <Loader />
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading,
        activeQuizId: state.quiz.activeQuizId,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: quizId => dispatch(fetchQuizById(quizId)),
        retryQuiz: () => dispatch(retryQuiz()),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
