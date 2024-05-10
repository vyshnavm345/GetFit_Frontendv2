import { configureStore } from "@reduxjs/toolkit";
import userReducer from 'features/user';
import trainerReducer from 'features/trainer';
import lessonReducer from 'features/lessons';
import programReducer from 'features/program';
import chatReducer from 'features/chat';
import webSocketReducer from 'features/webSocketSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    trainer: trainerReducer,
    lesson: lessonReducer,
    program: programReducer,
    chat: chatReducer,
    websocket: webSocketReducer,
    
  },
  devTools: process.env.NODE_ENV !== "production",
});