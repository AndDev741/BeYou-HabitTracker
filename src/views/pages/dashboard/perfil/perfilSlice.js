import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    name: '',
    link_img: '',
    text: '',
    author: '',
    constance: 0,
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
        }
    }
})

export const { nameEnter } = perfilSlice.actions;
export default perfilSlice.reducer;