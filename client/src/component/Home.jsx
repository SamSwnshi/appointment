/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login')
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 text-center p-6">
            <h1 className="text-4xl font-bold text-blue-800">Book Your Appointment Anytime, Anywhere!</h1>
            <p className="mt-4 text-lg text-gray-600">Easily schedule your doctor visits with our seamless online booking system.</p>
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition" onClick={handleLogin}>
                Book Now
            </button>
        </div>
    );
};
export default Home;

