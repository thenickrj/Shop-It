import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
  let userSignin = useSelector((state) => state.userSignin);
  let { userInfo } = userSignin;
  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/signin" />;
}

export default AdminRoute;
