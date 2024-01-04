import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./views/login/loginSlice";

const rootReducer = combineReducers({
    login: loginSlice,
})

export default rootReducer;