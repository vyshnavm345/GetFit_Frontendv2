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
  userTrainers: [],  // the list of trainers of a user
  programSubscribers: [], // users and their subscribed programms list, of a particular trainer.
  trainerContacts: [], // list of trainers contacts
  userContacts: [], //list of user contacts
};


// get all the subscribers of a trainer
export const getSubscribers = createAsyncThunk(
  "trainer/getSubscribers",
  async (_, thunkAPI) => {
    try {
      console.log("inside getsubscribers")
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



// get the trainer contacts
export const getTrainerContacts = createAsyncThunk(
  "trainer/getTrainerContacts",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `${baseURL}/api/trainers/getTrainerContacts/`
      );

      if (response.status === 200) {
        console.log("the returned contacts of trainer: ", response.data);
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
    try {
      const response = await axios.get(
        `${baseURL}/api/fitness_programs/get_trainer_programme/${id}/`
      );

      if (response.status === 200) {
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
        const response = await axiosInstance.get(
            "/api/trainers/getTrainer/"
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


// retrive trainer by ID
export const getTrainerByID = createAsyncThunk(
  "trainer/getTrainerByID",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseURL}/api/trainers/retrieveTrainer/${id}/`
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


// retrive all trainers
export const getTrainerList = createAsyncThunk(
  "trainer/getTrainerList",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${baseURL}/api/trainers/allTrainer/`);

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



// retrive all trainers of a user
export const getUserTrainers = createAsyncThunk(
  "trainer/getUserTrainers",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/api/users/getUserTrainers/");

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



// get all the users contacts
export const getUserContacts = createAsyncThunk(
  "trainer/getUserContacts",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/api/users/getUserTrainers/");

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
      })
      .addCase(getTrainerprogrammesList.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload);
      })
      .addCase(getSubscribers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSubscribers.fulfilled, (state, action) => {
        state.loading = false;
        state.programSubscribers = action.payload;
      })
      .addCase(getSubscribers.rejected, (state, action) => {
        state.loading = false;
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
      })
      .addCase(getUserTrainers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUserTrainers.fulfilled, (state, action) => {
        state.loading = false;
        state.userTrainers = action.payload;
      })
      .addCase(getUserTrainers.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.message);
      })
      .addCase(getTrainerContacts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTrainerContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.trainerContacts = action.payload;
      })
      .addCase(getTrainerContacts.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.message);
      })
      .addCase(getUserContacts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUserContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.userContacts = action.payload;
      })
      .addCase(getUserContacts.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.message);
      });
  },
});

export const { resetCreated, resetTrainersProgrammes } = trainerSlice.actions;
export default trainerSlice.reducer