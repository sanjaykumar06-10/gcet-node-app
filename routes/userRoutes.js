import express from 'express';
import userModel from "../models/userModel.js";

const userRouter = express.Router();

// Register Route
userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await userModel.create({ name, email, password });

    return res.json({ message: "User registered successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Registration failed", error: err.message });
  }
});

// Login Route
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.json({ message: "Invalid user or password" });
    }

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
