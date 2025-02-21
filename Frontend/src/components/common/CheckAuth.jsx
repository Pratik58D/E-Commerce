import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({children, isAuthenticated, user }) => {
  const location = useLocation();
  // console.log("is autheticated :",isAuthenticated);


  //if user isnot authenticated and the path is not login or register(means tries to acess "/shop or anything") then redirect to login page
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  //if user is authenticated and the path is login or register then check user role redirect to the pages

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  //if user is authenticated and the user isnot a admin and the path is admin then redirect to unauth page

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  //if user is authentiacted and role is admin and the path is shop then redirect to admin dashboard

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
};

export default CheckAuth;
