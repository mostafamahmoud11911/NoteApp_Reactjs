import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./auth/AuthSlice";
import { notesReducer } from "./noteSlice";



const store = configureStore({
    reducer:{
        auth: AuthSlice,
        notes: notesReducer
    }
});

export default store;