import {memorySlice} from "./MemorySlice";
import {createCategory, deleteCategory} from "../../../http/categoriesAPI";
import {createMemory} from "../../../http/memoriesAPI";

export const MemoryActionCreator = {
    setCategories: (categories) => dispatch => {
        dispatch(memorySlice.actions.setCategories(categories))
    },
    addCategory: (name, userId) => dispatch => {
        try {
            const category = {
                title: name,
                userId: userId,
            }
            createCategory(category).then(data => dispatch(memorySlice.actions.addCategory(data)))
        } catch (e) {
            console.log(e.response.data.message)
        }
    },
    removeCategory: (id, result) => dispatch => {
        try {
            if (result) {
                deleteCategory(id).then(data => dispatch(memorySlice.actions.removeCategory(data)))
            }
        } catch (e) {
            console.log(e.response.data.message)
        }
    },
    setSelectedCategory: (selectedCategory) => dispatch => {
        localStorage.removeItem('categoryId')
        dispatch(memorySlice.actions.setSelectedCategory(selectedCategory))
        localStorage.setItem('categoryId', selectedCategory.id)
    },
    setSelectedCategoryName: (name) => dispatch => {
        dispatch(memorySlice.actions.setSelectedCategoryName(name))
        dispatch(memorySlice.actions.setCategoryName(name))
    },

    setSelectedMemories: (memories) => dispatch => {
        dispatch(memorySlice.actions.setSelectedMemories(memories))
    },
    setSelectedMemory: (memory) => dispatch => {
        dispatch(memorySlice.actions.setSelectedMemory(memory))
    },
    addMemory: (name, rate, imgFile, selectedCategoryId) => dispatch => {
        const memory = {
            title: name,
            description: '',
            rating: rate,
            img: imgFile,
            categoryId: selectedCategoryId,
        }
        createMemory(memory).then(data =>
        {
            dispatch(memorySlice.actions.addMemory(data))
            dispatch(MemoryActionCreator.setIsLoading(false))
        })
    },

    setIsLoading: (boolean) => dispatch => {
        dispatch(memorySlice.actions.setIsLoading(boolean))
    },


    setIsCategoryNameModal: (boolean) => dispatch => {
        dispatch(memorySlice.actions.setIsCategoryNameModal(boolean))
    },
    setIsMemoryCardModal: (boolean) => dispatch => {
        dispatch(memorySlice.actions.setIsMemoryCardModal(boolean))
    },


    setSelectedMemoryName: (name) => dispatch => {
        dispatch(memorySlice.actions.setSelectedMemoryName(name))
    },
    setSelectedMemoryDescription: (description) => dispatch => {
        dispatch(memorySlice.actions.setSelectedMemoryDescription(description))
    },
    setSelectedMemoryRating: (rating) => dispatch => {
        dispatch(memorySlice.actions.setSelectedMemoryRating(rating))
    },


    setSelectedSort: (sort) => dispatch => {
        dispatch(memorySlice.actions.setSelectedSort(sort))
    },
    sortSelectedMemories: (sort) => dispatch => {
        try {
            dispatch(MemoryActionCreator.setSelectedSort(sort))
            dispatch(memorySlice.actions.sortSelectedMemories(sort))
        } catch (e) {
            console.log(e)
        }
    }
}