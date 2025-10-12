import Hotel from "../infrastructure/entities/Hotel";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";
import { Request, Response, NextFunction } from "express";
import { CreateHotelDto } from "../domain/dtos/hotel";
import { z } from "zod";

// Controller function to get all hotels
export const getAllHotels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

// Controller function to create a new hotel
export const createHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const HotelData = req.body;
    const result = CreateHotelDto.safeParse(HotelData);
    if (!result.success) {
      throw new ValidationError(`${result.error.message}`);
    }
    await Hotel.create(result.data);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
};

// Controller function to get a specific hotel by ID
export const getHotelById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params._id;
    const hotelData = await Hotel.findById(_id);
    if (!hotelData) {
      throw new NotFoundError("Hotel not found");
    }
    res.status(200).json(hotelData);
  } catch (error) {
    next(error);
  }
};

// Controller function to update a hotel completely
export const updateHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params._id;
    const hotelData = req.body;
    if (
      !hotelData.name ||
      !hotelData.image ||
      !hotelData.location ||
      !hotelData.price ||
      !hotelData.description
    ) {
      throw new ValidationError("Invalid hotel data");
    }
    const hotel = await Hotel.findById(_id);
    if (!hotel) {
      throw new NotFoundError("Hotel not found");
    }

    await Hotel.findByIdAndUpdate(_id, hotelData);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

// Controller function to partially update a hotel (patch)
export const patchHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params._id;
    const hotelData = req.body;
    if (!hotelData.price) {
      throw new ValidationError("Price is required");
    }
    const hotel = await Hotel.findById(_id);
    if (!hotel) {
      throw new NotFoundError("Hotel not found");
    }
    await Hotel.findByIdAndUpdate(_id, { price: hotelData.price });
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

// Controller function to delete a hotel
export const deleteHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params._id;
    const hotel = await Hotel.findById(_id);
    if (!hotel) {
      throw new NotFoundError("Hotel not found");
    }
    await Hotel.findByIdAndDelete(_id);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};
