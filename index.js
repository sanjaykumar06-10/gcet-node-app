import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
app.listen(8080,()=>{
    mongoose.connect("mongodb://localhost:27017/gcet");
    console.log("server started in port 8080");
});
const userSchema=mongoose.Schema({
  name :{type :String},
});
const user=mongoose.model("User",userSchema);
app.get("register", async (req, res) => {
  const result = await user.insertOne({name: "John"});
  return res.json(result);
});
app.listen(8080, () => {
  console.log("Server Started");
});
app.use(cors());
app.get("/", (req, res) => {
  return res.send("Good Morning");
});


app.get("/greet", (req, res) => {
  res.send("Greetings");
});

app.get("/name", (req, res) => {
  res.send("SANJAY");
});

app.get("/weather", (req, res) => {
  res.send("37degree");
});

app.get("/products", (req, res) => {
  const products = [
    { name: "Laptop", price: 34000 },
    { name: "KeyBoard", price: 1200 },
    { name: "Mouse", price: 900 },
    
  ];
  res.json(products);
});
