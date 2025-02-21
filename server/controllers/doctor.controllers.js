import Doctor from "../models/doctor.models.js";
import Appointment from "../models/appointment.models.js";
import { parseISO, isBefore, format, addMinutes } from "date-fns";
import axios from "axios";

export const getAllDoctor = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    return res
      .status(200)
      .json({ doctors, message: "Doctor Fetched Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createDoctor = async (req, res) => {
  const { name, workingHours, specialization } = req.body;
  try {
    if (!name || !workingHours?.start || !workingHours?.end || !specialization) {
      return res
        .status(400)
        .json({ message: "Please provide name, workingHours (start & end), and specialization." });
    }
    const existingDoctor = await Doctor.findOne({ name });
    if (existingDoctor) {
      return res
        .status(400)
        .json({ message: "A Doctor with this name already exist!" });
    }
    const newDoctor = new Doctor({
      name,
      workingHours: {
        start: workingHours.start,
        end: workingHours.end,
      },
      specialization,
    });

    const doctor = await newDoctor.save();

    return res
      .status(201)
      .json({ data: doctor, message: "Doctor Created Successfully!" });
  } catch (error) {
    console.error("Error creating doctor:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


// export const getAvailableTimeSlots = async (req, res) => {
//   try {
//     const doctor = await Doctor.findById(req.params.id);
//     if (!doctor || !doctor.workingHours) {
//       return res.status(404).json({ message: "Doctor not found or working hours not set" });
//     }

//     const date = req.query.date ? new Date(req.query.date) : new Date();
//     const formattedDate = date.toISOString().split("T")[0]; // Format as YYYY-MM-DD

//     const [startHour, startMinute] = doctor.workingHours.start.split(":").map(Number);
//     const [endHour, endMinute] = doctor.workingHours.end.split(":").map(Number);

//     const start = new Date(date);
//     start.setHours(startHour, startMinute, 0, 0);

//     const end = new Date(date);
//     end.setHours(endHour, endMinute, 0, 0);

//     // **Step 1: Fetch all appointments**
//     const response = await axios.get("http://localhost:8000/api/appointments");
//     console.log("Appointments API response:", response.data);
    
//     if (!response.data || !Array.isArray(response.data.getAppointment)) {
//       return res.status(500).json({ message: "Invalid appointment data received" });
//     }

//     const allAppointments = response.data.getAppointment;

//     // **Step 2: Check if appointments have `_id` and `doctorId` before filtering**
//     const doctorAppointments = allAppointments.filter((appt) => {
//       if (!appt._id || !appt.doctorId || !appt.date) {
//         console.warn(`Skipping invalid appointment: ${JSON.stringify(appt)}`);
//         return false;
//       }

//       const appointmentDate = new Date(appt.date).toISOString().split("T")[0]; // Extract YYYY-MM-DD
//       return (
//         appt.doctorId.toString() === doctor._id.toString() &&
//         appointmentDate === formattedDate
//       );
//     });

//     if (doctorAppointments.length > 0) {
//       // **Doctor has existing bookings, return only booked slots**
//       return res.status(200).json({
//         message: "Doctor has existing appointments on this date",
//         bookedSlots: doctorAppointments.map((appt) => ({
//           time: new Date(appt.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }),
//           patientName: appt.patientName,
//         })),
//         totalBooked: doctorAppointments.length,
//       });
//     }

//     // **Step 3: If no bookings, generate all available slots**
//     let availableSlots = [];
//     for (let time = new Date(start); time < end; time.setMinutes(time.getMinutes() + 30)) {
//       availableSlots.push(
//         new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })
//       );
//     }

//     return res.status(200).json({
//       message: "Doctor has no bookings, all slots available",
//       availableSlots,
//     });
//   } catch (error) {
//     console.error("Error fetching available slots:", error.message);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

export const getAvailableTimeSlots = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const date = req.query.date ? new Date(req.query.date) : new Date();
    console.log("Requested date:", date.toISOString());


    const start = new Date(`${date.toISOString().split("T")[0]}T${doctor.workingHours.start}:00`);
    const end = new Date(`${date.toISOString().split("T")[0]}T${doctor.workingHours.end}:00`);
    console.log("Start time:", start.toISOString(), "End time:", end.toISOString());

    let slots = [];
    for (
      let time = new Date(start);
      time < end;
      time.setMinutes(time.getMinutes() + 30)
    ) {
      slots.push(new Date(time));
    }
    console.log("Generated slots:", slots);

    const appointments = await Appointment.find({
      doctor: doctor._id,
      date: { $gte: start, $lt: end },
    });
    console.log("Appointments found:", appointments);

    const bookedSlots = new Set(
      appointments.flatMap((appt) => {
        const apptEnd = new Date(appt.date.getTime() + appt.duration * 60000);
        return Array.from({ length: appt.duration / 30 }, (_, i) =>
          new Date(appt.date.getTime() + i * 30 * 60000).toISOString()
        );
      })
    );
    console.log("Booked slots:", bookedSlots);

    const availableSlots = slots.filter((slot) => !bookedSlots.has(slot.toISOString()));
    const readableSlots = {
      available: availableSlots.map(slot =>
        slot.toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true })
      ),
      booked: Array.from(bookedSlots).map(slot =>
        new Date(slot).toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true })
      ),
    };
    console.log("Available slots:", readableSlots.available);
    console.log("Booked slots in response:", readableSlots.booked);

    return res.status(200).json({ slots: readableSlots });
  } catch (error) {
    console.error("Error fetching available slots:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
