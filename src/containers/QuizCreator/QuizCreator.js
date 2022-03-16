import React, { Component } from "react";
import classes from './QuizCreator.module.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import createControl from '../../from/formFramework'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'

function createOptionControl(number) {
    return createControl({
        label: `Вариант ${number}`,
        errorMessage: 'Значение не может быть пустым',
    }, { required: true })
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым',
        }, { required: true }),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

export default class QuizCreator extends Component {

    state = {
        nameTest: '1',
        quiz: [],
        formControls: createFormControls()
    }

    submitHandler = event => {
        event.prevEvent()
    }

    addQuestionHandler = () => {

    }

    createQuizHandler = () => {

    }

    onChangeHandler = () => {

    }

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                //оборачиваем в hoc свой компонент "Auxiliary" можно React.Fragment, 
                // т.к. return не может вернуть больше 1 объекта
                <Auxiliary key={controlName + index}>
                    <Input
                        type={control.type}
                        value={control.value}
                        valid={control.valid}
                        touched={control.touched}
                        label={control.label}
                        errorMessage={control.errorMessage}
                        shouldValidate={!!control.validation}
                        onChange={event => this.onChangeHandler(event.target.value, controlName)}
                    />
                    {index === 0 ? <hr /> : null}
                </Auxiliary>
            )
        })
    }

    render() {
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>QuizCreator</h1>
                    <form onSubmit={this.submitHandler}>
                        {this.renderControls()}
                        <select></select>
                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                        >
                            Добавить вопрос
                        </Button>
                        <Button
                            type="success"
                            onClick={this.createQuizHandler}
                        >
                            Создать тест
                        </Button>

                    </form>
                </div>

            </div>
        )
    }
}