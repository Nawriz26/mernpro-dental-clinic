import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getPatients, getPatient, createPatient, updatePatient, deletePatient } from "../controllers/patientController.js";

const router = express.Router();

router.route("/")
  .get(protect, getPatients)
  .post(protect, createPatient);

router.route("/:id")
  .get(protect, getPatient)
  .put(protect, updatePatient)
  .delete(protect, deletePatient);

export default router;
