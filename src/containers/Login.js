import Layout from 'components/Layout'
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import img1 from 'assets/Login.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { resetRegistered, login } from 'features/user'
import Loader from 'components/Loader'
import { toast } from "react-toastify";
import { initializeWebSocket } from 'features/webSocketSlice'
// import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated, registered, error, user} = useSelector(
    (state) => state.user
  );


  useEffect(() => {
    if (registered) dispatch(resetRegistered());
  }, [registered, dispatch]);

  useEffect(() => {
    const notify = () => toast.error(error?.detail);
    notify();
    // console.log("This is the error :->", error?.detail);
  }, [error]);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const {email, password} = formData;

  const onChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const onSubmit = e =>{
    e.preventDefault();

    dispatch(login({email, password}));
  }
  useEffect(()=>{
    if (isAuthenticated && user){
      dispatch(initializeWebSocket(user.id))
      if (user.is_superuser){
        navigate("/");
      } else {
        navigate("/trainerDashboard");
      }
    }
  }, [isAuthenticated, user])

  return (
    <Layout title="Auth Site | Login" content="Login Page">
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src={img1}
          alt="register"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
        <div className="fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto py-16">
              {/* <ToastContainer className="mt-10" /> */}
              <h1 className="text-3xl font-blackops-one text-blue-600 underline">
                Log In
              </h1>
              <form
                className="text-black w-full flex flex-col py-4"
                onSubmit={onSubmit}
              >
                <input
                  className="peer p-3 my-2 bg-cyan-100 rounded"
                  type="email"
                  name="email"
                  id="3"
                  onChange={onChange}
                  value={email}
                  required
                  placeholder="Email"
                />
                {email.length > 0 && <div className="hidden text-red-500 peer-invalid:block ">
                  ! invalid email
                </div>}
                <input
                  className="p-3 my-2 bg-cyan-100 rounded"
                  type="password"
                  name="password"
                  id="4"
                  onChange={onChange}
                  value={password}
                  required
                  placeholder="Password"
                />
                {loading ? (
                  <Loader />
                ) : (
                  <button className="bg-cyan-500 py-3 my-6 rounded font-bold">
                    LogIn
                  </button>
                )}

                <p className="text-white py-4">
                  <span className="text-gray-400">Don't have an Account ?</span>
                  <Link to="/register"> Sign Up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login