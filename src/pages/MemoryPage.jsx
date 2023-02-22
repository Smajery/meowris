import React, {useEffect, useRef, useState} from 'react';
import MemoryItem from "../components/MemoryPage/MemoryItem";
import {useSelector} from "react-redux";
import {useActions} from "../hooks/useActions";
import MemorySelect from "../components/MemoryPage/MemorySelect";
import imgFish from "../img/fish.svg";
import imgFishBones from "../img/fish-bones.svg";
import imgCatBtnAdd from "../img/cat-btn-add.svg";
import imgBtnEdit from "../img/btn-edit.svg";
import {fetchCategories, setCategory} from "../http/categoriesAPI";
import CreateCategory from "../components/modals/CreateCategory";
import {fetchSelectedMemories} from "../http/memoriesAPI";
import CreateMemory from "../components/modals/CreateMemory";
import Loader from "../components/UI/Loader/Loader";

const MemoryPage = () => {
    const {
        categories,
        selectedMemories,
        selectedCategory,
        isLoading,
    } = useSelector(state => state.memoryReducer)

    const {
        user
    } = useSelector(state => state.authReducer)

    const {
        setCategories,
        setSelectedMemories,
        setSelectedCategory,
        setSelectedCategoryName,
        removeCategory,
        sortSelectedMemories,
        setIsCategoryNameModal,
        setIsMemoryCardModal,
    } = useActions()

    const [isEdit, setIsEdit] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const categoryTitleName = useRef(null)

    const handleEdit = () => {
        setIsEdit(!isEdit)
        if(!isEdit) {
            categoryTitleName.current.focus()
        }
    }

    const updateCategory = () => {
        const category = {
            title: selectedCategory.title,
            userId: user.id
        }
        setCategory(selectedCategory.id, category).then(data => {
            setSelectedCategory(data)
            setIsEdit(false)
        })
    }

    useEffect(() => {
        fetchCategories(user.id).then(data => setCategories(data))
        if (selectedCategory.id) {
            fetchSelectedMemories(selectedCategory.id).then(data => setSelectedMemories(data))
        }
    }, [selectedCategory.id])


    return (
        <div className='memory-page'>
            <div className='memories-book'>
                <div className='categories-bar'>
                    <div className='categories-list'>
                        <div className='title'>
                            {categories
                                ?
                                <div><h3>Ваш список</h3></div>
                                :
                                <div><h3>Ваш список пуст</h3></div>
                            }
                        </div>
                        <div className='categories'>
                            {categories.map(category =>
                                <div
                                    className={category.id === selectedCategory.id ? 'category-name active' : 'category-name'}
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    <img
                                        src={category.id === selectedCategory.id ? imgFishBones : imgFish}
                                        alt=''
                                        width={45}
                                        height={45}
                                    />
                                    <div className='text'>
                                        {category.title
                                            ?
                                            category.title
                                            :
                                            'Назва категорії'
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='btn-add-box'>
                        <div className='btn-and-cat'>
                            <img
                                src={imgCatBtnAdd}
                                alt=''
                            />
                            <button
                                className='btn-add'
                                onClick={() => setIsCategoryNameModal(true)}
                            >
                                Додати
                            </button>
                        </div>
                    </div>
                </div>
                <div className='memories-bar'>
                    {selectedCategory.id
                        ?
                        <div className='title'>
                            <MemorySelect
                                defaultValue='Сортування'
                                sortSelectedMemories={sortSelectedMemories}
                            />
                            <div className='name'>
                                <input
                                    ref={categoryTitleName}
                                    readOnly={!isEdit}
                                    type='text'
                                    placeholder='Назва категорії'
                                    maxLength={22}
                                    value={selectedCategory.title}
                                    onChange={e => setSelectedCategoryName(e.target.value)}
                                />
                            </div>
                            <div className='btn-box'>
                                <div
                                    className='btn-edit'
                                    onClick={handleEdit}
                                >
                                    <img src={imgBtnEdit} alt=''/>
                                </div>
                                {isEdit &&
                                    <div className='btn-box-hidden'>
                                        <button
                                            className='btn-confirm'
                                            onClick={updateCategory}
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
                        </div>
                        :
                        <div className='title'>
                            <div className='name'>
                                Ви не обрали жодної категорії
                            </div>
                        </div>
                    }
                    {selectedCategory.id
                        &&
                        <div className='memories-list'>
                            <div className='memories'>
                                {selectedMemories.map(memory =>
                                    <MemoryItem
                                        key={memory.id}
                                        memory={memory}
                                        selectedCategoryName={selectedCategory.name}
                                    />
                                )}
                                {isLoading && <Loader/>}
                            </div>
                            <div className='btn-add-box'>
                                <button
                                    className='btn-add'
                                    onClick={() => setIsMemoryCardModal(true)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className={isDeleteOpen ? 'delete-box' : 'delete-box closed'}>
                <button
                    className='btn-close'
                    onClick={() => setIsDeleteOpen(false)}
                >
                    x
                </button>
                <p className='delete-box__text top'>Ви впевнені, що хочете видалити категорію?</p>
                <div className='isDelete-box'>
                    <button
                        className='btn-yes'
                        onClick={() => {
                            setIsDeleteOpen(false)
                            removeCategory(selectedCategory.id, true)
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
                <p className='delete-box__text bottom'>*Якщо ви видалите категорію, то всі ваші спогади втечуть теж*</p>
            </div>
            <CreateCategory/>
            <CreateMemory/>
        </div>
    );
};

export default MemoryPage;