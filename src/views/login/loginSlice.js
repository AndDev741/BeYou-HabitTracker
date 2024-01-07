import { createSlice } from "@reduxjs/toolkit";

function saveState(state){
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem('redux-user-state', serializedState);
    }catch(err){
        console.error(err);
    }
};

function loadState(){
    try{
        const serializedState = localStorage.getItem('redux-user-state');
        if(serializedState === null){
            return undefined;
        }
        return JSON.parse(serializedState);
    }catch(err){
        console.error(err);
    }
}

const initialState = loadState() || {
    email: '',
    logged: false
};

const perfilSlice = createSlice({
    name: 'logged',
    initialState,
    reducers: {
        emailEnter(state, action){
            const email = action.payload;
            saveState(state);
            return {...state, email}
            
        },
        isLogged(state, action){
            const logged = action.payload;
            saveState(state);
            return {...state, logged}
            
        },
        logout(state){
            state.email = '';
            state.logged = false;
        }
    }
});

export const { emailEnter, isLogged, logout} = perfilSlice.actions;
export default perfilSlice.reducer;
