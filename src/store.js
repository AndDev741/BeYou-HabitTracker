import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";

const store = configureStore({
    reducer: {
        reducer: rootReducer,
        enhancers: [composeWithDevTools()],
    }
})

export default store;