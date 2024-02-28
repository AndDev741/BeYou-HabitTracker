import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    editModeOn: false,
    name: '',
    importance: '',
    dificulty: '',
    category: '',
    description: '',
    id: '',
    status: 'idle',
    error: null,
}

const tasksSlice = createSlice({
    name: 'tasks',
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
        editImportance(state, action){
            const importance = action.payload;
            state.importance = importance;
        },
        editDificulty(state, action){
            const dificulty = action.payload;
            state.dificulty = dificulty;
        },
        editCategory(state, action){
            const category = action.payload;
            state.category = category;
        },
        editWeekDays(state, action){
            const weekDays = action.payload;
            state.weekDays = weekDays;
        },
        editDescription(state, action){
            const description = action.payload;
            state.description = description;
        },
        getTaskId(state, action){
            const id = action.payload;
            state.id = id
        }
    }
})

export const { editMode, editName, editImportance, editDificulty, editCategory, editWeekDays, editDescription, getTaskId } = tasksSlice.actions;
export default tasksSlice.reducer;