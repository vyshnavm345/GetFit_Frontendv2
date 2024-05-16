import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "utils/axiosInstance";
import { getAllUsers } from "./user";
import { getAllTrainers } from "./trainer";

const initialState = {
  loading: false,
};

// change user access (block and unblock)
export const changeUserAccess = createAsyncThunk(
  "admin/changeUserAccess",
  async ({ id, role }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `api/users/changeUserAccess/${id}/`
      );
      if (response.status === 200) {
        console.log(
          "The response for changing user access is : ",
          response.data
        );

        const { dispatch } = thunkAPI;
        if (role == "user") {
          dispatch(getAllUsers());
        } else if (role === "trainer") {
          dispatch(getAllTrainers());
        }
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeUserAccess.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(changeUserAccess.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.message)
      })
      .addCase(changeUserAccess.rejected, (state, action) => {
        state.loading = false;
        console.error(action.payload)
      });
  },
});

// export const { } = adminSlice.actions;
export default adminSlice.reducer;
