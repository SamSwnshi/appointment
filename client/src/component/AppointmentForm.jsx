import React, { useState, useEffect } from "react";
import api from "../config/api";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppointmentForm = () => {
  const location = useLocation();
  const { doctorId, date, slot } = location.state || {};

  const [formData, setFormData] = useState({
    doctorId: doctorId || "",
    date: date ? date.toISOString() : "",
    slot: slot || "",
    duration: 30,
    appointmentType: "",
    patientName: "",
    notes: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Initial form data:", formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.doctorId || !formData.date || !formData.slot || !formData.appointmentType || !formData.patientName) {
      toast.error("Please provide all required fields.");
      return;
    }

    try {
      console.log("Submitting form data:", formData);
      const result = await api.post("/appointments/create", formData);
      console.log("Appointment created successfully:", result.data);

      toast.success("Appointment booked successfully!");
      setTimeout(() => navigate('/appointments'), 2000);
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Book Appointment</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="appointmentType"
            value={formData.appointmentType}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Select Appointment Type</option>
            <option value="Routine Check-Up">Routine Check-Up</option>
            <option value="Ultrasound">Ultrasound</option>
            <option value="Consultation">Consultation</option>
            <option value="Follow-Up">Follow-Up</option>
          </select>

          <input
            type="text"
            name="patientName"
            placeholder="Patient Name"
            value={formData.patientName}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="notes"
            placeholder="Additional Notes (Optional)"
            value={formData.notes}
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
