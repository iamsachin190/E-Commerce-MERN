import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Logout from "../auth/Logout"; 

const RightSidebar = ({ isOpen, onClose }) => {

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/api/users/logout");
      dispatch(logout()); 
      navigate('/login'); 
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Get auth status and user data from the Redux store
  const { status, userData } = useSelector((state) => state.auth);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Profile</h2>
          <button onClick={onClose} className="text-gray-500">
            ✖️
          </button>
        </div>
        {status ? (
          <div className="p-4">
            <h3 className="text-md font-bold">{userData?.data?.loggedInUser?.name}</h3>
            <p className="text-sm text-gray-500">{userData?.data?.loggedInUser?.email}</p>
            <div className="p-4 border-t">
              <Link to="/orders" className="text-md font-bold">
                Orders
              </Link>
            </div>
            <Logout />
          </div>
        ) : (
          <div className="p-4">
            <h3 className="text-md font-bold">Welcome, Guest!</h3>
            <p className="text-sm text-gray-500">Please log in to access your profile.</p>
            <div className="flex gap-4 mt-4">
              <Link to="/login" className="w-1/2 bg-blue-500 text-white text-center py-2 rounded-lg">
                Login
              </Link>
              <Link to="/signup" className="w-1/2 bg-green-500 text-white text-center py-2 rounded-lg">
                Signup
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RightSidebar;
