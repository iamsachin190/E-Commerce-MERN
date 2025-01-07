import React from "react";
import axios from "axios";
import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
});


const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
      const response = await axios.post('http://localhost:8000/api/users/register', formData);
      console.log(response.data);
      alert('User registered successfully!');
  } catch (error) {
      console.error(error);
      alert('Error registering user');
  }
};


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-yellow-500 text-center mb-4">
          myzone
        </h1>

        {/* Form Heading */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Create Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Your name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="First and last name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Passwords must be at least 6 characters.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-md"
          >
            Continue
          </button>
        </form>

      </div>
    </div>
  );
}

