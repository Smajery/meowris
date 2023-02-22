import React, {useState} from 'react';
import Navbar from "./Navbar";
import imgLogo from "../../img/logo.svg";
import imgBtnMenu from "../../img/menu.svg";
import imgCatWithBall from "../../img/cat-header-main.svg";
import imgYarnBall from "../../img/yarn-ball.svg";
import {useNavigate} from "react-router-dom";
import {ROUTE_HOME} from "../../utils/consts";

const Header = () => {
    const navigate = useNavigate()
    const [isOpenMenu, setIsOpenMenu] = useState(false)

    return (
        <header>
            <div className='menu-box'>
                <div className='app-logo'>
                   <img
                       onClick={() => navigate(ROUTE_HOME)}
                       src={imgLogo}
                       alt='Meowris'
                   />
                </div>
                <div
                    className='btn-menu'
                    onClick={() => setIsOpenMenu(!isOpenMenu)}
                >
                    <img src={imgBtnMenu} alt='' />
                </div>
            </div>
            <Navbar
                isOpenMenu={isOpenMenu}
            />
            <div className='header__border-bottom'>
                <div className='cat-and-yarn-ball'>
                    <div className='cat'>
                        <img src={imgCatWithBall} alt=''/>
                    </div>
                    <div className='yarn-ball'>
                        <img src={imgYarnBall} alt=''/>
                    </div>
                </div>
                <hr className='yarn'/>
            </div>
        </header>
    );
};

export default Header;