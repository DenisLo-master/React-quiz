import React, { Component } from "react";
import classes from './QuizList.module.css'
import { NavLink } from "react-router-dom";
import axios from 'axios'


export default class QuizList extends Component {

    renderQuizzes() {
        return [1, 2, 3].map((quiz, index) => {
            return (
                <li
                    key={index}
                >
                    <NavLink to={'/quiz/' + quiz}>
                        Тест {quiz}
                    </NavLink>
                </li>
            )
        })
    }

    componentDidMount() {
        axios.get('https://react-quiz-458fb-default-rtdb.europe-west1.firebasedatabase.app/').then(response => { console.log(response) })
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