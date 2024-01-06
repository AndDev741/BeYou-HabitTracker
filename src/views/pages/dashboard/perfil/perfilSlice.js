import { createSlice } from "@reduxjs/toolkit";
//Criar lógica para armazenar o email no navegador;
const initialState = {
    name: '',
    text: '',
    author: '',
    constance: 0,
    img_link: '',
    status: 'idle',
    error: null,
}

const perfilSlice = createSlice({
    name: 'perfil',
    initialState,
    reducers: {
        nameEnter(state, action){
            const name = action.payload;
            state.name = name;
        },
        textEnter(state, action){
            const text = action.payload;
            state.text = text;
        },
        authorEnter(state, action){
            const author = action.payload;
            state.author = author;
        },
        constanceEnter(state, action){
            const constance = action.payload;
            state.constance = constance;
        },
        img_linkEnter(state, action){
            const img_link = action.payload;
            state.img_link = img_link;
        },
    }
})

export const { nameEnter, textEnter, authorEnter, constanceEnter, img_linkEnter } = perfilSlice.actions;
export default perfilSlice.reducer;