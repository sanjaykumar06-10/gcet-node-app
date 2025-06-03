import express from "express";
import Order from "../models/ordersModel.js";

const router = express.Router();

router.get("/:email", async (req, res) => {
  const orders = await Order.find({ email: req.params.email });
  res.json(orders);
});


router.post("/new", async (req, res) => {
  const { email, orderValue } = req.body;
  const order = await Order.create({ email, orderValue });
  res.json(order);
});

export default router;
