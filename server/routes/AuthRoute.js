import { Router } from "express";
import {
  getUserInfo,
  login,
  signup,
  logout,
} from "../controller/authController.js";
import { verifyToken } from "../middleware/Authmiddleware.js";

const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/user-info", verifyToken, getUserInfo);
authRoutes.post("/logout", logout);
authRoutes.get("/check", (req, res) => {
  res.status(200).json({ message: "User is authenticated" });
});

export default authRoutes;
