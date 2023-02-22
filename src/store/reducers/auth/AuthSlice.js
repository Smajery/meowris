import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    user: {},
    logMessage: '',
    regMessage: '',
    isError: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth(state, action) {
          state.isAuth = action.payload
        },
        setUser(state, action) {
            state.user = action.payload
        },
        setUserImg(state, action) {
            state.user = {...state.user, img: action.payload}
        },
        setLogMessage(state, action) {
            state.logMessage = action.payload
        },
        setRegMessage(state, action) {
            state.regMessage = action.payload
        },
        setIsError(state, action) {
            state.isError = action.payload
        }
    }
})

export default authSlice.reducer;
