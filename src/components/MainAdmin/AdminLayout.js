import React from "react";
import { Helmet } from "react-helmet";
// import Sidebar from "./Sidebar";
import Sidebar from "components/MainAdmin/Sidebar";
import ScrollToTop from "components/ScrollToTop";
import { ToastContainer } from "react-toastify";
// import NotificationComponent from "./layouts/NotificationComponent";
import NotificationComponent from "components/layouts/NotificationComponent";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = ({ title, content, children }) => (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={content} />
    </Helmet>
    <ScrollToTop />
    <AdminNavbar />
    <div className="flex bg-white w-full h-full">
      <Sidebar />
      <div className="flex-grow p-6 ml-64">
        <ToastContainer />
        <NotificationComponent />
        {children}
      </div>
    </div>
  </>
);

export default AdminLayout;
