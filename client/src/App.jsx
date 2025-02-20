/* eslint-disable no-unused-vars */
import React,{useState} from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './component/Home';
import Header from './component/Header';
import Login from "./component/Login";
import Signup from "./component/Signup";
import DoctorList from './component/DoctorList';

function App() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Router>
      <div className="h-screen flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/doctor-list" element={<DoctorList onSelectDoctor={setSelectedDoctor} />} />
      </Routes>
      </div>
    </Router>
  )
}

export default App
