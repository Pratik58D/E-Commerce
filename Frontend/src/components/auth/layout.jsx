import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center w-1/2 px-12 bg-blue-400">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-4xl font-medium tracking-tight">
            Your One-Stop Shop For Everything You Love!
          </h1>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center px-4 py-12 bg-primary-background sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
