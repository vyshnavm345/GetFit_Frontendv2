import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { UserAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading, isAuthenticated} = useSelector(
    (state) => state.user
  );

  if (!isAuthenticated && !loading && user === null ) {
    return <Navigate to="/login" />;
  } else {
    if (user?.blocked){
      toast.error("You have been temporarly blocked by the admin");
      return <Navigate to="/login" />;
    }
    return children;
  }
};

export default ProtectedRoute;
