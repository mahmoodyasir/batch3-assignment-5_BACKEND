import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { Slot } from "../Slot/slot.model";

const createBookingIntoDB = async (email: string, payload: any) => {

    const { serviceId, slotId, ...restData } = payload;

    const user = await User.findOne({ email });


    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User Not Found !');
    };

    const bookingData: TBooking = {
        customer: user?.id,
        service: serviceId,
        slot: slotId,
        ...restData,
    }

    const newBookingService = (await Booking.create(bookingData)).populate([
        {
            path: 'customer',
            select: '-__v'
        },
        {
            path: 'service',
            select: '-__v'
        },
        {
            path: 'slot',
            select: '-__v'
        },

    ]);

    await Slot.findByIdAndUpdate(
        slotId,
        { $set: {isBooked: "booked"} },
        { new: true, runValidators: true }
    )


    return newBookingService;

};


const getAllBookingsFromDB = async () => {

    const allBookings = await Booking.find().populate([
        {
            path: 'customer',
            select: '-__v'
        },
        {
            path: 'service',
            select: '-__v'
        },
        {
            path: 'slot',
            select: '-__v'
        },
    ]);

    return allBookings;
};


const getPersonalBookingDataFromDB = async (email: string) => {

    const user = await User.findOne({ email });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User Not Found !');
    };

    const myBookings = await Booking.find({customer: user?.id}).populate([
        {
            path: 'customer',
            select: '-__v'
        },
        {
            path: 'service',
            select: '-__v'
        },
        {
            path: 'slot',
            select: '-__v'
        },
    ]);

    return myBookings;
}


export const BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    getPersonalBookingDataFromDB,
}