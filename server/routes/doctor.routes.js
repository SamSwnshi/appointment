import { Router } from "express";
import {
  getAllDoctor,
  getAvailabeTimeSlots,
  createDoctor,
} from "../controllers/doctor.controllers.js";

const router = Router();

router.post("/create", createDoctor);
router.get("/", getAllDoctor);
router.get("/:id/slots", getAvailabeTimeSlots);
export default router;
