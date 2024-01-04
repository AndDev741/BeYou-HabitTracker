import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: '',
    logged: false
}

const perfilSlice = createSlice({
    name: 'logged',
    initialState,
    reducers: {
        emailEnter(state, action){
            const email = action.payload;
            state.email = email;
        },
        isLogged(state, action){
            const logged = action.payload;
            state.logged = logged;
        },
        logout(state){
            state.email = '';
            state.logged = false;
        }
    }
});

export const { emailEnter, isLogged, logout} = perfilSlice.actions;
export default perfilSlice.reducer;
