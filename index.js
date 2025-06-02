import express from "express";
import cors from "cors";
const app = express();
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
