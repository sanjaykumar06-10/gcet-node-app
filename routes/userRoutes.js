import express from 'express';
import userModel from "../models/userModel.js";

const userRouter = express.Router();

// Register Route
userRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;

  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Save new user
    const user = await userModel.create({
      name,
      email,
      password: pass,  // directly saving password (not secure for production)
    });

    return res.json({ message: "User registered successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Registration failed", error: err.message });
  }
});

// Login Route
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await userModel.findOne({ email, password: pass });
    if (!user) {
      return res.json({ message: "Invalid user or password" });
    }

    // Success
    return res.json({
      name: user.name,
      email: user.email,
      loggedIn: true
    });
  } catch (err) {
    return res.status(500).json({ message: "Login failed", error: err.message });
  }
});

export default userRouter;
