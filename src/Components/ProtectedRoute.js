import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../utils";

const ProtectedRoute = () => {
  const user = getUser();
  return user ? <Outlet context={{user}}/> : <Navigate to="/login" />;
};

export default ProtectedRoute;
