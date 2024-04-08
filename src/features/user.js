import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "config/index";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axiosInstance from "utils/axiosInstance";


const REAL_API_URL = 'http://127.0.0.1:8000'
const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    registered: false,
    error: null,
    message: null,
    verified:false
}

export const register = createAsyncThunk('user/register', async ({first_name, last_name, email, password}, thunkAPI)=>{
    const body = JSON.stringify({
        first_name,
        last_name,
        email,
        password
    })
    console.log("This is the api url",API_URL)
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
            toast.success(data.message);
            return data;
        }
        else{
            console.log("This is the error in else : ", data);
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
    console.log("this is the body inside verifyEmail ", body);
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



const getUser = createAsyncThunk(
	'user/me',
	async(_, thunkAPI) =>{
		try{
            // console.log("This is the axios instance: ", axiosInstance);
            console.dir(axiosInstance);
            console.log("Base URL:", axiosInstance.defaults.baseURL);
            console.log("Headers:", axiosInstance.defaults.headers);
            const response = await axiosInstance.get('/api/users/me/')


			if (response.status === 200){
                
				return response.data;
			}
            else {
                return thunkAPI.rejectWithValue(response.data);
            }
		} catch(err) {
            console.log(
            "This is the error in catch : err",
            err,
            "err.response",
            err.response,
            "err.response.data",
            err.response.data
            );
			return thunkAPI.rejectWithValue(err.response.data);
		}
	}
	)



// const getUser = createAsyncThunk("user/me", async (_, thunkAPI) => {
//   const access = Cookies.get("accessToken");
//   try {
//     const res = await fetch(`${REAL_API_URL}/api/users/me/`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${access}`,
//       },
//     });
//     // const response = await axiosInstance.get('/api/users/me/')

//     const data = await res.json();

//     if (res.status === 200) {
//       return data;
//     } else {
//       return thunkAPI.rejectWithValue(res.data);
//     }
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response.data);
//   }
// });

export const login = createAsyncThunk('user/login', async ({email, password}, thunkAPI)=>{
    const body = JSON.stringify({
        email,
        password
    })
    try {
        const res = await fetch(`${REAL_API_URL}/api/token/`, {
            method: "POST",
            headers: {
                Accept : 'application/json',
                'Content-Type': 'application/json',
            },
            body
        })

        const data = await res.json();

        if (res.status === 200){
            Cookies.set('accessToken', data.access, {expires: 7});
            Cookies.set('refreshToken', data.refresh, { expires: 7});

            const {dispatch} = thunkAPI;

            dispatch(getUser());
            toast.success("Successfully Logged In");

            return data;
        }
        else{
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
            
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            console.log("tokens removed");
            

            const {dispatch} = thunkAPI;
            dispatch(resetUser());
            console.log("user reset");
            toast.success("Logged Out");

            return 'Logout successful';
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);



export const checkAuth = createAsyncThunk(
    "users/verify",
    async (_, thunkAPI) => {
        try {
            console.dir(axiosInstance);
            console.log("Base URL:", axiosInstance.defaults.baseURL);
            console.log("Headers:", axiosInstance.defaults.headers);
            // const access = Cookies.get("accessToken");
            // const body = {
            //     token: access,
            // };
          const response = await axiosInstance.post("/api/token/verify/");

          if (response.status === 200) {
            console.log("verified");
            const { dispatch } = thunkAPI;

            dispatch(getUser());

            return response.data;
          } else {
            return thunkAPI.rejectWithValue(response.data);
          }
        } catch (err) {
            console.log(
            "This is the error in catch : err",
            err,
            "err.response",
            err.response,
            "err.response.data",
            err.response.data
            );
        return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);


// export const checkAuth = createAsyncThunk(
//   "users/verify",
//   async (_, thunkAPI) => {
//     // const access = Cookies.get("accessToken");
//     // const body = JSON.stringify({
//     // token: access,
//     // });

//     try {
//       // const res = await fetch(`${REAL_API_URL}/api/token/verify/`, {
//       //     method: "POST",
//       //     headers: {
//       //     Accept: "application/json",
//       //     "Content-Type": "application/json",
//       //     },
//       //     body,
//       // });
//       const response = await axiosInstance.get("/api/token/verify/");

//       // const data = await res.json();
//       if (response.status === 200) {
//         console.log("verified");
//         const { dispatch } = thunkAPI;

//         dispatch(getUser());

//         return response.data;
//       } else {
//         return thunkAPI.rejectWithValue(response.data);
//       }
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data);
//     }
//   }
// );



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
    },
    extraReducers: builder => {
        builder
        .addCase(register.pending, (state, action) => {
        state.loading = true;
        })
        .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.registered = true;
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
        state.error = action.payload
        console.log("this is the login error from thunk : ", state.error.detail);
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
        state.error = action.payload;
        toast.error("request rejected");
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
        });
    }
});

export const { resetRegistered, resetUser} = userSlice.actions;
export default userSlice.reducer