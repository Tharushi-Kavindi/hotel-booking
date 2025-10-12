import Booking from "../infrastructure/entities/Booking";
import Hotel from "../infrastructure/entities/Hotel";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";
import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";

const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const userId = req.auth().userId;
    const { userId } = getAuth(req);
    console.log("USER_ID", userId);
    const bookingData = req.body;
    if (
      !bookingData.hotelId ||
      !bookingData.startDate ||
      !bookingData.endDate ||
      !bookingData.roomNumber
    ) {
      throw new ValidationError("All fields are required");
    }
    const hotel = await Hotel.findById(bookingData.hotelId);
    if (!hotel) {
      throw new NotFoundError("Hotel not found");
    }
    await Booking.create({
      userId: bookingData.userId,
      hotelId: bookingData.hotelId,
      checkInDate: bookingData.checkInDate,
      checkOutDate: bookingData.checkOutDate,
      roomNumber: bookingData.roomNumber,
      paymentStatus: bookingData.paymentStatus,
    });
    res.status(201).send();
  } catch (error) {
    next(error);
  }
};

const getBookingsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const user = await Booking.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const bookings = await Booking.find({ userId });
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

const getBookingsByHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotelId = req.params.hotelId;
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      throw new NotFoundError("Hotel not found");
    }
    const bookings = await Booking.find({ hotelId });
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

export { createBooking, getBookingsByUser, getBookingsByHotel };
