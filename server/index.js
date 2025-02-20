// console.log("Server Started")
// const mongoose = require('mongoose');

// const doctorSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   workingHours: {
//     start: { type: String, required: true },
//     end: { type: String, required: true },
//   },
//   specialization: { type: String },
// });

// module.exports = mongoose.model('Doctor', doctorSchema);
// const mongoose = require('mongoose');

// const appointmentSchema = new mongoose.Schema({
//   doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
//   date: { type: Date, required: true },
//   duration: { type: Number, required: true },
//   appointmentType: { type: String, required: true },
//   patientName: { type: String, required: true },
//   notes: { type: String },
// });

// module.exports = mongoose.model('Appointment', appointmentSchema);
// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect('mongodb://localhost:27017/prenatal_care', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected');
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
// const express = require('express');
// const router = express.Router();
// const { getDoctors, getAvailableSlots } = require('../controllers/doctorController');

// router.get('/', getDoctors);
// router.get('/:id/slots', getAvailableSlots);

// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const {
//   getAppointments,
//   getAppointment,
//   createAppointment,
//   updateAppointment,
//   deleteAppointment,
// } = require('../controllers/appointmentController');

// router.get('/', getAppointments);
// router.get('/:id', getAppointment);
// router.post('/', createAppointment);
// router.put('/:id', updateAppointment);
// router.delete('/:id', deleteAppointment);

// module.exports = router;
// const Doctor = require('../models/Doctor');
// const Appointment = require('../models/Appointment');
// const { parseISO, format, addMinutes, isBefore } = require('date-fns');

// exports.getDoctors = async (req, res) => {
//   try {
//     const doctors = await Doctor.find();
//     res.json(doctors);
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// };

// exports.getAvailableSlots = async (req, res) => {
//   try {
//     const doctor = await Doctor.findById(req.params.id);
//     const date = req.query.date ? parseISO(req.query.date) : new Date();
//     const start = parseISO(`${format(date, 'yyyy-MM-dd')}T${doctor.workingHours.start}:00`);
//     const end = parseISO(`${format(date, 'yyyy-MM-dd')}T${doctor.workingHours.end}:00`);

//     let slots = [];
//     for (let time = start; isBefore(time, end); time = addMinutes(time, 30)) {
//       slots.push(time);
//     }

//     const appointments = await Appointment.find({ doctorId: doctor._id, date: { $gte: start, $lt: end } });
//     const bookedSlots = appointments.flatMap(appt => {
//       const apptEnd = addMinutes(appt.date, appt.duration);
//       return Array.from({ length: appt.duration / 30 }, (_, i) => addMinutes(appt.date, i * 30));
//     });

//     const availableSlots = slots.filter(slot => !bookedSlots.includes(slot));
//     res.json(availableSlots);
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// };
// const Appointment = require('../models/Appointment');

// exports.getAppointments = async (req, res) => {
//   try {
//     const appointments = await Appointment.find().populate('doctorId', 'name');
//     res.json(appointments);
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// };

// exports.getAppointment = async (req, res) => {
//   try {
//     const appointment = await Appointment.findById(req.params.id).populate('doctorId', 'name');
//     if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });
//     res.json(appointment);
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// };

// exports.createAppointment = async (req, res) => {
//   const { doctorId, date, duration, appointmentType, patientName, notes } = req.body;
//   try {
//     const newAppointment = new Appointment({
//       doctorId,
//       date,
//       duration,
//       appointmentType,
//       patientName,
//       notes,
//     });

//     const appointment = await newAppointment.save();
//     res.json(appointment);
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// };

// exports.updateAppointment = async (req, res) => {
//   const { doctorId, date, duration, appointmentType, patientName, notes } = req.body;
//   try {
//     let appointment = await Appointment.findById(req.params.id);
//     if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });

//     appointment.doctorId = doctorId;
//     appointment.date = date;
//     appointment.duration = duration;
//     appointment.appointmentType = appointmentType;
//     appointment.patientName = patientName;
//     appointment.notes = notes;

//     await appointment.save();
//     res.json(appointment);
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// };

// exports.deleteAppointment = async (req, res) => {
//   try {
//     const appointment = await Appointment.findById(req.params.id);
//     if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });

//     await Appointment.findByIdAndRemove(req.params.id);
//     res.json({ msg: 'Appointment removed' });
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// };
// const express = require('express');
// const bodyParser = require('body-parser');
// const connectDB = require('./config/db');

// const app = express();

// // Connect Database
// connectDB();

// // Init Middleware
// app.use(bodyParser.json());

// // Define Routes
// app.use('/api/doctors', require('./routes/doctorRoutes'));
// app.use('/api/appointments', require('./routes/appointmentRoutes'));

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api',
// });

// export const getDoctors = () => api.get('/doctors');
// export const getAvailableSlots = (doctorId, date) =>
//   api.get(`/doctors/${doctorId}/slots`, { params: { date } });
// export const createAppointment = (appointment) => api.post('/appointments', appointment);
// export const getAppointments = () => api.get('/appointments');
// export const updateAppointment = (id, appointment) => api.put(`/appointments/${id}`, appointment);
// export const deleteAppointment = (id) => api.delete(`/appointments/${id}`);
// import React, { useEffect, useState } from 'react';
// import { getDoctors } from '../services/api';

// const DoctorList = ({ onSelectDoctor }) => {
//   const [doctors, setDoctors] = useState([]);

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       const result = await getDoctors();
//       setDoctors(result.data);
//     };
//     fetchDoctors();
//   }, []);

//   return (
//     <div>
//       <h2>Select a Doctor</h2>
//       <ul>
//         {doctors.map((doctor) => (
//           <li key={doctor._id} onClick={() => onSelectDoctor(doctor._id)}>
//             {doctor.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DoctorList;
// import React, { useEffect, useState } from 'react';
// import { getDoctors } from '../services/api';

// const DoctorList = ({ onSelectDoctor }) => {
//   const [doctors, setDoctors] = useState([]);

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       const result = await getDoctors();
//       setDoctors(result.data);
//     };
//     fetchDoctors();
//   }, []);

//   return (
//     <div>
//       <h2>Select a Doctor</h2>
//       <ul>
//         {doctors.map((doctor) => (
//           <li key={doctor._id} onClick={() => onSelectDoctor(doctor._id)}>
//             {doctor.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DoctorList;
// import React, { useEffect, useState } from 'react';
// import { getAvailableSlots } from '../services/api';
// import { format } from 'date-fns';

// const SlotView = ({ doctorId, date }) => {
//   const [slots, setSlots] = useState([]);

//   useEffect(() => {
//     const fetchSlots = async () => {
//       const result = await getAvailableSlots(doctorId, date);
//       setSlots(result.data);
//     };
//     fetchSlots();
//   }, [doctorId, date]);

//   return (
//     <div>
//       <h2>Available Slots on {format(new Date(date), 'MMMM d, yyyy')}</h2>
//       <ul>
//         {slots.map((slot, index) => (
//           <li key={index}>{format(slot, 'hh:mm a')}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SlotView;
// import React, { useState } from 'react';
// import { createAppointment } from '../services/api';

// const AppointmentForm = ({ doctorId, date, onBook }) => {
//   const [formData, setFormData] = useState({
//     doctorId,
//     date,
//     duration: 30,
//     appointmentType: '',
//     patientName: '',
//     notes: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const result = await createAppointment(formData);
//     onBook(result.data);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="appointmentType" placeholder="Appointment Type" onChange={handleChange} required />
//       <input type="text" name="patientName" placeholder="Patient Name" onChange={handleChange} required />
//       <textarea name="notes" placeholder="Notes" onChange={handleChange}></textarea>
//       <button type="submit">Book Appointment</button>
//     </form>
//   );
// };

// export default AppointmentForm;
// import React, { useEffect, useState } from 'react';
// import { getAppointments, deleteAppointment } from '../services/api';
// import { format } from 'date-fns';

// const AppointmentList = () => {
//   const [appointments, setAppointments] = useState([]);

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       const result = await getAppointments();
//       setAppointments(result.data);
//     };
//     fetchAppointments();
//   }, []);

//   const handleDelete = async (id) => {
//     await deleteAppointment(id);
//     setAppointments(appointments.filter(appt => appt._id !== id));
//   };

//   return (
//     <div>
//       <h2>Your Appointments</h2>
//       <ul>
//         {appointments.map((appt) => (
//           <li key={appt._id}>
//             {format(new Date(appt.date), 'MMMM d, yyyy hh:mm a')} - {appt.appointmentType}
//             <button onClick={() => handleDelete(appt._id)}>Cancel</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AppointmentList;
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import DoctorList from './components/DoctorList';
// import SlotView from './components/SlotView';
// import AppointmentForm from './components/AppointmentForm';
// import AppointmentList from './components/AppointmentList';

// const App = () => {
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   return (
//     <Router>
//       <div>
//         <DoctorList onSelectDoctor={setSelectedDoctor} />
//         {selectedDoctor && (
//           <div>
//             <input
//               type="date"
//               value={selectedDate.toISOString().split('T')[0]}
//               onChange={(e) => setSelectedDate(e.target.value)}
//             />
//             <SlotView doctorId={selectedDoctor} date={selectedDate} />
//             <AppointmentForm doctorId={selectedDoctor} date={selectedDate} onBook={() => {}} />
//           </div>
//         )}
//         <AppointmentList />
//       </div>
//     </Router>
//   );
// };

// export default App;
