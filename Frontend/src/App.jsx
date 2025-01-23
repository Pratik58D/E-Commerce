import React from "react";
import AuthLayout from "./components/auth/layout";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLayout from "./components/adminView/AdminLayout";
import AdminDashboard from "./pages/AdminView/AdminDashboard";
import AdminProduct from "./pages/AdminView/AdminProduct";
import AdminOrder from "./pages/AdminView/AdminOrder";
import AdminFeature from "./pages/AdminView/AdminFeature";
import ShopLayout from "./components/shoppingView/ShopLayout";
import NotFound from "./pages/NotFound";
import Home from "./pages/shoppingView/HOme";
import Listing from "./pages/shoppingView/Listing";
import Checkout from "./pages/shoppingView/Checkout";
import Account from "./pages/shoppingView/Account";
import CheckAuth from "./components/common/CheckAuth";
import UnAuth from "./pages/Un-auth";

const App = () => {
  const isAuthenticated = false;
  const user = null;

  return (
    <>
      <div className="flex flex-col overflow-hidden bg-white">
        <Routes>
          {/* Authentication route */}
          <Route
            path="/auth"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AuthLayout />
              </CheckAuth>
            }
          >
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          {/* admin routes */}
          <Route
            path="/admin"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AdminLayout />
              </CheckAuth>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="product" element={<AdminProduct />} />
            <Route path="order" element={<AdminOrder />} />
            <Route path="feature" element={<AdminFeature />} />
          </Route>
          {/* shop view Route */}
          <Route
            path="/shop"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShopLayout />
              </CheckAuth>
            }
          >
            <Route path="home" element={<Home />} />
            <Route path="listing" element={<Listing />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="account" element={<Account />} />
          </Route>
          <Route path = "/unauth-page" element= {<UnAuth />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </div>
    </>
  );
};

export default App;
