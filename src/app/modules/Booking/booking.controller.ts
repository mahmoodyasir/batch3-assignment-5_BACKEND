import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";


const createServiceBooking = catchAsync(async (req, res) => {

    const {email} = req.user;

    const result = await BookingServices.createBookingIntoDB(email, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Booking successful",
        data: result
    });

});


const getAllServiceBooking = catchAsync(async (req, res) => {

    const result = await BookingServices.getAllBookingsFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All bookings retrieved successfully",
        data: result
    });

});


const getPersonalServiceBooking = catchAsync(async (req, res) => {

    const {email} = req.user;

    const result = await BookingServices.getPersonalBookingDataFromDB(email);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User bookings retrieved successfully",
        data: result
    });

});


export const BookingControllers = {
    createServiceBooking,
    getAllServiceBooking,
    getPersonalServiceBooking,
}