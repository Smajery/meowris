import React, {useState} from 'react';
import {useActions} from "../../hooks/useActions";
import {useSelector} from "react-redux";
import imgRatingStar from "../../img/star-rate.svg";
import {createMemoryImg} from "../../http/memoriesAPI";

const CreateMemory = () => {
    const {isMemoryCardModal, selectedMemories, selectedCategory} = useSelector(state => state.memoryReducer)
    const {addMemory, setIsMemoryCardModal, setIsLoading} = useActions()

    const [memoryNameValue, setMemoryNameValue] = useState('')
    const [memoryRateValue, setMemoryRateValue] = useState(null)
    const [memoryImgValue, setMemoryImgValue] = useState('')
    const [previewImg, setPreviewImg] = useState(null)

    const [rateIsWarning, setRateIsWarning] = useState(false)
    const [nameIsWarning, setNameIsWarning] = useState(false)
    const [imgIsWarning, setImgIsWarning] = useState(false)
    const [nameWarningText, setNameWarningText] = useState('')
    const [rateWarningText, setRateWarningText] = useState('')
    const [imgWarningText, setImgWarningText] = useState('')

    const [ratingFive, setRatingFive] = useState(false)
    const [ratingFour, setRatingFour] = useState(false)
    const [ratingThree, setRatingThree] = useState(false)
    const [ratingTwo, setRatingTwo] = useState(false)
    const [ratingOne, setRatingOne] = useState(false)

    const currentRatingIsOne = () => {
        setRatingFive(false)
        setRatingFour(false)
        setRatingThree(false)
        setRatingTwo(false)
        setRatingOne(true)
        setMemoryRateValue(1)
    }
    const currentRatingIsTwo = () => {
        setRatingFive(false)
        setRatingFour(false)
        setRatingThree(false)
        setRatingOne(false)
        setRatingTwo(true)
        setMemoryRateValue(2)
    }
    const currentRatingIsThree = () => {
        setRatingFive(false)
        setRatingFour(false)
        setRatingTwo(false)
        setRatingOne(false)
        setRatingThree(true)
        setMemoryRateValue(3)
    }
    const currentRatingIsFour = () => {
        setRatingFive(false)
        setRatingThree(false)
        setRatingTwo(false)
        setRatingOne(false)
        setRatingFour(true)
        setMemoryRateValue(4)
    }
    const currentRatingIsFive = () => {
        setRatingFour(false)
        setRatingThree(false)
        setRatingOne(false)
        setRatingTwo(false)
        setRatingFive(true)
        setMemoryRateValue(5)
    }
    const currentRatingZero = () => {
        setRatingFour(false)
        setRatingThree(false)
        setRatingOne(false)
        setRatingTwo(false)
        setRatingFive(false)
        setMemoryRateValue(null)
    }

    const closeMemoryCardModal = () => {
        setNameIsWarning(false)
        setImgIsWarning(false)
        setRateIsWarning(false)
        setMemoryNameValue('')
        setMemoryImgValue('')
        setPreviewImg(null)
        currentRatingZero()
        setIsMemoryCardModal(false)
    }

    const handleFileInputChange = (e) => {
        setMemoryImgValue(e.target.value)
        const file = e.target.files[0]
        previewFile(file)
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewImg(reader.result)
        }
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        if (!memoryNameValue) {
            setNameWarningText("Назва обов’язкова")
            setNameIsWarning(true)
        } else {
            setNameIsWarning(false)
        }
        for (let i = 0; i < selectedMemories.length; i++) {
            if (selectedMemories[i].title === memoryNameValue) {
                setNameWarningText("Така назва вже існує")
                setNameIsWarning(true)
            }
        }
        if (!memoryImgValue) {
            setImgWarningText("Світлина обов’язкова")
            setImgIsWarning(true)
        } else {
            setImgIsWarning(false)
        }
        if (memoryImgValue && previewImg.size > 5 * 1024 * 1024) {
            setImgWarningText("Файл може бути не більше 5 МБ")
            setImgIsWarning(true)
        }
        for (let i = 0; i < selectedMemories.length; i++) {
            if (selectedMemories[i].img === memoryImgValue) {
                setImgWarningText("Така картинка вже існує")
                setImgIsWarning(true)
            }
        }
        if (!memoryRateValue) {
            setRateWarningText("Рейтинг обов'язковий")
            setRateIsWarning(true)
            return
        } else {
            setRateIsWarning(false)
        }
        setIsLoading(true)
        createMemoryImg(previewImg).then(data =>  {
            addMemory(memoryNameValue, memoryRateValue, data.url, selectedCategory.id)
        })
        closeMemoryCardModal()
    }

    return (
        <div
            className={isMemoryCardModal ? 'memory-card__modal' : 'memory-card__modal closed'}
            onClick={closeMemoryCardModal}
        >
            <div
                className='content'
                onClick={e => e.stopPropagation()}
            >
                <div className='title'>
                    <h3>Створіть свій спогад!</h3>
                </div>
                <div className='values'>
                    <form onSubmit={handleSubmitForm} className='form'>
                        <div className='value-box'>
                            <input
                                className='title-text'
                                type='text'
                                placeholder={'Назва спогаду'}
                                value={memoryNameValue}
                                onChange={e => setMemoryNameValue(e.target.value)}
                            />
                            <div className={nameIsWarning ? 'warning-text' : 'warning-text closed'}>
                                {nameWarningText}
                            </div>
                        </div>
                        <div className='value-box'>
                            <input
                                className='img-file'
                                type='file'
                                accept=".jpg, .jpeg, .png, .svg, .gif"
                                value={memoryImgValue}
                                onChange={handleFileInputChange}
                            />
                            <div className={imgIsWarning ? 'warning-text' : 'warning-text closed'}>
                                {imgWarningText}
                            </div>
                        </div>
                        <div className='value-box'>
                            <div className='memory-rating'>
                                <input type="radio" id="rate-5" name='rate-5' value="5"
                                       checked={ratingFive}
                                       onChange={currentRatingIsFive}
                                />
                                <label htmlFor="rate-5" title="Оцінка «5»">
                                    <img src={imgRatingStar} alt=''/>
                                </label>
                                <input type="radio" id="rate-4" name='rate-4' value="4"
                                       checked={ratingFour}
                                       onChange={currentRatingIsFour}
                                />
                                <label htmlFor="rate-4" title="Оцінка «4»">
                                    <img src={imgRatingStar} alt=''/>
                                </label>
                                <input type="radio" id="rate-3" name='rate-3' value="3"
                                       checked={ratingThree}
                                       onChange={currentRatingIsThree}
                                />
                                <label htmlFor="rate-3" title="Оцінка «3»">
                                    <img src={imgRatingStar} alt=''/>
                                </label>
                                <input type="radio" id="rate-2" name='rate-2' value="2"
                                       checked={ratingTwo}
                                       onChange={currentRatingIsTwo}
                                />
                                <label htmlFor="rate-2" title="Оцінка «2»">
                                    <img src={imgRatingStar} alt=''/>
                                </label>
                                <input type="radio" id="rate-1" name='rate-1' value="1"
                                       checked={ratingOne}
                                       onChange={currentRatingIsOne}
                                />
                                <label htmlFor="rate-1" title="Оцінка «1»">
                                    <img src={imgRatingStar} alt=''/>
                                </label>
                            </div>
                            <div className={rateIsWarning ? 'warning-text' : 'warning-text closed'}>
                                {rateWarningText}
                            </div>
                        </div>
                        <div className='btn-confirm-box'>
                            <button
                                className='btn-confirm'
                                type='submit'
                            >
                                Підтвердити
                            </button>
                        </div>
                    </form>
                </div>
                {/*{previewImg && (*/}
                {/*    <div style={{width: 100, height: 100}}>*/}
                {/*        <img src={previewImg} alt='chosenImg'/>*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        </div>
    );
};

export default CreateMemory;