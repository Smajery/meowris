import React, {useState} from 'react';
import {useActions} from "../../hooks/useActions";
import {useNavigate} from "react-router-dom";
import {ROUTE_MEMORY} from "../../utils/consts";
import {useSelector} from "react-redux";
import {login} from "../../http/userAPI";

const LoginForm = () => {
    const navigate = useNavigate()
    const {regMessage, logMessage, isError} = useSelector(state => state.authReducer)
    const {singIn, logIn, setIsError, setLogMessage, setRegMessage} = useActions()

    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [isEmailEmpty, setIsEmailEmpty] = useState(false)
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false)
    const [emailErrorMessage, setEmailErrorMessage] = useState('')
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
    const [haveAccount, setHaveAccount] = useState(true)

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        setIsEmailEmpty(false)
        setIsPasswordEmpty(false)
        setEmailErrorMessage('')
        setPasswordErrorMessage('')
        if (!emailValue) {
            setIsEmailEmpty(true)
            setEmailErrorMessage("Це поле обов'язкове")
        }
        if (!passwordValue) {
            setIsPasswordEmpty(true)
            setPasswordErrorMessage("Це поле обов'язкове")
        }
        if (!emailValue || !passwordValue) return;
        if(passwordValue.length < 3) {
            setIsPasswordEmpty(true)
            setPasswordErrorMessage("Ваш пароль повинен містити більше ніж 3 символи")
        }
        if(passwordValue.length > 20) {
            setIsPasswordEmpty(true)
            setPasswordErrorMessage("Ваш пароль повинен містити менше ніж 20 символів")
        }
        if (passwordValue.length < 3 || passwordValue.length > 20) return;
        setIsError(false)
        setRegMessage('')
        setLogMessage('')
        if (haveAccount) {
            logIn(emailValue, passwordValue)
            login(emailValue, passwordValue).then(() => navigate(ROUTE_MEMORY))
        } else {
            singIn(emailValue, passwordValue)
        }
    }

    return (
        <div className='login-form'>
            <form onSubmit={handleSubmitForm}>
                <input
                    multiple
                    type='email'
                    autoComplete='on'
                    value={emailValue}
                    placeholder='Введіть свій email'
                    onChange={e => setEmailValue(e.target.value)}
                />
                <p className='isEmpty-text'>{isEmailEmpty && emailErrorMessage}</p>
                <input
                    type='password'
                    autoComplete='on'
                    value={passwordValue}
                    placeholder='Введіть свій пароль'
                    onChange={e => setPasswordValue(e.target.value)}
                />
                <p className='isEmpty-text'>{isPasswordEmpty && passwordErrorMessage}</p>
                <div className='btn-box'>
                    {haveAccount
                        ?
                        <div className='btn-box__text'>
                            <p>Немає облікового запису?
                                <span onClick={() => setHaveAccount(false)}>
                                    Зареєструйтесь!
                                </span>
                            </p>
                        </div>
                        :
                        <div className='btn-box__text'>
                            <p>У вас вже є обліковий запис?
                                <span onClick={() => setHaveAccount(true)}>
                                    Увійдіть!
                                </span>
                            </p>
                        </div>
                    }
                    {haveAccount
                        ?
                        <button type='submit'>Увійти</button>
                        :
                        <button type='submit'>Зареєструватися</button>
                    }
                </div>
            </form>
            <div className={(isError && logMessage) ? 'message-card' : 'message-card closed'}>
                <button
                    className='btn-close'
                    onClick={() => setIsError(false)}
                >
                    x
                </button>
                <p className='message-card__text'>
                    {logMessage}
                </p>
            </div>
            <div className={(isError && regMessage) ? 'message-card' : 'message-card closed'}>
                <button
                    className='btn-close'
                    onClick={() => setIsError(false)}
                >
                    x
                </button>
                <p className='message-card__text'>
                    {regMessage}
                </p>
            </div>
        </div>
    );
};

export default LoginForm;