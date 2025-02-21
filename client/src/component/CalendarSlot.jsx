import React, { useEffect, useState } from "react";
import api from "../config/api";
import { format, addDays } from "date-fns";
import { useNavigate } from "react-router-dom";

const CalendarSlotView = ({ doctorId, onSelectDate }) => {
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const result = await api.get(`/doctors/${doctorId}/slots`, {
          params: { date: selectedDate.toISOString().split("T")[0] },
        });
        setSlots(result.data.availableSlots || []);
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };
    fetchSlots();
  }, [doctorId, selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onSelectDate(date);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    console.log("Selected slot:", slot); // Log the selected slot
  };

  const handleBooking = () => {
    if (selectedSlot) {
      console.log("Navigating with slot:", selectedSlot); // Log the slot being passed
      navigate('/book', { state: { doctorId, date: selectedDate, slot: selectedSlot } });
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

        {/* Date Selector */}
        <div className="flex justify-between space-x-3 mb-8 overflow-x-auto">
          {renderDays()}
        </div>

        {/* Slots Display */}
        <h3 className="text-xl font-semibold mb-4 text-gray-700 text-center">
          Available Slots on {format(selectedDate, "MMMM d, yyyy")}
        </h3>

        {slots.length === 0 ? (
          <p className="text-red-500 text-center text-lg">No available slots</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {slots.map((slot, index) => (
              <button
                key={index}
                onClick={() => handleSlotSelect(slot)}
                className={`p-4 rounded-lg text-center text-lg cursor-pointer transition shadow-md
                  ${selectedSlot === slot ? "bg-green-300" : "bg-blue-100 hover:bg-blue-300"}`}
              >
                {slot}
              </button>
            ))}
          </div>
        )}

        {/* Booking Button */}
        <button
          onClick={handleBooking}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          disabled={!selectedSlot}
        >
          Proceed to Book
        </button>
      </div>
    </div>
  );
};

export default CalendarSlotView;
