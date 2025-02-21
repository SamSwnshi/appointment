import React, { useEffect, useState } from "react";
import api from "../config/api";
import { format, addDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CalendarSlotView = ({ doctorId, onSelectDate }) => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const result = await api.get(`/doctors/${doctorId}/slots`, {
          params: { date: selectedDate.toISOString().split("T")[0] },
        });
        setAvailableSlots(result.data.slots.available || []);
        setBookedSlots(result.data.slots.booked || []);
        toast.success("Slots loaded successfully!");
      } catch (error) {
        console.error("Error fetching slots:", error);
        toast.error("Failed to load slots.");
      }
    };
    fetchSlots();
  }, [doctorId, selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onSelectDate(date);
  };

  const handleSlotSelect = (slot) => {
    if (bookedSlots.includes(slot)) {
      toast.warning("This slot is already booked.");
      return;
    }
    setSelectedSlot(slot);
    toast.info(`Selected slot: ${slot}`);
  };

  const handleBooking = () => {
    if (selectedSlot) {
      toast.success("Proceeding to booking...");
      navigate("/book", { state: { doctorId, date: selectedDate, slot: selectedSlot } });
    }
  };

  const renderDays = () => {
    return [...Array(7)].map((_, i) => {
      const day = addDays(new Date(), i);
      return (
        <button
          key={i}
          onClick={() => handleDateChange(day)}
          className={`px-6 py-3 rounded-lg shadow-md transition text-lg
            ${selectedDate.toDateString() === day.toDateString()
              ? "bg-blue-600 text-white"
              : "bg-gray-300 hover:bg-blue-400 hover:text-white"
            }`}
        >
          {format(day, "EEE, MMM d")}
        </button>
      );
    });
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Select a Date</h2>

        <div className="flex justify-between space-x-3 mb-8 overflow-x-auto">
          {renderDays()}
        </div>

        <h3 className="text-xl font-semibold mb-4 text-gray-700 text-center">
          Available Slots on {format(selectedDate, "MMMM d, yyyy")}
        </h3>

        {availableSlots.length === 0 ? (
          <p className="text-red-500 text-center text-lg">No available slots</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {availableSlots.map((slot, index) => (
              <button
                key={index}
                onClick={() => handleSlotSelect(slot)}
                className={`p-4 rounded-lg text-center text-lg cursor-pointer transition shadow-md
                  ${bookedSlots.includes(slot) ? "bg-red-300 cursor-not-allowed" : selectedSlot === slot ? "bg-green-300" : "bg-blue-100 hover:bg-blue-300"}`}
                disabled={bookedSlots.includes(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={handleBooking}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          disabled={!selectedSlot}
        >
          Proceed to Book
        </button>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default CalendarSlotView;
