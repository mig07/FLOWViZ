import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const auth = JSON.parse(localStorage.getItem("auth"));

  return auth ? <Outlet /> : <Navigate to="/login" />;
}
