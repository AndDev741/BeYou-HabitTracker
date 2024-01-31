import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./views/login/loginSlice";
import perfilSlice from "./views/pages/dashboard/perfil/perfilSlice";
import habitsSlice from "./views/pages/habits/habitsSlice";
import categoriesSlice from "./views/pages/categories/categoriesSlice";

const rootReducer = combineReducers({
    login: loginSlice,
    perfil: perfilSlice,
    habits: habitsSlice,
    categories: categoriesSlice,
})

export default rootReducer;