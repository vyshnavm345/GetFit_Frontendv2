import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "utils/axiosInstance";

const initialState = {
  loading: false,
  error: null,
  message: null,
  conversation: null,
  pendingNotifications:[],
};

//get all the messages of a chat room
export const getMessages = createAsyncThunk(
  "chat/getMessages",
  async (room, thunkAPI) => {
    console.log("The room no inside the slice is", room)
    try {
      const response = await axiosInstance.get(
        `/api/chat/getMessages/${room}/`
      );

      if (response.status === 200) {
        console.log("These are the conversation response : ", response.data);
        return response.data;
      } else {
        console.log("the error : ", response.data);
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      console.log("the catched error : ", error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// retrive pending notificaions upon login
export const getNotifications = createAsyncThunk(
  "chat/getNotifications",
  async (_, thunkAPI) => {
    try {
      console.log("get notifications triggered")
      const response = await axiosInstance.get("/api/chat/getNotifications");
      if (response.status === 200){
        return response.data
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)


const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addToPendingNotifications: (state, action) => {
      state.pendingNotifications = [
        ...state.pendingNotifications,
        action.payload,
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.conversation = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload);
      })
      .addCase(getNotifications.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingNotifications = action.payload;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload);
      });
  },
});

export const { addToPendingNotifications } = chatSlice.actions;
export default chatSlice.reducer;
