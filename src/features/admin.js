import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "utils/axiosInstance";
import { getAllUsers } from "./user";
import { getAllTrainers, getprogrammeslist } from "./trainer";
import axios from "axios";
import { API_URL } from "config";

const initialState = {
  loading: false,
  allPrograms: [],
  publishRequests: [],
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

        const { dispatch } = thunkAPI;
        if (role === "user") {
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


// get all the programmes
export const retrive_all_programs = createAsyncThunk(
  "trainer/retrive_all_programs",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/api/fitness_programs/retrive_all_programs/`
      );

      if (response.status === 200) {
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


// get all the publish requests from trainers
export const getPublishRequests = createAsyncThunk(
  "trainer/getPublishRequests",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/api/fitness_programs/getPublishRequests/`
      );

      if (response.status === 200) {
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



// change publish status of a program between (block and publish)
export const changePublishStatus = createAsyncThunk(
  "admin/changePublishStatus",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `api/fitness_programs/changePublishStatus/${id}/`
      );
      if (response.status === 200) {
        console.log(
          "The response for changing publish status is : ",
          response.data
        );

        const { dispatch } = thunkAPI;
        dispatch(retrive_all_programs());
        // if (role == "user") {
        //   dispatch(getAllUsers());
        // } else if (role === "trainer") {
        //   dispatch(getAllTrainers());
        // }
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);



// change publish status of a program between (block and publish)
export const publishprogram = createAsyncThunk(
  "admin/publishprogram",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `api/fitness_programs/publishprogram/${id}/`
      );
      if (response.status === 200) {
        
        const { dispatch } = thunkAPI;
        dispatch(getPublishRequests());
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
        toast.success(action.payload.message);
      })
      .addCase(changeUserAccess.rejected, (state, action) => {
        state.loading = false;
        console.error(action.payload);
      })
      .addCase(changePublishStatus.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(changePublishStatus.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.messsage);
      })
      .addCase(changePublishStatus.rejected, (state, action) => {
        state.loading = false;
        console.error(action.payload);
      })
      .addCase(retrive_all_programs.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(retrive_all_programs.fulfilled, (state, action) => {
        state.loading = false;
        state.allPrograms = action.payload;
      })
      .addCase(retrive_all_programs.rejected, (state, action) => {
        state.loading = false;
        console.error(action.payload);
      })
      .addCase(getPublishRequests.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPublishRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.publishRequests = action.payload;
      })
      .addCase(getPublishRequests.rejected, (state, action) => {
        state.loading = false;
        console.error(action.payload);
      })
      .addCase(publishprogram.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(publishprogram.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.message)
      })
      .addCase(publishprogram.rejected, (state, action) => {
        state.loading = false;
        console.error(action.payload);
      });
  },
});

// export const { } = adminSlice.actions;
export default adminSlice.reducer;
