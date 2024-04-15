import { configureStore } from "@reduxjs/toolkit";
import userReducer from 'features/user';
import trainerReducer from 'features/trainer';

export const store = configureStore({
    reducer: {
        user: userReducer,
        trainer: trainerReducer,
    },
    devTools: process.env.NODE_ENV !== 'production'
});