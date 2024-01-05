import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./views/login/loginSlice";
import perfilSlice from "./views/pages/dashboard/perfil/perfilSlice";

const rootReducer = combineReducers({
    login: loginSlice,
    perfil: perfilSlice,
})

export default rootReducer;