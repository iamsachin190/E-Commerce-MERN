import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login as Logins } from "../../store/authSlice";

export default function Login() {
  const [inputData, setInputData] = React.useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleInput = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:8080/api/users/login", inputData);
      const accessToken = response.data.data.accessToken;
      const refreshToken = response.data.data.refreshToken;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      dispatch(Logins(response.data.data));
      alert("User login successfully");
      navigate("/");
    } catch (error) {
      console.error("error while login", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h1 className="text-3xl font-bold text-yellow-500 text-center mb-4">myzone</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              value={inputData.email}
              onChange={handleInput}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={inputData.password}
              onChange={handleInput}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-md"
          >
            Sign In
          </button>
        </form>
        <div className="text-sm text-gray-500 mt-6 text-center space-y-2">
          <a href="#" className="text-yellow-500 hover:underline">Forgot your password?</a>
          <p>New to myzone? <a href="/register" className="text-yellow-500 hover:underline">Create an account</a></p>
        </div>
      </div>
    </div>
  );
}
