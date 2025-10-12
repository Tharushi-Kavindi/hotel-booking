import express from "express";
import {
  getAllHotels,
  createHotel,
  getHotelById,
  updateHotel,
  patchHotel,
  deleteHotel,
} from "../application/hotel";
import isAuthenticated from "./middlewear/authentication-middlewear";

const hotelRouter = express.Router();

hotelRouter.get("/", getAllHotels);
hotelRouter.post("/", createHotel);
hotelRouter.get("/:_id", getHotelById);
hotelRouter.put("/:_id", updateHotel);
hotelRouter.patch("/:_id", patchHotel);
hotelRouter.delete("/:_id", isAuthenticated, deleteHotel);

export default hotelRouter;
