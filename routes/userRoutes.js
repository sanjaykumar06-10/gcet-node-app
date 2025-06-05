import express from 'express'
import bcrypt from 'bcrypt'
import userModel from "../models/userModel.js";

const userRouter = express.Router()

// Register new user with hashed password
userRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPass = await bcrypt.hash(pass, 10);

    const newUser = await userModel.create({
      name,
      email,
      pass: hashedPass
    });

    return res.status(201).json({ message: "User registered", userId: newUser._id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Login user: find by email and compare hashed password
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid user or password" });
    }

    const passwordMatch = await bcrypt.compare(pass, user.pass);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid user or password" });
    }

    // On successful login, send user info and token placeholder
    return res.json({ 
      name: user.name,
      email: user.email,
      token: "your-jwt-token-here" // Replace with real JWT token generation later
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default userRouter
