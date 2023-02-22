import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    selectedCategory: {},
    memories: [],
    selectedMemories: [],
    selectedMemory: {},
    options: [
        {name: 'За назвою', value: 'name'},
        {name: 'За спаданням', value: 'ratingDown'},
        {name: 'За зростанням', value: 'ratingUp'},
    ],
    selectedSort: '',
    isLoading: false,
    isCategoryNameModal: false,
    isMemoryCardModal: false,
    currentPage: 1,
    totalCountMemories: 0,
}
export const memorySlice = createSlice({
    name: 'memory',
    initialState,
    reducers: {
        setCategories(state, action) {
          state.categories = action.payload
        },
        addCategory(state, action) {
            state.categories = [...state.categories, action.payload]
        },
        removeCategory(state, action) {
            state.categories = state.categories.filter(category => category.id !== action.payload)
            state.selectedCategory = {}
        },
        setSelectedCategory(state, action) {
            state.selectedCategory = action.payload
        },
        setSelectedCategoryName(state, action) {
            state.selectedCategory.title = action.payload
        },
        setCategoryName(state, action) {
            for (let i = 0; i < state.categories.length; i++) {
                if (state.categories[i].id === state.selectedCategory.id) {
                    state.categories[i].title = action.payload
                }
            }
        },


        setMemories(state, action) {
            state.memories = action.payload
        },
        setSelectedMemories(state, action) {
            state.selectedMemories = action.payload
        },
        addMemory(state, action) {
            state.selectedMemories = [...state.selectedMemories, action.payload]
        },
        setSelectedMemory(state, action) {
            state.selectedMemory = action.payload
        },

        setIsLoading(state, action) {
            state.isLoading = action.payload
        },


        setSelectedMemoryName(state, action) {
            state.selectedMemory.title = action.payload
            for(let i = 0; i < state.categories.length; i++ ) {
                if (state.categories[i].id === state.selectedMemory.id) {
                    state.categories[i].title = action.payload
                }
            }
        },
        setSelectedMemoryDescription(state, action) {
            state.selectedMemory.description = action.payload
            for(let i = 0; i < state.categories.length; i++ ) {
                if (state.categories[i].id === state.selectedMemory.id) {
                    state.categories[i].description = action.payload
                }
            }
        },
        setSelectedMemoryRating(state, action) {
            state.selectedMemory.rating = action.payload
            for(let i = 0; i < state.categories.length; i++ ) {
                if (state.categories[i].id === state.selectedMemory.id) {
                    state.categories[i].rating = action.payload
                }
            }
        },


        setIsCategoryNameModal(state, action) {
            state.isCategoryNameModal = action.payload
        },
        setIsMemoryCardModal(state, action) {
            state.isMemoryCardModal = action.payload
        },


        setSelectedSort(state, action) {
            state.selectedSort = action.payload
        },
        sortSelectedMemories(state, action) {
            if(action.payload === 'name'){
                state.selectedMemories = state.selectedMemories.sort((a, b) => a['title'].localeCompare(b['title']))
            }
            if(action.payload === 'ratingDown'){
                state.selectedMemories = state.selectedMemories.sort((a, b) => b['rating'] - a['rating'])
            }
            if(action.payload === 'ratingUp'){
                state.selectedMemories = state.selectedMemories.sort((a, b) => a['rating'] - b['rating'])
            }
        }
    }
})
export default memorySlice.reducer