import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  let userSignin = useSelector((state) => state.userSignin);

  let { userInfo } = userSignin;

  return userInfo ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateRoute;
