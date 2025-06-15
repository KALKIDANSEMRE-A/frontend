import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import LoadingSpinner from "./LoadingSpinner";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useUser();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If user's role is not allowed, redirect to a not found or unauthorized page
    return <Navigate to="/not-found" replace />;
  }

  // Render the protected component if user is authenticated and authorized
  return children;
};

export default ProtectedRoute;
