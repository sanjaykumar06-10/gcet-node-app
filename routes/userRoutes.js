import express from 'express'
import bcrypt from 'bcrypt'
import userModel from "../models/userModel.js";

const userRouter = express.Router()

// Register route — hash password before saving
userRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPass = await bcrypt.hash(pass, 10);

    // Create user with hashed password
    const newUser = await userModel.create({ name, email, pass: hashedPass });

    return res.status(201).json({ message: "User registered", userId: newUser._id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Login route — find by email, compare hashed password
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid user or password" });
    }

    // Compare password with bcrypt
    const isMatch = await bcrypt.compare(pass, user.pass);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid user or password" });
    }

    // Successful login — respond with user data and token placeholder
    return res.json({ name: user.name, email: user.email, token: "your-jwt-token" });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default userRouter;
