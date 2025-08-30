import express from "express";
import "dotenv/config";
import hotelRouter from "./api/hotel.js";
import connectDB from "./infrastructure/db.js";

const app = express();

//Convert HTTP payloads into JS objects
app.use(express.json());

const PORT = 8000;
app.listen(PORT, () => {
  console.log("Server is listening on port: ", PORT);
});

connectDB();

app.use("/api/hotels", hotelRouter);
