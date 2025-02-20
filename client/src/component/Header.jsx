/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login')
  }
  const handleSingup = () => {
    navigate('/register')
  }
  return (
    <div className="flex justify-between items-center px-6 py-6 bg-blue-700 text-white shadow-md tracking-wider">

      <h1 className="text-2xl font-bold">Prenatal Care</h1>


      <div className="space-x-4">
        <button className="px-4 py-2 bg-white text-blue-700 rounded-md hover:bg-gray-200 transition" onClick={handleLogin}>Login</button>
        <button className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition" onClick={handleSingup}>Signup</button>
      </div>
    </div>
  );
};

export default Header;
