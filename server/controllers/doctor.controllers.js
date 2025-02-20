import Doctor from "../models/doctor.models.js";
import Appointment from "../models/appointment.models.js";
import { parseISO, isBefore, format, addMinutes } from "date-fns";

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

export const getAvailabeTimeSlots = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const date = req.query.date ? new Date(req.query.date) : new Date();
    const start = new Date(
      `${date.toISOString().split("T")[0]}T${doctor.workingHours.start}:00`
    );
    const end = new Date(
      `${date.toISOString().split("T")[0]}T${doctor.workingHours.end}:00`
    );

    let slots = [];
    for (
      let time = new Date(start);
      time < end;
      time.setMinutes(time.getMinutes() + 30)
    ) {
      slots.push(new Date(time));
    }

    const appointments = await Appointment.find({
      doctor: doctor._id,
      date: { $gte: start, $lt: end },
    });

    const bookedSlots = new Set(
      appointments.flatMap((appt) => {
        const apptEnd = new Date(appt.date.getTime() + appt.duration * 60000);
        return Array.from({ length: appt.duration / 30 }, (_, i) =>
          new Date(appt.date.getTime() + i * 30 * 60000).toISOString()
        );
      })
    );

    const availabeSlots = slots.filter((slot) => !bookedSlots.has(slot));
    const readableSlots = availabeSlots.map(slot =>
        slot.toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true })
      );
  

      return res.status(200).json({ availabeSlots: readableSlots });
  } catch (error) {
    console.error("Error fetching available slots:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
