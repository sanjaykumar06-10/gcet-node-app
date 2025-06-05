import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String }, // ✅ must match your backend field
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
