import { checkAuth } from "features/user";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children, isAdmin = false }) => {
  const dispatch = useDispatch()
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  // Handle loading and non-authenticated states
  if (!isAuthenticated && !loading && user === null) {
    return <Navigate to="/login" />;
  }

  // Check for admin access
  if (isAdmin && user?.is_superuser !== true) {
    toast.error("You are not authorized to access this page.");
    return <Navigate to="/" />; 
  }

  return children; // Render content for both regular and admin users
};

const AdminProtectedRoute = ({ children }) => {
  return <ProtectedRoute children={children} isAdmin={true} />;
};

export default ProtectedRoute;
export { AdminProtectedRoute };


