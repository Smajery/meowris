import React from 'react';
import imgLogo from '../img/logo.svg'
import imgFirstStep from '../img/first-step.gif'
import imgSecondStep from '../img/second-step.gif'
import imgThirdStep from '../img/third-step.gif'
import imgCatPlaying from '../img/cat-playing.svg'
import imgCatSharpening from '../img/cat-sharpening.svg'

const HomePage = () => {

    return (
        <div className='home-page'>
            <div className='home-page__content'>
                <div className='content__title'>
                    <p className='hello-text__top'>
                        Ласкаво просимо
                    </p>
                    <div className='hello-text__bottom-box'>
                        <p className='hello-text__bottom left'>
                            Вас вітає додаток
                        </p>
                        <div className='hello-text__img'>
                            <img src={imgLogo} alt='Meowris' />
                        </div>
                        <p className='hello-text__bottom right'>
                            давайте познайомимося!
                        </p>
                    </div>
                </div>
                <div className='instruction'>
                    <div className='explanation-text'>
                        <p className='explanation-text__top'>
                            За допомогою мене ви зможете не просто зберігати фотографії ваших спогадів, але також
                            оцінювати та навіть описувати їх.
                        </p>
                        <p className='explanation-text__middle'>
                            Ми називаємо це зручним форматом :3
                        </p>
                        <p className='explanation-text__bottom'>
                            Наш додаток досить молодий, тому давайте ми вам покажемо, як тут усе працює!
                        </p>
                    </div>
                    <div className='steps-box'>
                        <div className='first-step'>
                            <div className='step-text'>
                                <p className='step-text__first'>
                                    <span className='name'>Перший крок:</span> ви маєте пройти реєстрацію, а потім
                                    увійти.
                                </p>
                            </div>
                            <div className='step__img-box first'>
                                <img src={imgFirstStep} alt='first-step'/>
                                <div className='cat-sharpening'>
                                    <img src={imgCatSharpening} alt=''/>
                                </div>
                            </div>
                        </div>
                        <div className='second-step'>
                            <div className='step-text'>
                                <p className='step-text__second'>
                                    <span className='name'>Другий крок:</span> щоб створити категорію ваших спогадів,
                                    натисніть "Додати"
                                    на лівій частині нашого "блокнота".
                                </p>
                            </div>
                            <div className='step__img-box second'>
                                <img src={imgSecondStep} alt='second-step'/>
                            </div>
                        </div>
                        <div className='third-step'>
                            <div className='step-text'>
                                <p className='step-text__third'>
                                    <span className='name'>Третій крок:</span> коли ви перейшли до вашої категорії,
                                    з'явиться кнопка "+", за допомогою якої можна додати спогад
                                    Натисніть на неї та введіть усі дані, вказані на картці.
                                </p>
                            </div>
                            <div className='step__img-box third'>
                                <img src={imgThirdStep} alt='third-step'/>
                            </div>
                        </div>
                    </div>
                    <div className='congrats-box'>
                        <div className='congrats-box__text'>
                            <p>
                                Вітаємо! Ви створили свій перший спогад!
                            </p>
                        </div>
                        <div className='congrats-box__img'>
                            <img src={imgCatPlaying} alt=''/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;