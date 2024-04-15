import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import profile_picture from "assets/kris gethin.jpg";
import { SiTicktick } from "react-icons/si";
import { TiTick } from "react-icons/ti";

export default function Sidebar({isOpen, setIsOpen, setOption}) {
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
      <div onClick={()=>{setOption(1)}} className="flex border-collapse border p-2 rounded mx-4">
        <img
          src={profile_picture}
          alt="Profile"
          className="rounded-full w-20 object-cover  h-20"
        />
        <h3 className="mx-4 my-2 font-mono">
          Kris Gethin <br />{" "}
          <h5 className="text-sm flex">
            Verified <TiTick  className="ml-2"/>
          </h5>
        </h3>
      </div>
      <nav className="mt-4">
        <ul className="space-y-2">
          <li className="px-4 py-2 hover:bg-gray-700">
            <div onClick={()=>{setOption(2)}} className="text-base font-medium">
              Programmes
            </div>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700">
            <div onClick={()=>{setOption(3)}} className="text-base font-medium">
              Users
            </div>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700">
            <a href="#" className="text-base font-medium">
              Lesson 3
            </a>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700">
            <a href="#" className="text-base font-medium">
              Lesson 4
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
