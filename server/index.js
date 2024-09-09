import express from "express";
import colors from "colors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import appoitmentRoute from "./routes/AppointmentRoute.js";
import authRoutes from "./routes/AuthRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const port = process.env.port || 8080;
const database = process.env.DATABASE_URL;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/api/appointments", appoitmentRoute);
app.use("/api/auth", authRoutes);

const server = app.listen(port, () => {
  console.log(`server is listen at ${port}`.bgBlue);
});

mongoose
  .connect(database)
  .then(() => console.log(`db is connected ${database}`.bgGreen))
  .catch((err) => console.log(err.message));
