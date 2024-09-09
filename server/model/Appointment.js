import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  doctorId: { type: String, required: true },
  speciality: { type: String, required: true },
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);
export default Appointment;
