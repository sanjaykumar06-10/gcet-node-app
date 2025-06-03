import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  orderValue: { type: Number, required: true }
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
