import { Router } from "express";
import {
  getAllDoctor,
  getAvailableTimeSlots,
  createDoctor,
} from "../controllers/doctor.controllers.js";

const router = Router();

router.post("/create", createDoctor);
router.get("/", getAllDoctor);
router.get("/:id/slots", getAvailableTimeSlots);
export default router;
