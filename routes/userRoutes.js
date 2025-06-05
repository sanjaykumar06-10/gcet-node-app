import express from 'express';
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";  // Optional but recommended
import jwt from "jsonwebtoken"; // Optional, if you want token-based login

const userRouter = express.Router();

// REGISTER
userRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Optional: hash the password
    const hashedPass = await bcrypt.hash(pass, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPass, // 🔑 Match your schema
    });

    return res.json({ message: "User registered successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Registration failed", error: err.message });
  }
});

// LOGIN
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ message: "Invalid user or password" });

    const isMatch = await bcrypt.compare(pass, user.password); // Check hashed password
    if (!isMatch) return res.json({ message: "Invalid user or password" });

    // Optional: Generate a dummy token
    const token = jwt.sign({ id: user._id }, "secretKey"); // Replace "secretKey" with your env var

    return res.json({
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: "Login failed", error: err.message });
  }
});

export default userRouter;
