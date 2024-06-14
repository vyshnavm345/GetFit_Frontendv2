import Layout from 'components/Layout'
import React, { useState } from 'react'
import img1 from 'assets/Login.jpg'
// import img2 from "../assets/Get-fit-Logo.png"
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from 'features/user'
import Loader from 'components/Loader'
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react'

const Register = () => {
  const dispatch = useDispatch();
  const { registered, loading, error, isAuthenticated } = useSelector(state => state.user);
  
  useEffect(()=>{
    const notify = () => toast.error(error?.error_message);
    notify();
  }, [error])
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { first_name, last_name, email, password, password2 } = formData;

  const onChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const onSubmit = e =>{
    e.preventDefault();

    dispatch(register({first_name, last_name, email, password}));
  }

  if (registered) return <Navigate to='/login' />;

  if (isAuthenticated) {
    return <Navigate to="/TrainerDashboard" />;
  }
 
  return (
    <Layout title="Auth Site | Register" content="Register Page">
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
                Sign UP
              </h1>
              <form
                className="text-black w-full flex flex-col py-4"
                onSubmit={onSubmit}
              >
                <div className="grid sm:grid-cols-2 sm:gap-4">
                  <input
                    className="p-3 my-2 bg-cyan-100 rounded"
                    type="text"
                    name="first_name"
                    id="1"
                    onChange={onChange}
                    value={first_name}
                    required
                    placeholder="First Name"
                  />
                  <input
                    className="p-3 my-2 bg-cyan-100 rounded"
                    type="text"
                    name="last_name"
                    id="2"
                    onChange={onChange}
                    value={last_name}
                    required
                    placeholder="Last Name"
                  />
                </div>
                <input
                  className="p-3 my-2 bg-cyan-100 rounded"
                  type="email"
                  name="email"
                  id="3"
                  onChange={onChange}
                  value={email}
                  required
                  placeholder="Email"
                />
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
                <input
                  className="p-3 my-2 bg-cyan-100 rounded"
                  type="password"
                  name="password2"
                  id="4"
                  onChange={onChange}
                  value={password2}
                  required
                  placeholder="Re-enter Password"
                />
                {password !== password2 && (
                  <div className="text-red-500 font-bold">
                    Passwords don't match
                  </div>
                )}
                {loading ? (
                  <Loader />
                ) : (
                  <button className="bg-cyan-500 py-3 my-6 rounded font-bold">
                    Sign Up
                  </button>
                )}

                {/* <div className='flex justify-between items-center text-sm text-gray-600'>
                      <p>
                        <input className='mr-2' type="checkbox" name="" />
                        Keep me logged in.
                      </p>
                    </div> */}
                <p className="text-white py-4">
                  <span className="text-gray-400">
                    Already Have an Account ?
                  </span>
                  <Link to="/login"> Log In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Register

// fixed w-full px-4 py-24 z-50 
// flex justify-between items -crntre text sm text-grey-600