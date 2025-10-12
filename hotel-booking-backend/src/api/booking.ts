import express from "express";
import {
  createBooking,
  getBookingsByUser,
  getBookingsByHotel,
} from "../application/booking";

const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);
bookingRouter.get("/user/:userId", getBookingsByUser);
bookingRouter.get("/hotel/:hotelId", getBookingsByHotel);

export default bookingRouter;
