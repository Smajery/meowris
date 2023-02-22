import React, {useState} from 'react';
import {useActions} from "../../hooks/useActions";
import {useSelector} from "react-redux";

const CreateCategory = () => {
    const {isCategoryNameModal, categories} = useSelector(state => state.memoryReducer)
    const {user} = useSelector(state => state.authReducer)
    const {addCategory, setIsCategoryNameModal} = useActions()

    const [categoryNameValue, setCategoryNameValue] = useState('')
    const [isWarning, setIsWarning] = useState(false)
    const [warningValue, setWarningValue] = useState('')

    const closeCategoryNameModal = () => {
        setIsCategoryNameModal(false)
        setCategoryNameValue('')
    }
    const confirmAddCategory = () => {
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].title === categoryNameValue) {
                setWarningValue("Така назва вже існує")
                setIsWarning(true)
                return false
            }
        }
        if (!categoryNameValue) {
            setWarningValue("Назва обов'язкова")
            setIsWarning(true)
            return false
        }
        setIsWarning(false)
        addCategory(categoryNameValue, user.id)
        setCategoryNameValue('')
        setIsCategoryNameModal(false)
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        confirmAddCategory()
    }


    return (
        <div
            className={isCategoryNameModal ? 'category-name__modal' : 'category-name__modal closed'}
            onClick={closeCategoryNameModal}
        >
            <div
                className='content'
                onClick={e => e.stopPropagation()}
            >
                <div className='title'>
                    <h3>Як ви хочете назвати категорію?</h3>
                </div>
                <div className='form-box'>
                    <form onSubmit={handleSubmitForm}>
                        <input
                            type='text'
                            placeholder={'Назва категорії'}
                            value={categoryNameValue}
                            onChange={e => setCategoryNameValue(e.target.value)}
                        />
                        <div className='btn-confirm-box'>
                            <div className={isWarning ? 'warning-text' : 'warning-text closed'}>
                                {warningValue}
                            </div>
                            <button
                                className='btn-confirm'
                                type='submit'
                            >
                                Підтвердити
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCategory;