import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./views/login/loginSlice";
import perfilSlice from "./views/pages/dashboard/perfil/perfilSlice";
import habitsSlice from "./views/pages/habits/habitsSlice";

const rootReducer = combineReducers({
    login: loginSlice,
    perfil: perfilSlice,
    habits: habitsSlice,
})

export default rootReducer;