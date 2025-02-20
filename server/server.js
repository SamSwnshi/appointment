import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import config from "./db/config.js";

import authRoutes from "./routes/auth.routes.js"
import doctorRoutes from "./routes/doctor.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";

const app = express();

dotenv.config()

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json())

app.use("/api",authRoutes)
app.use('/api/doctors',doctorRoutes)
app.use('/api/appointments',appointmentRoutes)

app.listen(port,()=>{
  console.log(`Server is Running in Port: ${port}`)
  config()
})