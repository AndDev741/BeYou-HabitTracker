import { createSlice } from "@reduxjs/toolkit";
//Criar lógica para armazenar o email no navegador;
const initialState = {
    editModeOn: false,
    name: '',
    importance: '',
    dificulty: '',
    category: '',
    weekDays: '',
    description: '',
    id: '',
    status: 'idle',
    error: null,
}

const habitsSlice = createSlice({
    name: 'habits',
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
        getHabitId(state, action){
            const id = action.payload;
            state.id = id
        }
    }
})

export const { editMode, editName, editImportance, editDificulty, editCategory, editWeekDays, editDescription, getHabitId } = habitsSlice.actions;
export default habitsSlice.reducer;