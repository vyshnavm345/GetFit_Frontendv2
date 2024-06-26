import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "config";
import { toast } from "react-toastify";
import axiosInstance from "utils/axiosInstance";

const initialState = {
  loading: false,
  error: null,
  message: null,
  followedPrograms: null,
  totalProgramCount: null,
  popularPrograms:[],
  lessonProgress:[],
};


//Lets user follow a program
export const followedProgram = createAsyncThunk(
  "program/followedProgram",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/api/users/followProgram/${id}/`
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



//Lets user unfollow a program
export const unfollowProgram = createAsyncThunk(
  "program/unfollowProgram",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/api/users/unfollowProgram/${id}/`
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


// get the list of followed programs
export const getFollowedPrograms = createAsyncThunk(
  "program/getFollowedPrograms",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/api/users/getFollowedPrograms/`
      );

      if (response.status === 200) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// get total program count
export const getTotalPrograms = createAsyncThunk(
  "user/getTotalPrograms",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/fitness_programs/getProgramCount/`
      );
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



// get the most popular programms
export const getPopularPrograms = createAsyncThunk(
  "user/getPopularPrograms",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/fitness_programs/getPopularProgram/`
      );
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


// get lesson progress with user id
export const getlessonProgress = createAsyncThunk(
  "user/getlessonProgress",
  async ({user_id, lesson_id}, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/fitness_programs/getlessonProgress/${user_id}/${lesson_id}/`
      );
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



const programSlice = createSlice({
  name: "program",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFollowedPrograms.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getFollowedPrograms.fulfilled, (state, action) => {
        state.loading = false;
        state.followedPrograms = action.payload;
        // toast.success(action.payload);
      })
      .addCase(getFollowedPrograms.rejected, (state, action) => {
        state.loading = false;
        // toast.error(action.payload);
        console.error(action.payload);
      })
      .addCase(followedProgram.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(followedProgram.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload?.message);
      })
      .addCase(followedProgram.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload?.message);
      })
      .addCase(unfollowProgram.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(unfollowProgram.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload?.message);
      })
      .addCase(unfollowProgram.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload?.message);
      })
      .addCase(getTotalPrograms.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTotalPrograms.fulfilled, (state, action) => {
        state.loading = false;
        state.totalProgramCount = action.payload;
      })
      .addCase(getTotalPrograms.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload?.message);
      })
      .addCase(getPopularPrograms.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPopularPrograms.fulfilled, (state, action) => {
        state.loading = false;
        state.popularPrograms = action.payload;
      })
      .addCase(getPopularPrograms.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload?.message);
      })
      .addCase(getlessonProgress.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getlessonProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.lessonProgress = action.payload;
      })
      .addCase(getlessonProgress.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload?.message);
      });
  },
});

// export const {  } = programSlice.actions;
export default programSlice.reducer;
