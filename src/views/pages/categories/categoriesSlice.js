import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    editModeOn: false,
    name: '',
    icon_index: '',
    level: '',
    xp: '',
    id: '',
    status: 'idle',
    error: null,
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        editMode(state, action){
            const editModeOn = action.payload;
            state.editModeOn = editModeOn;
        },
        editName(state, action){
            const name = action.payload;
            state.name = name;
        },
        editIconIndex(state, action){
            const icon_index = action.payload;
            state.icon_index = icon_index;
        },
        editLevel(state, action){
            const level = action.payload;
            state.level = level;
        },
        editXp(state, action){
            const xp = action.payload;
            state.xp = xp;
        },
        getCategoryId(state, action){
            const id = action.payload;
            state.id = id
        }
    }
})

export const { editMode, editName, editIconIndex, editLevel, editXp, getCategoryId} = categoriesSlice.actions;
export default categoriesSlice.reducer;