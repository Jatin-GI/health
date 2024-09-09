import jwt from "jsonwebtoken";
import User from "../model/User.js";
// import { compare } from "bcrypt";
import pkg from "bcryptjs";
// import { renameSync, unlinkSync } from "fs";
const { compare } = pkg;
const maxAge = 3 * 24 * 60 * 1000;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

export const signup = async (request, response, next) => {
  try {
    const { name, email, password } = request.body; // Include name in the request body
    if (!name || !email || !password) {
      return response
        .status(400)
        .send("Name, email, and password are required");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(400).send("User already exists");
    }

    // Create new user with name, email, and password
    const user = await User.create({ name, email, password });
    response.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    return response.status(201).json({
      user: {
        id: user.id,
        name: user.name, // Include name in the response
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error); // Ensure full error is logged
    return response.status(500).send("Internal server error");
  }
};

export const login = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).send("email and password is required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(400).send("No user found");
    }

    const auth = await compare(password, user.password);
    if (!auth) {
      return response.status(400).send("Invalid Credentials");
    }

    response.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    return response.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        // profileSetup: user.profileSetup,
        // firstName: user.firstName,
        // lastName: user.lastName,
        // image: user.image,
        // color: user.color,
        name: user.name,
      },
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal sserver error");
  }
};

export const getUserInfo = async (request, response, next) => {
  try {
    const userData = await User.findById(request.userId);

    if (!userData) {
      return response
        .status(404)
        .json({ message: "User with the given ID is not found" });
    }

    return response.status(200).json({
      id: userData.id,
      email: userData.email,
      name: userData.name,
    });
  } catch (error) {
    console.error("Error fetching user info:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
};
// Logout (optional)
export const logout = async (request, response, next) => {
  try {
    response.cookie("jwt", "", { maxAge: 1, secure: true, sameSite: "None" });
    return response.status(200).send("Log out successfully");
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal sserver error");
  }
};
