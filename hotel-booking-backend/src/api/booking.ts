import express from "express";
import {
  createBooking,
  getBookingsByUser,
  getBookingsByHotel,
} from "../application/booking";

const bookingsRouter = express.Router();

bookingsRouter.route("/").post(createBooking);
bookingsRouter.route("/user/:userId").get(getBookingsByUser);
bookingsRouter.route("/hotel/:hotelId").get(getBookingsByHotel);

export default bookingsRouter;
