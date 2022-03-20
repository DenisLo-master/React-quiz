import axios from "axios"
import { date } from "is_js"
import {
    AUTH_LOGOUT,
    AUTH_SUCCESS
} from "./actionTypes"

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBw1KLzykLNhadR1yrL4NsWtXeMac5yB0o'

        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBw1KLzykLNhadR1yrL4NsWtXeMac5yB0o'
        }

        const response = await axios.post(url, authData)
        const data = response.data
        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', expirationDate)

        dispatch(authSuccess(data.idToken))
        dispatch(autoLogout(data.expiresIn))
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}


export function logout() {

    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    return {
        type: AUTH_LOGOUT,
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            console.log('1')
            dispatch(logout())
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                console.log('3')
                dispatch(logout())
            }
            else {
                dispatch(authSuccess(token))
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token,
    }
}