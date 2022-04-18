import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function SellerRoute() {
  let userSignin = useSelector((state) => state.userSignin);
  let { userInfo } = userSignin;
  return userInfo && userInfo.isSeller ? <Outlet /> : <Navigate to="/signin" />;
}

export default SellerRoute;
