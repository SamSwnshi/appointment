import Appointment from "../models/appointment.models.js";
import Doctor from "../models/doctor.models.js";
export const getAllAppointment = async (req, res) => {
  try {
    const getAppointment = await Appointment.find().populate(
      "doctorId",
      "name"
    );
    return res
      .status(200)
      .json({ getAppointment, message: "All Appointment Fetched!" });
  } catch (error) {
    console.error("Error fetching appointments:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate(
      "doctorId",
      "name"
    );
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    return res
      .status(200)
      .json({ appointment, message: "Fetched Appointment By Id!" });
  } catch (error) {}
};


export const createAppointment = async (req, res) => {
  const { doctorId, date, duration, appointmentType, patientName, notes } = req.body;

  console.log("Received appointment request:", req.body); // Debugging log

  if (!doctorId || !date || !duration || !appointmentType || !patientName) {
    return res.status(400).json({ message: "Please provide all required fields." });
  }

  try {
    const newAppointment = new Appointment({
      doctorId,
      date: new Date(date),
      duration,
      appointmentType,
      patientName,
      notes,
    });

    const appointment = await newAppointment.save();
    return res.status(201).json({
      message: "Appointment created successfully",
      data: appointment,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const updateAppointment = async (req, res) => {
  const { doctorId, date, duration, appointmentType, patientName, notes } =
    req.body;
  try {
    let appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.doctorId = doctorId || appointment.doctorId;
    appointment.date = date || appointment.date;
    appointment.duration = duration || appointment.duration;
    appointment.appointmentType = appointmentType || appointment.appointmentType;
    appointment.patientName = patientName || appointment.patientName;
    appointment.notes = notes || appointment.notes;

    await appointment.save();
    return res.status(200).json({
      message: "Appointment updated successfully",
      data: appointment,
    });
  } catch (error) {
    console.error("Error updating appointment:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    await Appointment.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ message: "Appointment removed successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
