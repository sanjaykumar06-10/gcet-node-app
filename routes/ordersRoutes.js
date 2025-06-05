import express from "express";
import Order from "../models/ordersModel.js";

const router = express.Router();

// Get orders by user email
router.get("/:email", async (req, res) => {
  try {
    const orders = await Order.find({ email: req.params.email });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
});

// Create new order
router.post("/new", async (req, res) => {
  const { email, products, orderValue } = req.body;

  if (!email || !products || products.length === 0) {
    return res.status(400).json({ message: "Invalid order data" });
  }

  try {
    const order = await Order.create({
      email,
      products,
      orderValue,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error });
  }
});

export default router;
