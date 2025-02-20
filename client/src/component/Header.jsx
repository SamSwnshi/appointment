/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {

    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    checkAuth(); 

  
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/register");
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout"); 
      localStorage.removeItem("token"); 
      setIsAuthenticated(false);
      toast.success("Logged out successfully!");
      navigate("/login"); 
    } catch (error) {
      toast.error("Logout failed! Please try again.");
    }
  };

  return (
    <div className="relative flex justify-between items-center px-6 py-6 bg-blue-700 text-white shadow-md tracking-wider">
      <h1 className="text-2xl font-bold">Prenatal Care</h1>

      {!isAuthenticated ? (
        <div className="absolute top-4 right-6 space-x-4">
          <button
            className="px-4 py-2 bg-white text-blue-700 rounded-md hover:bg-gray-200 transition"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition"
            onClick={handleSignup}
          >
            Signup
          </button>
        </div>
      ) : (
        <button
          className="absolute top-4 right-6 px-4 py-2 bg-red-500 rounded-md hover:bg-red-600 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Header;
