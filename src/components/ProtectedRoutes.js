import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import { UserAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading, isAuthenticated} = useSelector(
    (state) => state.user
  );

  if (!isAuthenticated && !loading && user === null) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
