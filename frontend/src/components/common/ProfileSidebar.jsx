import React from "react";

const RightSidebar = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      {/* Close Button */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Profile</h2>
        <button onClick={onClose} className="text-gray-500">
          ✖️
        </button>
      </div>

      {/* Profile Section */}
      <div className="p-4">
        <h3 className="text-md font-bold">John Doe</h3>
        <p className="text-sm text-gray-500">johndoe@example.com</p>
      </div>

      {/* Orders Section */}
      <div className="p-4 border-t">
        <h3 className="text-md font-bold">Orders</h3>
        <ul className="mt-2 space-y-2">
          <li className="text-gray-700">Order #1234</li>
          <li className="text-gray-700">Order #5678</li>
          <li className="text-gray-700">Order #91011</li>
        </ul>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <button
          onClick={() => alert("Logged Out")}
          className="w-full bg-red-500 text-white py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default RightSidebar;
