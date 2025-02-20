import React, { useEffect, useState } from "react";
import api from "../config/api";
import { format, addDays } from "date-fns";

const CalendarSlotView = ({ doctorId, onSelectDate }) => {
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

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
                className="p-4 bg-blue-100 rounded-lg text-center text-lg cursor-pointer 
                hover:bg-blue-300 transition shadow-md"
              >
                {slot}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarSlotView;
