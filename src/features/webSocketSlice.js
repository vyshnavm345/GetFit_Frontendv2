import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { WS_link } from "config";

const initialState = {
    wsUrl: null,
    notifications: [],
};

const webSocketSlice = createSlice({
    name: "webSocket",
    initialState,
    reducers: {
        initializeWebSocket: (state, action) => {
        state.wsUrl = `${WS_link}/ws/notification/link${action.payload}/`;
        },
        closeWebSocket: state => {
          state.wsUrl = null;
          state.notifications = []; // Reset notifications when closing the WebSocket
        },
        addNotification(state, action) {
            state.notifications.push(action.payload);
        },
    },
});

export const { initializeWebSocket, closeWebSocket, addNotification } = webSocketSlice.actions;
export default webSocketSlice.reducer;


