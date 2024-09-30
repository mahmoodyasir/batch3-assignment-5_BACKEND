import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";
import { Booking } from "./booking.model";
import { Slot } from "../Slot/slot.model";
import config from "../../config";


const createServiceBooking = catchAsync(async (req, res) => {

    const { email } = req.user;

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

    const { email } = req.user;

    const result = await BookingServices.getPersonalBookingDataFromDB(email);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User bookings retrieved successfully",
        data: result
    });

});


const responseFromSSLC = catchAsync(async (req, res) => {

    const data = req.body;

    if (data?.status === "VALID") {
        console.log("PAYMMENT VALID")

        res.redirect(`${config.frontend_url}/payment/success`)
    }
    else {
        const bookingId = data?.value_a;
        const slotId = data?.value_b;

        await Booking.deleteOne({ _id: bookingId });

        await Slot.findByIdAndUpdate(
            slotId,
            { $set: { isBooked: "available" } },
            { new: true, runValidators: true }
        )

        res.redirect(`${config.frontend_url}/payment/failed`)
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "SSLCOMMERZ RESPONSE",
        data: req.body
    });

});


export const BookingControllers = {
    createServiceBooking,
    getAllServiceBooking,
    getPersonalServiceBooking,
    responseFromSSLC
}