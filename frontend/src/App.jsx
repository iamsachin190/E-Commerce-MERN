import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Cart from "./components/common/Cart";
import { useEffect } from "react";
import { login } from "./store/authSlice";
import { useDispatch } from "react-redux";
import getUserProfile from "./components/authService/GetUserProfile";
import AccountPage from "./components/pages/AccountPage";
import DashboardPage from "./components/pages/DashboardPage"; // Importing the DashboardPage

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeSession = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const user = await getUserProfile();
          if (user) {
            dispatch(login(user));
          }
        } catch (error) {
          console.error("Session check failed:", error);
        }
      }
    };

    initializeSession();
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/dashboard" element={<DashboardPage />} /> {/* New route for Dashboard */}
        </Routes>
      </div>
    </Router>
  );
}
