import React, { useEffect, useState } from "react";
import api from "../config/api";
import { useNavigate } from "react-router-dom";
const DoctorList = ({ onSelectDoctor }) => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const result = await api.get("/doctors");
        console.log("API Response:", result.data); // Debugging

        // ✅ Extract the doctors array
        setDoctors(Array.isArray(result.data.doctors) ? result.data.doctors : []);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const handleDoctorSelect = (doctorId) => {
    onSelectDoctor(doctorId);
    navigate('/slots'); 
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Select a Doctor</h2>

      {doctors.length === 0 ? (
        <p className="text-gray-500">No doctors available</p>
      ) : (
        <ul className="space-y-2">
          {doctors.map((doctor) => (
            <li
              key={doctor._id}
              onClick={() => handleDoctorSelect(doctor._id)}
              className="p-3 bg-white rounded-lg shadow hover:bg-blue-100 cursor-pointer"
            >
              <h3 className="font-semibold">{doctor.name}</h3>
              <p className="text-sm text-gray-600">{doctor.specialization}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorList;
