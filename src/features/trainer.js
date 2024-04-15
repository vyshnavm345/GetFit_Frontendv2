import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "config/index";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axiosInstance from "utils/axiosInstance";


const initialState = {
  loading: false,
  error: null,
  message: null,
  trainer: null
};

export const addTrainer = createAsyncThunk("trainer/add", async (payload, thunkAPI)=> {
    try {
        console.log("addTrainer dispatched");
        console.log("the payload : ", payload);
        const response = await axiosInstance.post(
          "/api/trainers/TrainerProfileCreation/",
          payload,
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );

        if (response.status === 201) {
            console.log("the response : ", response.data);
          return response.data;
        } else {
            console.log("the error : ", response.data);
          return thunkAPI.rejectWithValue(response.data);
        }
    } catch (error) {
        console.log("the catched error : ", error.response.data);
        return thunkAPI.rejectWithValue(error.response.data);
    }
});


export const getTrainer = createAsyncThunk(
    "trainer/get",
    async (_, thunkAPI) => {
        try {
        console.log("getTrainer  dispatched inside slice");
        const response = await axiosInstance.get(
            "/api/trainers/getTrainer/"
        );

        if (response.status === 200) {
            console.log("the response : ", response.data.data);
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





const trainerSlice = createSlice({
    name: 'trainer',
    initialState,
    reducers:{

    },
    extraReducers: builder => {
        builder
          .addCase(addTrainer.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(addTrainer.fulfilled, (state, action) => {
            state.loading = false;
            toast.success(action.payload.message);
            console.log(action.payload.message);
          })
          .addCase(addTrainer.rejected, (state, action) => {
            state.loading = false;
            toast.error(action.payload);
          })
          .addCase(getTrainer.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(getTrainer.fulfilled, (state, action) => {
            state.loading = false;
            state.trainer = action.payload.data
            console.log("inside fulfilled", action.payload.data);
          })
          .addCase(getTrainer.rejected, (state, action) => {
            state.loading = false;
            toast.error(action.payload);
          });
    }
})

// export const {} = trainerSlice.actions;
export default trainerSlice.reducer