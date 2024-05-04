import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "utils/axiosInstance";

const initialState = {
  loading: false,
  error: null,
  message: null,
  lessonsList:null
};

// add a new lesson
export const addLesson = createAsyncThunk(
  "lessons/add",
  async ({ formData, programmeId }, thunkAPI) => {
    try {
      console.log("addLessons dispatched");
      console.log("the payload : ", formData);
      const response = await axiosInstance.post(
        `/api/fitness_programs/createLesson/${programmeId}/`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("the response : ", response.data);
        return response.data;
      } else if (response.status === 201) {
        return response.data;
      } else if (response.status === 400) {
        toast.error("Lesson number already exists")
      } else {
        console.log("the error : ", response.data);
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      console.log("the catched error : ", error.response.data.video_url[0]);
      toast.error(error.response.data.video_url[0]);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);



// get the lessons of individual programms by id
export const getLessonsList = createAsyncThunk(
  "lessons/getLessonsList",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/api/fitness_programs/getLessons/${id}/`
      );

      if (response.status === 200) {
        // console.log("the response of programmes list : ", response.data);
        console.log("the response for lesson : ", response.data);
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



// Delete the lesson of an individual programm by id
export const deleteLesson = createAsyncThunk(
  "lessons/deleteLesson",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(
        `/api/fitness_programs/DeleteLesson/${id}/`
      );

      if (response.status === 204) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


const lessonSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(addLesson.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addLesson.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.message);
        console.log("This is the payload", action.payload);
      })
      .addCase(addLesson.rejected, (state, action) => {
        state.loading = false;
        // toast.error(action.payload);
        console.log("This is the returned response ; ", action.payload);
      })
      .addCase(getLessonsList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getLessonsList.fulfilled, (state, action) => {
        console.log("lesson is fulfilled");
        state.loading = false;
        state.lessonsList = action.payload;
      })
      .addCase(getLessonsList.rejected, (state, action) => {
        state.loading = false;
        toast.error("error");
      })
      .addCase(deleteLesson.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteLesson.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.message)
      })
      .addCase(deleteLesson.rejected, (state, action) => {
        state.loading = false;
        toast.error("error");
      });
  },
});

// export const {  } = lessonSlice.actions;
export default lessonSlice.reducer;
