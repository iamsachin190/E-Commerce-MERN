import React from "react";
import { useSelector } from "react-redux";
import Logout from "../auth/Logout";
import { Link } from "react-router-dom";

const AccountPage = () => {
  const isLoggedIn = useSelector((state) => state.auth.status);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-yellow-500 mb-4">Welcome to MyZone!</h1>
      {isLoggedIn ? (
        <div>
          <Link to="/dashboard" className="bg-yellow-500 text-white p-2 rounded mr-2">Dashboard</Link>
          <Logout />
        </div>
      ) : (
        <div>
          <Link to="/login" className="bg-yellow-500 text-white p-2 rounded mr-2">Login</Link>
          <Link to="/register" className="bg-yellow-500 text-white p-2 rounded">Register</Link>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
