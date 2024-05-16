// src/AdminNavbar.js

import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => (
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
      <Link to="/logout" className="px-4 hover:bg-gray-700 rounded">
        Logout
      </Link>
    </div>
  </nav>
);

export default AdminNavbar;
