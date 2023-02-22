import {combineReducers} from "redux";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import thunk from "redux-thunk";

export const rootReducer = combineReducers(reducers)

export default configureStore({
    reducer: rootReducer,
    middleware: [thunk]
})