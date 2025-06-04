import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import ordersRouter from "./routes/ordersRoutes.js"

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", ordersRouter);

app.listen(8080, () => {
  mongoose.connect(`${MONGODB_URI}`);
  console.log("Server Started");
});