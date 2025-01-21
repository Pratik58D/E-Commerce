import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-red-500">404</h1>
        <p className="text-lg mt-4">Oops! The page you are looking for does not exist.</p>
        <Link to="/shop/home" className="mt-6 inline-block text-blue-500 hover:text-blue-700">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
