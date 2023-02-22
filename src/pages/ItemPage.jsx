import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useActions} from "../hooks/useActions";
import ItemRating from "../components/ItemPage/ItemRating";
import imgSticker from "../img/sticker.svg";
import {deleteMemory, fetchSelectedMemory, setMemory, setMemoryImg} from "../http/memoriesAPI";
import imgBtnEdit from "../img/btn-edit.svg";
import {useNavigate} from "react-router-dom";
import {ROUTE_MEMORY} from "../utils/consts";


const ItemPage = () => {
    const navigate = useNavigate()
    const {selectedMemory} = useSelector(state => state.memoryReducer)
    const {
        setSelectedMemory,
        setSelectedMemoryName,
        setSelectedMemoryDescription
    } = useActions()

    useEffect(() => {
        fetchSelectedMemory(Number(localStorage.getItem('itemId'))).then(data => setSelectedMemory(data))
    }, [])

    const [fileValue, setFileValue] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const handleEdit = () => {
        setIsEdit(!isEdit)
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        if (fileValue) {
            setMemoryImg(fileValue[0]).then(data => {
                const memory = {
                    title: selectedMemory.title,
                    description: selectedMemory.description,
                    rating: selectedMemory.rating,
                    img: data.url,
                    categoryId: Number(localStorage.getItem('categoryId'))
                }
                setMemory(selectedMemory.id, memory).then(data => setSelectedMemory(data))
            })
            return
        }
        const memory = {
            title: selectedMemory.title,
            description: selectedMemory.description,
            rating: selectedMemory.rating,
            img: selectedMemory.img,
            categoryId: Number(localStorage.getItem('categoryId'))
        }
        setMemory(selectedMemory.id, memory).then(data => setSelectedMemory(data))
    }

    const removeMemory = (id) => {
        deleteMemory(id).then(() => navigate(ROUTE_MEMORY))
    }

    return (
        <div className='item-page'>
            <div className='item-card'>
                <form onSubmit={handleSubmitForm}>
                    <div className='item-card__content-top'>
                        <div className='content-top__img'>
                            <img
                                src={selectedMemory.img}
                                alt={selectedMemory.name}
                            />
                            <div className='btn-box'>
                                <div
                                    className='btn-edit'
                                    onClick={handleEdit}
                                >
                                    <img src={imgBtnEdit} alt=''/>
                                </div>
                                {isEdit &&
                                    <div className='btn-edit-box'>
                                        <button
                                            className='btn-confirm'
                                            type='submit'
                                        >
                                            Підтвердити
                                        </button>
                                        <button
                                            className='btn-delete'
                                            onClick={() => setIsDeleteOpen(true)}
                                        >
                                            Видалити
                                        </button>
                                    </div>
                                }
                            </div>
                            {isEdit
                                &&
                                <input
                                    type='file'
                                    accept=".jpg, .jpeg, .png, .gif, .svg"
                                    onChange={e => setFileValue(e.target.files)}
                                />
                            }
                        </div>
                    </div>
                    <div className='item-card__content-bottom'>
                        <div className='content-bottom__text'>
                            <textarea
                                readOnly={!isEdit}
                                value={selectedMemory.title}
                                onChange={e => setSelectedMemoryName(e.target.value)}
                            />
                        </div>
                        <div className='description'>
                            <textarea
                                readOnly={!isEdit}
                                placeholder='Надайте детальний опис'
                                value={selectedMemory.description}
                                onChange={e => setSelectedMemoryDescription(e.target.value)}
                            />
                        </div>
                        <div className='content-bottom__rating'>
                            <ItemRating />
                        </div>
                    </div>
                    <div>
                        <img className='left-sticker' src={imgSticker} alt=''/>
                    </div>
                    <div>
                        <img className='right-sticker' src={imgSticker} alt=''/>
                    </div>
                </form>
            </div>
            <div className={isDeleteOpen ? 'delete-box' : 'delete-box closed'}>
                <button
                    className='btn-close'
                    onClick={() => setIsDeleteOpen(false)}
                >
                    x
                </button>
                <p className='delete-box__text top'>Ви впевнені, що хочете видалити спогад?</p>
                <div className='isDelete-box'>
                    <button
                        className='btn-yes'
                        onClick={() => {
                            setIsDeleteOpen(false)
                            removeMemory(selectedMemory.id)
                            setIsEdit(false)
                        }}
                    >
                        Так
                    </button>
                    <button
                        className='btn-no'
                        onClick={() =>
                            setIsDeleteOpen(false)
                        }
                    >
                        Ні
                    </button>
                </div>
                <p className='delete-box__text bottom'>*Якщо ви видалите спогад, він зникне назавжди*</p>
            </div>
        </div>
    );
};

export default ItemPage;