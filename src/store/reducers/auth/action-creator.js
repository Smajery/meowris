import {authSlice} from "./AuthSlice";
import {login, registration} from "../../../http/userAPI";

export const AuthActionCreator = {
    setIsAuth: (isAuth) => dispatch => {
        dispatch(authSlice.actions.setIsAuth(isAuth))
    },
    setUser: (user) => dispatch => {
        dispatch(authSlice.actions.setUser(user))
    },
    setUserImg: (img) => dispatch => {
        dispatch(authSlice.actions.setUserImg(img))
    },
    setIsError: (boolean) => dispatch => {
        dispatch(authSlice.actions.setIsError(boolean))
    },
    setLogMessage: (message) => dispatch => {
        dispatch(authSlice.actions.setLogMessage(message))
    },
    setRegMessage: (message) => dispatch => {
        dispatch(authSlice.actions.setRegMessage(message))
    },
    singIn: (email, password) => dispatch => {
        try {
            registration(email, password).then(data => {
                dispatch(AuthActionCreator.setIsError(true))
                dispatch(AuthActionCreator.setRegMessage('Вітаємо, ви зареєструвалися!'))
                console.log(data)
            }).catch(error => {
                dispatch(AuthActionCreator.setIsError(true))
                if (error.response.status !== 400 &&
                    error.response.status !== 409 &&
                    error.response.status !== 401 &&
                    error.response.status !== 404) {
                    dispatch(AuthActionCreator.setRegMessage('Невідома помилка, зберігайте спокій :)'))
                    return
                }
                dispatch(AuthActionCreator.setRegMessage(error.response.data.message))
                console.log(error)
            })
        } catch (e) {
            console.log(e)
        }
    },
    logIn: (email, password) => dispatch => {
        try {
            login(email, password).then(() => {
                dispatch(AuthActionCreator.setIsAuth(true))
                dispatch(AuthActionCreator.setUser(JSON.parse(localStorage.getItem('user'))))
                localStorage.setItem('auth', JSON.stringify(true))
            }).catch(error => {
                dispatch(AuthActionCreator.setIsError(true))
                if (error.response.status !== 400 &&
                    error.response.status !== 409 &&
                    error.response.status !== 401 &&
                    error.response.status !== 404) {
                    dispatch(AuthActionCreator.setRegMessage('Невідома помилка, зберігайте спокій :)'))
                    return
                }
                dispatch(AuthActionCreator.setLogMessage(error.response.data.message))
            })
        } catch (e) {
            console.log(e)
        }
    },
    logOut: () => dispatch => {
        try {
            dispatch(AuthActionCreator.setUser({}))
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            localStorage.removeItem('auth')
            dispatch(AuthActionCreator.setIsAuth(false))
        } catch (e) {
            console.log(e)
        }
    }
}