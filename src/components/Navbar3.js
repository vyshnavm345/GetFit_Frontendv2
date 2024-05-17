import React, { useState } from "react";
import logo from "../assets/Get-fit-Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "features/user";
import { toast } from "react-toastify";
import { API_URL } from "config";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const authLinks = (
    <div className="md:ml-auto md:mr-4 flex items-center cursor-pointer ">
      <button
        className="bg-white rounded-md mr-2 text-sm px-4 py-1 h-8 mt-2 hover:bg-cyan-400"
        onClick={() => {
          dispatch(logout());
        }}
      >
        Logout
      </button>
      
      <button
        onClick={() => {
          if(user?.is_superuser){
            navigate("/admin/dashboard");
          } else {navigate("/TrainerDashboard");}
          
        }}
      >
        <div className="text-white font-mono flex ml-4 items-center ">
          {user?.profile_picture ? (
            <img
              className="w-8 h-8 mr-2 rounded-full object-cover"
              src={`${API_URL}${user?.profile_picture}`}
              alt="user"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 rounded-full"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              />
            </svg>
          )}
          <p>{user?.first_name}</p>
        </div>
      </button>
    </div>
  );
  const guestLinks = (
    <div className="md:ml-auto md:mr-4">
      <Link to="/login">
        <button className="bg-white rounded-md mr-2 text-sm px-4 py-1 hover:bg-cyan-400">
          Log In
        </button>
      </Link>
      <Link to="/register">
        <button className="bg-white rounded-md text-sm px-4 py-1  hover:bg-cyan-400">
          Sign Up
        </button>
      </Link>
    </div>
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption === "option1") {
      navigate("/login");
    } else if (selectedOption === "option2") {
      navigate("/register");
    } else if (selectedOption === "option3") {
      navigate("/chat");
    } else if (selectedOption === "option4") {
      // toast.success('Navigated to test success')
      if (user?.is_superuser){
        // navigate("/admin/dashboard");
      } else {
      } navigate("/dashboard");
        
    }
  };

  return (
    <div className=" sticky top-0 z-[100] w-full ">
      <div className="flex h-20 flex-col md:flex-row items-start justify-between p-2 md:p-6 w-full z-[100] absolute bg-gray-600 bg-opacity-40">
        <Link to="/">
          <div className="flex items-center">
            <img className="h-12 md:h-10 mr-2" src={logo} alt="logo" />
            <h1 className="text-white text-4xl cursor-pointer font-blackops-one  md:block hidden">
              GET-FIT
            </h1>
          </div>
        </Link>
        <div className=" flex flex-auto items-end md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        <div
          className={` flex flex-col md:flex md:flex-row md:flex-grow  items-center ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex ml-auto flex-col md:flex-row ">
            <Link to="/findTrainer">
              <div className="h-10 mt-5 md:mt-0 md:h-0 ">
                <a
                  className=" hover:text-cyan-400 md:text-base mx-5 mb-[15px]  font-mono text-white"
                  href="!#"
                >
                  Find trainers
                </a>
              </div>
            </Link>
            <Link to="/programmes">
              <div className=" h-10 mt-5 md:mt-0 md:h-0">
                <a
                  className=" hover:text-cyan-400 mx-5 font-mono text-white"
                  href="!#"
                >
                  Programms
                </a>
              </div>
            </Link>
            {!user?.is_trainer && !user?.is_superuser && (
              <Link to="/trainerRegister">
                <div className=" h-10 mt-5 md:mt-0 md:h-0">
                  <a
                    className=" hover:text-cyan-400 mx-5 font-mono text-white"
                    href="!#"
                  >
                    Join as Trainer
                  </a>
                </div>
              </Link>
            )}

            <div className=" h-10 mt-5 md:mt-0 md:h-0">
              <div className="relative inline-block">
                <select
                  className="mx-5 font-mono  hover:text-cyan-400  text-white bg-transparent border-none"
                  defaultValue=""
                  onChange={handleDropdownChange}
                >
                  <option className=" text-white" value="" disabled hidden>
                    Community
                  </option>
                  <option className=" text-black" value="option1">
                    Login
                  </option>
                  <option className=" text-black" value="option2">
                    Sign up
                  </option>
                  <option className=" text-black" value="option3">
                    Chat
                  </option>
                  <option className=" text-black" value="option4">
                    dashboard
                  </option>
                </select>
                <svg
                  className="absolute pointer-events-none top-0 right-0 m-2"
                  width="12"
                  height="12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 4l2 2 2-2"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="h-10 mt-5 md:mt-0 md:h-0 ml-auto">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
