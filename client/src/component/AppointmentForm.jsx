import React, { useState } from "react";
import api from "../config/api";

const AppointmentForm = ({ doctorId, date, onBook }) => {
  const [formData, setFormData] = useState({
    doctorId,
    date,
    duration: 30,
    appointmentType: "",
    patientName: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await api.post("/appointments/create", formData);
      onBook(result.data);
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Book Appointment</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
         
          <select
            name="appointmentType"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled selected>
              Select Appointment Type
            </option>
            <option value="Routine Check-Up">Routine Check-Up</option>
            <option value="Ultrasound">Ultrasound</option>
            <option value="Consultation">Consultation</option>
            <option value="Follow-Up">Follow-Up</option>
          </select>

          
          <input
            type="text"
            name="patientName"
            placeholder="Patient Name"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

      
          <textarea
            name="notes"
            placeholder="Additional Notes (Optional)"
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

      
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
