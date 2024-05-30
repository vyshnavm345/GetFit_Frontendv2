import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { API_URL } from "config/index";
import { API_URL } from "config";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axiosInstance from "utils/axiosInstance";
import { getTrainer } from "./trainer";
import { closeWebSocket } from "./webSocketSlice";


const REAL_API_URL = API_URL
// const REAL_API_URL = 'http://127.0.0.1:8000'

const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    registered: false,
    error: null,
    message: null,
    verified:false,
    selectedUser:null,
    totalUserCount:null,
    loggedInUsers: [],
    allUsers:[],
}

export const register = createAsyncThunk('user/register', async ({first_name, last_name, email, password}, thunkAPI)=>{
    const body = JSON.stringify({
        first_name,
        last_name,
        email,
        password
    })
    try {
        const res = await fetch(`${REAL_API_URL}/api/users/register/`, {
            method: "POST",
            headers: {
                Accept : 'application/json',
                'Content-Type': 'application/json',
            },
            body
        })

        const data = await res.json();
        // console.log("this is the response ", data)

        if (res.status === 201){
          console.log("registered data : ", data.message)
            return data;
        }
        else{
            return thunkAPI.rejectWithValue(data);
        }
    } catch (err) {
        // console.log(
        //     "This is the error in catch : err",
        //     err,
        //     "err.response",
        //     err.response,
        //     "err.response.data",
        //     err.response.data
        //     );
        return thunkAPI.rejectWithValue(err.response.data)
    }
})



export const verifyEmail = createAsyncThunk(
    "users/verifyEmail",
    async ({token}, thunkAPI) => {
        const body = JSON.stringify({
        token
        });
        try {
        const res = await fetch(`${REAL_API_URL}/api/users/email_verification/`, {
            method: "POST",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            },
            body,
        });

        const data = await res.json();
        if (res.status === 201) {
            toast.success(data.Message);
            // console.log("this is the message from verify email",data.Message);
            // toast.success('Success');


            return data;
        } else {
            return thunkAPI.rejectWithValue(data);
        }
        } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const getUserById = createAsyncThunk(
    'user/getUserById',
    async(id, thunkAPI) =>{
        try {
            const response = await axiosInstance.get(
                `/api/users/getUserById/${id}/`
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
)

// get total user count
export const getTotalUsers = createAsyncThunk(
  "user/getTotalUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/api/users/getUserCount/`);
      if (response.status === 200) {
        console.log("Total users : ", response.data)
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);


// get online users not trainers
export const getLoggedInUsers = createAsyncThunk(
  "user/getLoggedInUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/users/getLoggedInUsers/`
      );
      if (response.status === 200) {
        console.log("Total users : ", response.data);
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);


// get all users not trainers(online and offline)
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/api/users/getAllUsers/`);
      if (response.status === 200) {
        console.log("Total users : ", response.data);
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// get this user
const getUser = createAsyncThunk(
	'user/me',
	async(_, thunkAPI) =>{
		try{
            console.log("get user triggered")
            const response = await axiosInstance.get('/api/users/me/')


			if (response.status === 200){
        toast.success("Successfully Logged In");
          if (response.data.is_trainer){
              const { dispatch } = thunkAPI;
              dispatch(getTrainer());
          } 
          return response.data;
			} else if(response.status === 403){
        console.log("the response is : ", response.data)
        toast.error("You have been temporarly blocked by the user")
        // toast.error(response.data.error)
        
      }
            else {
                return thunkAPI.rejectWithValue(response.data);
            }
		} catch(err) {
            // console.log(
            // "This is the error in catch : err",
            // err,
            // "err.response",
            // err.response,
            // "err.response.data",
            // err.response.data
            // );
			return thunkAPI.rejectWithValue(err.response.data);
		}
	}
	)


export const login = createAsyncThunk('user/login', async ({email, password}, thunkAPI)=>{
    const body = JSON.stringify({
        email,
        password
    })
    try {
        console.log("login triggered")
        const res = await fetch(`${REAL_API_URL}/api/token/`, {
            method: "POST",
            headers: {
                Accept : 'application/json',
                'Content-Type': 'application/json',
            },
            body
        })

        const data = await res.json();

        if (res.status === 200) {
          Cookies.set("accessToken", data.access, { expires: 7 });
          Cookies.set("refreshToken", data.refresh, { expires: 7 });
          console.log("tokens received", data.access);

          const { dispatch } = thunkAPI;

          dispatch(getUser());

          return data;
        } else if (res.status === 403) {
          console.log("the response is : ", res.data.error);
          toast.error(res.data.error);
        } else {
          return thunkAPI.rejectWithValue(data);
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data)
    }
})



export const update = createAsyncThunk("users/update", async (payload, thunkAPI) => {
    try {
        const response = await axios.put(
        `${REAL_API_URL}/api/users/updateUser/`,
        payload,
        {
            headers: {
            "content-type": "multipart/form-data",
            },
        }
        );

        if (response.status === 200) {
        const { dispatch } = thunkAPI;

        dispatch(getUser());
        return response.data;
        } else {
        return thunkAPI.rejectWithValue(response.data);
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});



export const logout = createAsyncThunk(
    'users/logout',
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.post(`/api/users/logout/`);

            if (response.status === 200) {
                 Cookies.remove("accessToken");
                 Cookies.remove("refreshToken");

                 const { dispatch } = thunkAPI;
                 dispatch(resetUser());
                 dispatch(closeWebSocket());
                //  toast.success("Logged Out");
                 toast.success(response.data);

                 return "Logout successful";
            } else {
              return thunkAPI.rejectWithValue(response.data);
            }
            
           
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);



export const checkAuth = createAsyncThunk(
    "users/verify",
    async (_, thunkAPI) => {
        try {
            // const access = Cookies.get("accessToken");
            // const body = {
            //     token: access,
            // };
            const response = await axiosInstance.post("/api/token/verify/");

            if (response.status === 200) {
            const { dispatch } = thunkAPI;

            dispatch(getUser());

            return response.data;
            } else {
            return thunkAPI.rejectWithValue(response.data);
            }
        } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetRegistered: state =>{
            state.registered = false;
        },
        resetUser: state => {
            state.isAuthenticated = false;
            state.user = null;
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
        },
        resetSelectedUser: state =>{
            state.selectedUser= null;
        }
    },
    extraReducers: builder => {
        builder
          .addCase(register.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.registered = true;
            toast.success(action.payload.message)
            // state.message= action.payload.message
          })
          .addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(login.pending, (state) => {
            state.loading = true;
          })
          .addCase(login.fulfilled, (state) => {
            state.loading = false;
            state.isAuthenticated = true;
          })
          .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(getUser.pending, (state) => {
            state.loading = true;
          })
          .addCase(getUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
          })
          .addCase(getUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
            state.isAuthenticated = false;
            toast.error(action.payload.message);
            
            
            // toast.error("request rejected");
            // Cookies.remove("accessToken");
            // Cookies.remove("refreshToken");
          })
          .addCase(checkAuth.pending, (state) => {
            state.loading = true;
          })
          .addCase(checkAuth.fulfilled, (state) => {
            state.loading = false;
            state.isAuthenticated = true;
          })
          .addCase(checkAuth.rejected, (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            
          })
          .addCase(update.pending, (state) => {
            state.loading = true;
            state.error = "";
          })
          .addCase(update.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = "";
          })
          .addCase(update.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            toast.error("request rejected");
          })
          .addCase(verifyEmail.pending, (state) => {
            state.loading = true;
            state.error = "";
          })
          .addCase(verifyEmail.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.verified = true;
          })
          .addCase(verifyEmail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(getUserById.pending, (state) => {
            state.loading = true;
          })
          .addCase(getUserById.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedUser = action.payload;
          })
          .addCase(getUserById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(getTotalUsers.pending, (state) => {
            state.loading = true;
          })
          .addCase(getTotalUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.totalUserCount = action.payload;
          })
          .addCase(getTotalUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(getLoggedInUsers.pending, (state) => {
            state.loading = true;
          })
          .addCase(getLoggedInUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.loggedInUsers = action.payload;
          })
          .addCase(getLoggedInUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(getAllUsers.pending, (state) => {
            state.loading = true;
          })
          .addCase(getAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.allUsers = action.payload;
          })
          .addCase(getAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
    }
});

export const { resetRegistered, resetUser, resetSelectedUser } = userSlice.actions;
export default userSlice.reducer