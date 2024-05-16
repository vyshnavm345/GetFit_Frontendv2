import { configureStore } from "@reduxjs/toolkit";
import userReducer from 'features/user';
import trainerReducer from 'features/trainer';
import lessonReducer from 'features/lessons';
import programReducer from 'features/program';
import chatReducer from 'features/chat';
import webSocketReducer from 'features/webSocketSlice';
import paypalReducer from 'features/paypalSlice'
import adminReducer from 'features/admin'

export const store = configureStore({
  reducer: {
    user: userReducer,
    trainer: trainerReducer,
    lesson: lessonReducer,
    program: programReducer,
    chat: chatReducer,
    websocket: webSocketReducer,
    paypal: paypalReducer,
    admin:adminReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});