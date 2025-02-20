import React, { useEffect, useState } from "react";
import api from "../config/api";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const result = await api.get("/appointments");
        console.log(result.data.getAppointment)
        setAppointments(result.data.getAppointment
            || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/appointments/${id}`);
      setAppointments(appointments.filter((appt) => appt._id !== id));
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedAppointment = {
        ...editingAppointment,
        appointmentType: e.target.appointmentType.value,
        patientName: e.target.patientName.value,
        notes: e.target.notes.value,
      };
      await api.put(`/appointments/${editingAppointment._id}`, updatedAppointment);
      setAppointments(appointments.map(appt =>
        appt._id === editingAppointment._id ? updatedAppointment : appt
      ));
      setEditingAppointment(null);
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Your Appointments</h2>

        {appointments.length === 0 ? (
          <p className="text-center text-gray-500">No appointments found.</p>
        ) : (
          <ul className="space-y-4">
            {appointments.map((appt) => (
              <li
                key={appt._id}
                className="flex justify-between items-center p-4 bg-gray-50 border border-gray-300 rounded-lg"
              >
                <div>
                  <p className="font-semibold">{appt.appointmentType}</p>
                  <p className="text-gray-600">
                    {new Date(appt.date).toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEdit(appt)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(appt._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {editingAppointment && (
          <form onSubmit={handleUpdate} className="mt-6 space-y-4">
            <div>
              <label className="block text-gray-700">Appointment Type</label>
              <input
                type="text"
                name="appointmentType"
                defaultValue={editingAppointment.appointmentType}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Patient Name</label>
              <input
                type="text"
                name="patientName"
                defaultValue={editingAppointment.patientName}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Notes</label>
              <textarea
                name="notes"
                defaultValue={editingAppointment.notes}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AppointmentList;
