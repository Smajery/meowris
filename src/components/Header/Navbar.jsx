import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {ROUTE_HOME, ROUTE_LOGIN, ROUTE_MEMORY} from "../../utils/consts";
import {useSelector} from "react-redux";
import {useActions} from "../../hooks/useActions";
import imgUserLogo from "../../img/user.svg";
import imgBtnEdit from "../../img/btn-edit.svg";
import {setUser, addUserImg} from "../../http/userAPI";

const Navbar = ({isOpenMenu}) => {
    const navigate = useNavigate()
    const {isAuth, user} = useSelector(state => state.authReducer)
    const {logOut, setUserImg} = useActions()

    const [isEditLogo, setIsEditLogo] = useState(false)
    const [isEditFile, setIsEditFile] = useState(false)
    const [fileValue, setFileValue] = useState(null)

    const exit = () => {
        logOut()
        navigate(ROUTE_LOGIN)
    }

    const handleSubmitBtn = (e) => {
        e.preventDefault()
        if(!fileValue) {
            return
        }
        addUserImg(fileValue[0]).then(data => {
            setUser(user.id, {img: data.url}).then()
            setUserImg(data.url)
        })
        setIsEditFile(false)
        setIsEditLogo(false)
    }

    return (
        isAuth
            ?
            <div className={isOpenMenu ? 'navbar' : 'navbar closed'}>
                <div className='left-nav'>
                    <div
                        className={(window.location.href.search(ROUTE_HOME) === -1) ? 'nav' : 'nav active'}
                        onClick={() => navigate(ROUTE_HOME)}
                    >
                        Інструкція
                    </div>
                    <div
                        className={(window.location.href.search(ROUTE_MEMORY) === -1) ? 'nav' : 'nav active'}
                        onClick={() => navigate(ROUTE_MEMORY)}
                    >
                        Спогади
                    </div>
                </div>
                <div className='right-nav'>
                    <div className='user-logo'>
                        <img src={user.img ? user.img : imgUserLogo} alt=''
                             onClick={() => {
                                 setIsEditFile(false)
                                 setIsEditLogo(!isEditLogo)
                             }}/>
                        {isEditLogo
                            &&
                            <div className='btn-edit-box'>
                                <input
                                    id="imageUploads"
                                    type='file'
                                    accept=".jpg, .jpeg, .png, .gif, .svg"
                                    onChange={e => setFileValue(e.target.files)}
                                />
                                <label
                                    className='user-logo__file-uploads'
                                    htmlFor='imageUploads'
                                >
                                    <img src={imgBtnEdit} alt='' onClick={() => setIsEditFile(true)}/>
                                </label>
                            </div>
                        }
                        {isEditFile
                            &&
                            <button onClick={handleSubmitBtn}>
                                Ок
                            </button>
                        }
                    </div>
                    <div className='nav' onClick={exit}>Вихід</div>
                </div>
            </div>
            :
            <div className={isOpenMenu ? 'navbar' : 'navbar closed'}>
                <div className='left-nav'>
                    <div
                        className={(window.location.href.search(ROUTE_HOME) === -1) ? 'nav' : 'nav active'}
                        onClick={() => navigate(ROUTE_HOME)}
                    >
                        Інструкція
                    </div>
                </div>
                <div className='right-nav'>
                    <div className='user-logo'>
                        <img src={imgUserLogo} alt=''/>
                    </div>
                    <div
                        className={(window.location.href.search(ROUTE_LOGIN) === -1) ? 'nav' : 'nav active'}
                        onClick={() => navigate(ROUTE_LOGIN)}
                    >
                        Вхід
                    </div>
                </div>
            </div>
    );
};

export default Navbar;