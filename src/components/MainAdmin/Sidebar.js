import React from "react";
import { NavLink } from "react-router-dom";
import logo from 'assets/Get-fit-Logo.png'

const Sidebar = () => (
  <div className="w-64 -mt-16 h-screen bg-gray-800 text-white fixed">
    <nav className="flex flex-col p-4 space-y-4">
      <NavLink to="/">
        <div className="flex  justify-start">
          <img className="h-12 md:h-10 mr-2" src={logo} alt="logo" />
          <h1 className="text-white text-4xl cursor-pointer font-blackops-one md:block hidden">
            GET-FIT
          </h1>
        </div>
      </NavLink>
      <NavLink
        to="/admin/dashboard"
        className="hover:bg-gray-700 p-2 rounded"
        activeClassName="bg-gray-700"
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/admin/users"
        className="hover:bg-gray-700 p-2 rounded"
        activeClassName="bg-gray-700"
      >
        Users
      </NavLink>
      <NavLink
        to="/admin/trainers"
        className="hover:bg-gray-700 p-2 rounded"
        activeClassName="bg-gray-700"
      >
        Trainers
      </NavLink>
      <NavLink
        to="/admin/fitnessPrograms"
        className="hover:bg-gray-700 p-2 rounded"
        activeClassName="bg-gray-700"
      >
        Programs
      </NavLink>
      <NavLink
        to="/admin/requestNotificaions"
        className="hover:bg-gray-700 p-2 rounded"
        activeClassName="bg-gray-700"
      >
        Pending Approvals
      </NavLink>
    </nav>
  </div>
);

export default Sidebar;
