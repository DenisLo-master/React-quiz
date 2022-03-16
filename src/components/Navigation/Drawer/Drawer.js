import React, { Component } from "react";
import classes from './Drawer.module.css'
import Backdrop from "../../UI/Backdrop/Backdrop";
import { NavLink } from "react-router-dom";

const links = [
    {
        to: '/',
        label: 'Список'
    },
    {
        to: '/auth',
        label: 'Авторизация'
    },
    {
        to: '/quiz-creator',
        label: 'Создать тест'
    },
]

class Drawer extends Component {

    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        activeclassname={classes.active}
                    >{link.label}</NavLink>
                </li>
            )
        })
    }


    render() {

        const cls = [classes.Drawer]

        if (!this.props.isOpen) {
            cls.push(classes.close)
        }


        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
            </React.Fragment>
        )
    }
}
export default Drawer