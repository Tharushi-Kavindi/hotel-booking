import express from "express";
import { createReview, getReviewsForHotel } from "../application/review";

const reviewsRouter = express.Router();

reviewsRouter.route("/").post(createReview);
reviewsRouter.route("/hotel/:hotelId").get(getReviewsForHotel); //! /api/reviews/hotel/:hotelId

export default reviewsRouter;
