import React from "react";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/dashboard" />;
};

export default GuestRoute;
