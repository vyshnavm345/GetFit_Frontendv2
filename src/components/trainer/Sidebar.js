import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import profile_picture from "assets/kris gethin.jpg";
import { SiTicktick } from "react-icons/si";
import { TiTick } from "react-icons/ti";
import { useSelector } from "react-redux";
import { API_URL } from "config";
import logo from "assets/Get-fit-Logo.png";

export default function Sidebar({ isOpen, setIsOpen, setOption }) {
  const { user } = useSelector((state) => state.user);
  // const { trainer } = useSelector((state) => state.trainer);

  const handleOptionClick = (option) => {
    console.log("this is the option", option);
    setOption(option);
  };

  const trainerOptions = (
    <>
      <ul className="space-y-2">
        <li className="px-4 py-2 hover:bg-gray-700">
          <div
            onClick={() => handleOptionClick(2)}
            className="text-base cursor-pointer font-medium"
          >
            Programmes
          </div>
        </li>
        <li className="px-4 py-2 hover:bg-gray-700">
          <div
            onClick={() => handleOptionClick(5)}
            className="text-base cursor-pointer font-medium"
          >
            Subscribers
          </div>
        </li>
        {/* <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
          <a href="#" className="text-base font-medium">
            Chat
          </a>
        </li> */}
      </ul>
    </>
  );
  const userOptions = (
    <>
      <ul className="space-y-2">
        <li className="px-4 py-2 hover:bg-gray-700">
          <div
            onClick={() => handleOptionClick(3)}
            className="text-base cursor-pointer font-medium"
          >
            Subscribed Programmes
          </div>
        </li>
        <li className="px-4 py-2 hover:bg-gray-700">
          <div
            onClick={() => handleOptionClick(4)}
            className="text-base cursor-pointer font-medium"
          >
            Communities
          </div>
        </li>
        {/* <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer ">
          <a href="#" className="text-base font-medium">
            Chat
          </a>
        </li> */}
      </ul>
    </>
  );

  const navigate = useNavigate();
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 lg:w-80 overflow-y-auto bg-black/50  text-white z-50 transition duration-300 ease-in-out transform ${
        isOpen ? "-translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex mt-20 items-center justify-between px-4 py-2">
        <h2 className="text-xl font-bold">Trainer Dashboard</h2>
        <button
          onClick={toggleDrawer}
          className="text-white text-4xl mt-1 hover:text-gray-300 focus:outline-none"
        >
          <IoIosArrowDropleft />
        </button>
      </div>
      <div
        onClick={() => handleOptionClick(1)}
        className="flex border-collapse border p-2 rounded mx-4 cursor-pointer"
      >
        <img
          src={
            user?.profile_picture ? `${API_URL}${user?.profile_picture}` : logo
          }
          alt="Profile"
          className="rounded-full w-20 object-cover h-20"
        />
        <h3 className="mx-4 my-2 font-mono">
          {user?.first_name} {user?.last_name} <br />
          
          <h5 className="text-xs flex">{user?.email}</h5>
        </h3>
      </div>
      <nav className="mt-4">
        {user?.is_trainer ? trainerOptions : userOptions}
      </nav>
      <div onClick={()=>{navigate("/chat");}} className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-base font-medium">
        Chat
      </div>
    </div>
  );
}
