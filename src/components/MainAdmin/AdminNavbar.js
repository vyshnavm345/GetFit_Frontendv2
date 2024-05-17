// src/AdminNavbar.js

import { logout } from "features/user";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  const dispatch = useDispatch()
  return (
  <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
    <Link to="/admin/dashboard" className="text-xl font-bold">
      Admin Panel
    </Link>
    <div>
      <Link to="/admin/dashboard" className="px-4 hover:bg-gray-700 rounded">
        Dashboard
      </Link>
      <Link to="/admin/users" className="px-4 hover:bg-gray-700 rounded">
        Users
      </Link>
      <Link to="/admin/settings" className="px-4 hover:bg-gray-700 rounded">
        Settings
      </Link>
      <button
        onClick={() => {
          dispatch(logout());
        }}
        className="px-4 hover:bg-gray-700 rounded"
      >
        Logout
      </button>
    </div>
  </nav>)
};

export default AdminNavbar;
