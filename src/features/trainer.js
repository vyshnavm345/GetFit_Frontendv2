import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "utils/axiosInstance";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000";

const initialState = {
  loading: false,
  error: null,
  message: null,
  trainer: null,
  selectedTrainer:null,
  created: false,
  programmes: null,
  programme: null,
  trainersProgrammes: null,
  trainerList:null,
  programSubscribers:null, // users with their subscribed programms list of a particular trainer
};


// get all the subscribers of a trainer
export const getSubscribers = createAsyncThunk(
  "trainer/getSubscribers",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `${baseURL}/api/trainers/get_subscribers/`
      );

      if (response.status === 200) {
        console.log("the returned subscribers : ", response.data);
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



// get individual programme by id
export const getProgramme = createAsyncThunk(
  "trainer/getProgramme",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseURL}/api/fitness_programs/get_programme/${id}/`
      );

      if (response.status === 200) {
        // console.log("the response of programmes list : ", response.data);
        console.log("the returned item : ", response.data);
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


// get the programmes of individual trainers by id
export const getTrainerprogrammesList = createAsyncThunk(
  "trainer/getTrainerprogrammesList",
  async (id, thunkAPI) => {
    console.log("sending request");
    try {
      const response = await axios.get(
        `${baseURL}/api/fitness_programs/get_trainer_programme/${id}/`
      );

      if (response.status === 200) {
        console.log("request fulfilled")
        return response.data;
      } else {
        console.log("error in else ", response.data);
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      console.log("error in catch ", error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


// get all the programmes
export const getprogrammeslist = createAsyncThunk(
  "trainer/getprogrammeslist",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseURL}/api/fitness_programs/retrive_all/`
      );

      if (response.status === 200) {
        // console.log("the response of programmes list : ", response.data);
        console.log("the id of the first item : ", response.data[0].id);
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



// create new programme
export const createProgramme = createAsyncThunk(
  "trainer/createProgramme",
  async (payload, thunkAPI) => {
    try {
      console.log("createProgramme dispatched");
      console.log("the payload : ", payload);
      const response = await axiosInstance.post(
        "/api/fitness_programs/create/",
        payload,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success(response.data.message);
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


// add a new trainer
export const addTrainer = createAsyncThunk("trainer/add", async (payload, thunkAPI)=> {
    try {
        console.log("addTrainer dispatched");
        console.log("the payload : ", payload);
        const response = await axiosInstance.post(
          "/api/trainers/TrainerProfileCreation/",
          payload,
          {
            headers: {
              "content-type": "multipart/form-data",
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


// retrive trainer
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


// retrive trainer by ID
export const getTrainerByID = createAsyncThunk(
  "trainer/getTrainerByID",
  async (id, thunkAPI) => {
    try {
      console.log("getTrainer  dispatched inside slice");
      const response = await axios.get(
        `${baseURL}/api/trainers/retrieveTrainer/${id}/`
      );

      if (response.status === 200) {
        console.log("the retrived trainer by id is : ", response.data);
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


// retrive all trainers
export const getTrainerList = createAsyncThunk(
  "trainer/getTrainerList",
  async (_, thunkAPI) => {
    try {
      console.log("getTrainer list  dispatched inside slice");
      const response = await axios.get(`${baseURL}/api/trainers/allTrainer/`);

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
  name: "trainer",
  initialState,
  reducers: {
    resetCreated: (state) => {
      state.created = false;
    },
    resetTrainersProgrammes: (state) => {
      state.trainersProgrammes = null;
    },
  },
  extraReducers: (builder) => {
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
        state.trainer = action.payload.data;
        console.log("inside fulfilled", action.payload.data);
      })
      .addCase(getTrainer.rejected, (state, action) => {
        state.loading = false;
        toast.error("Error: Trainer data cannot be retrived");
      })
      .addCase(getTrainerList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTrainerList.fulfilled, (state, action) => {
        state.loading = false;
        state.trainerList = action.payload;
        console.log("Trainer list inside fulfilled", action.payload);
      })
      .addCase(getTrainerList.rejected, (state, action) => {
        state.loading = false;
        toast.error("Sorry Something went wrong");
      })
      .addCase(createProgramme.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createProgramme.fulfilled, (state, action) => {
        state.loading = false;
        state.created = true;
        console.log("inside fulfilled", action.payload.data);
      })
      .addCase(createProgramme.rejected, (state, action) => {
        state.loading = false;
        toast.error("Sorry Programme not created");
      })
      .addCase(getprogrammeslist.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getprogrammeslist.fulfilled, (state, action) => {
        state.loading = false;
        state.programmes = action.payload;
        console.log("inside fulfilled", action.payload);
      })
      .addCase(getprogrammeslist.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getProgramme.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProgramme.fulfilled, (state, action) => {
        state.loading = false;
        state.programme = action.payload;
        console.log("Get programme inside fulfilled", action.payload);
      })
      .addCase(getProgramme.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload);
      })
      .addCase(getTrainerprogrammesList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTrainerprogrammesList.fulfilled, (state, action) => {
        state.loading = false;
        state.trainersProgrammes = action.payload;
        console.log("Get programme inside fulfilled", action.payload);
      })
      .addCase(getTrainerprogrammesList.rejected, (state, action) => {
        state.loading = false;
        console.log("This is the error message", action.payload);
        toast.error(action.payload);
      })
      .addCase(getSubscribers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSubscribers.fulfilled, (state, action) => {
        state.loading = false;
        state.programSubscribers = action.payload;
        console.log("Get subscribers inside fulfilled", action.payload);
      })
      .addCase(getSubscribers.rejected, (state, action) => {
        state.loading = false;
        console.log("This is the error message", action.payload);
        toast.error(action.payload);
      })
      .addCase(getTrainerByID.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTrainerByID.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTrainer = action.payload;
      })
      .addCase(getTrainerByID.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.message);
      });
  },
});

export const { resetCreated, resetTrainersProgrammes } = trainerSlice.actions;
export default trainerSlice.reducer