import { configureStore } from "@reduxjs/toolkit";
import userReducer from 'features/user';
import trainerReducer from 'features/trainer';
import lessonReducer from 'features/lessons';
import programReducer from 'features/program'


export const store = configureStore({
  reducer: {
    user: userReducer,
    trainer: trainerReducer,
    lesson: lessonReducer,
    program: programReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});