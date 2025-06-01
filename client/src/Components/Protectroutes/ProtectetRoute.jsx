import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin }) => {
  const { isLoading, isAuthenticated, user } = useSelector((state) => state.authreducer);

  
  
  if (isLoading) {
    return <div>Loading...</div>; // Or show a spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/register" replace />;
  }

  if (isAdmin && user?.role !== "admin") {
    return <Navigate to="/register" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
