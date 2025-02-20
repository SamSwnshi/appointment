import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import dotenv from "dotenv";
import config from "./db/config.js";

import doctorRoutes from "./routes/doctor.routes.js"

const app = express();

dotenv.config()

const port = process.env.PORT || 8000;

app.use(cors());
app.use(cookieparser())

app.use('/api/doctors',doctorRoutes)

app.listen(port,()=>{
  console.log(`Server is Running in Port: ${port}`)
  config()
})