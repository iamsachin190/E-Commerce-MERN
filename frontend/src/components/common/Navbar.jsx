import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";
import Logout from "../auth/Logout"; // Importing the Logout component

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-white antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4 flex items-center justify-between">
          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button onClick={handleMenuToggle} className="text-gray-700 focus:outline-none mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          <div className="flex items-center space-x-8">
            <div className="shrink-0">
              <Link to="/">
                <h2 className="text-[24px] font-bold font-serif text-green-600">
                  Shopcart
                </h2>
              </Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link to="/categories" className="text-gray-700">Categories</Link>
              <Link to="/deals" className="text-gray-700">Deals</Link>
              <Link to="/whats-new" className="text-gray-700">What's New</Link>
              <Link to="/account" className="text-gray-700">Account</Link>
            </div>
          </div>

          {/* Search Bar */}
          <form className="flex max-w-md mx-auto">
            <input
              type="search"
              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search Product"
              required
            />
            <button
              type="submit"
              className="text-white bg-gray-900 border border-green-600 hover:bg-green-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Search
            </button>
          </form>

          {/* Right section: Account and Cart Buttons */}
          <div className="flex items-center lg:space-x-2 text-gray-700">
            <Link to="/cart" className="text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
              </svg>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col space-y-2 p-4">
            <Link to="/categories" className="text-gray-700">Categories</Link>
            <Link to="/deals" className="text-gray-700">Deals</Link>
            <Link to="/whats-new" className="text-gray-700">What's New</Link>
            <Link to="/account" className="text-gray-700">Account</Link>
          </div>
        </div>
      )}

      <ProfileSidebar isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
    </>
  );
};

export default Navbar;
