import React from "react";
import { Route, Navigate } from "react-router-dom";

// Dummy authentication check function
const isAuthenticated = () => {
  // Replace this with your actual authentication check logic
  return !!localStorage.getItem("authToken"); // Example: Check if an auth token exists in localStorage
};

const ProtectedRoute = ({ element, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated() ? element : <Navigate to="/login" replace />}
    />
  );
};

export default ProtectedRoute;
