import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RatingServices } from "./rating.service";


const createRating = catchAsync(async (req, res) => {

    const { email } = req.user;

    const result = await RatingServices.createRatingIntoDB(email, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Rating created successfully",
        data: result
    });
});


const getAllRating = catchAsync(async (req, res) => {

    const result = await RatingServices.getRatingFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Ratings fetched successfully",
        data: result
    });
});


export const RatingControllers = {
    createRating,
    getAllRating,
}