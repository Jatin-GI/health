import { Router } from "express";
import {
  createAppoitment,
  deleteAppointment,
  getAllAppointments,
  getAppointmentById,
} from "../controller/AppoitmentController.js";

const appoitmentRoute = Router();

appoitmentRoute.post("/crete-appoitment", createAppoitment);
appoitmentRoute.get("/:id", getAppointmentById);
appoitmentRoute.get("/", getAllAppointments);
appoitmentRoute.delete("/:id", deleteAppointment);

export default appoitmentRoute;
