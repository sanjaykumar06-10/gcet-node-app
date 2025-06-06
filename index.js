import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import ordersRouter from "./routes/ordersRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

// Routes
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", ordersRouter);

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// ✅ Instead of app.listen, export the app
export default app;
