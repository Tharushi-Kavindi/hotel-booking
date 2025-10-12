import express from "express";
import "dotenv/config";
import cors from "cors";
import hotelRouter from "./api/hotel";
import reviewsRouter from "./api/review";
import connectDB from "./infrastructure/db";
import bookingRouter from "./api/booking";
import locationsRouter from "./api/location";
import globalErrorHandlingMiddleware from "./api/middlewear/global-error-handling-middlewear";
import { clerkMiddleware } from "@clerk/express";

const app = express();

app.use(clerkMiddleware()); // Reads the JWT from the request and sets the auth object on the request

//Convert HTTP payloads into JS objects
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api/hotels", hotelRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/locations", locationsRouter);

app.use(globalErrorHandlingMiddleware);
connectDB();

const PORT = 8000;
app.listen(PORT, () => {
  console.log("Server is listening on port: ", PORT);
});
