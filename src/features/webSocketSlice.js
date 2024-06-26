import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WS_link } from "config";
import axiosInstance from "utils/axiosInstance";

const initialState = {
  wsUrl: null,
  loading: false,
  error: null,
  notifications: [],
  onlineusers: [],
};

// get the ids of online users
export const getOnlineUserIds = createAsyncThunk(
  "user/getOnlineUserIds",
  async (_, thunkAPI) => {
    try {
        const response = await axiosInstance.get('api/chat/getOnlineUserIDs/');
        if (response.status === 200) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);




const webSocketSlice = createSlice({
  name: "webSocket",
  initialState,
  reducers: {
    initializeWebSocket: (state, action) => {
      state.wsUrl = `${WS_link}/ws/notification/link${action.payload}/`;
    },
    closeWebSocket: (state) => {
      state.wsUrl = null;
      state.notifications = []; // Reset notifications when closing the WebSocket
    },
    addNotification(state, action) {
      state.notifications.push(action.payload);
    },
    addOnlineusers: (state, action) => {
      state.onlineusers = [...state.onlineusers, action.payload];
    },
    removeOnlineusers: (state, action) => {
      state.onlineusers = state.onlineusers.filter(user => user !== action.payload);
    },
  },
   extraReducers: builder => {
        builder
          .addCase(getOnlineUserIds.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(getOnlineUserIds.fulfilled, (state, action) => {
            state.loading = false;
            state.onlineusers = [
              ...state.onlineusers,
              ...action.payload.online_user_ids,
            ];
          })
          .addCase(getOnlineUserIds.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
    }
});

export const {
  initializeWebSocket,
  closeWebSocket,
  addNotification,
  addOnlineusers,
  removeOnlineusers,
} = webSocketSlice.actions;
export default webSocketSlice.reducer;


