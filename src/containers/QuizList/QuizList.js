import React, { Component } from "react";
import classes from './QuizList.module.css'
import { NavLink } from "react-router-dom";
import axios from 'axios'


export default class QuizList extends Component {
    state = {
        quizzes: []
    }

    renderQuizzes() {
        return this.state.quizzes.map(quiz => {
            return (
                <li
                    key={quiz.id}
                >
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {
        const response = await axios.get('https://react-quiz-458fb-default-rtdb.europe-west1.firebasedatabase.app/quizzes.json')

        const quizzes = []

        Object.keys(response.data).forEach((key, index) => {
            quizzes.push({
                id: key,
                name: `Тест №${index + 1}`
            })
        })
        this.setState({
            quizzes
        })
    }



    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов</h1>
                    <ul>
                        {this.renderQuizzes()}
                    </ul>
                </div>
            </div>
        )
    }
}