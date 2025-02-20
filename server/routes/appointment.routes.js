import { Router } from "express";
import {
  getAllAppointment,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointment.controllers.js";

const router = Router();

router.get("/", getAllAppointment);
router.get("/:id", getAppointmentById);
router.post("/create", createAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

export default router;
