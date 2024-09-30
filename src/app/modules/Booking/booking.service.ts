import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { Slot } from "../Slot/slot.model";
import { Service } from "../Service/service.model";
import config from "../../config";
import { number } from "zod";
import mongoose from "mongoose";

const SSLCommerzPayment = require('sslcommerz-lts')

const generateTransactionId = () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000);
    return `${timestamp}-${randomNum}`;
};

const createBookingIntoDB = async (email: string, payload: any) => {

    const { serviceId, slotId, ...restData } = payload;

    const sslcommerzUrl = "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

    const session = await mongoose.startSession();

    try {

        session.startTransaction();

        const user = await User.findOne({ email });

        const service: any = await Service.findOne({ _id: serviceId });

        const slot: any = await Slot.find({ _id: slotId });

        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'User Not Found !');
        };

        const bookingData: TBooking = {
            customer: user?.id,
            service: serviceId,
            slot: slotId,
            ...restData,
        }


        const newBookingService: any = (await Booking.create(bookingData)).populate([
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
            { $set: { isBooked: "booked" } },
            { new: true, runValidators: true }
        )

        const booking = await newBookingService;

        const bookingId = String(booking?._id)

        const store_id = config.store_id;
        const store_passwd = config.store_pass;
        const total: number = Number(parseFloat(service?.price) || 0);

        const paymentData = {
            total_amount: total,
            currency: "USD",
            tran_id: generateTransactionId(),
            success_url: `${config.backend_url}/api/bookings/process`,
            fail_url: `${config.backend_url}/api/bookings/process`,
            cancel_url: `${config.backend_url}/api/bookings/process`,
            ipn_url: `${config.backend_url}/api/bookings/process`,
            cus_name: user?.name,
            cus_email: email,
            cus_phone: user?.phone,
            cus_add1: restData?.serviceId,
            cus_add2: restData?.slotId,
            product_name: restData?.vehicleType,
            value_a: bookingId,
            value_b: slotId,
            shipping_method: "online",
            ship_name: "N/A",
            ship_add1: "N/A",
            ship_city: "Bangladesh",
            ship_postcode: "N/A",
            ship_country: "Bangladesh",
            product_category: "none",
            product_profile: "none",
        };

        let response = {};


        const sslcz = new SSLCommerzPayment(store_id, store_passwd, false);
        try {
            const apiResponse = await sslcz.init(paymentData);

            response = apiResponse;
        } catch (error) {
            console.error('Payment initiation failed:', error);

            await Booking.deleteOne({ _id: bookingId });

            await Slot.findByIdAndUpdate(
                slotId,
                { $set: { isBooked: "available" } },
                { new: true, runValidators: true }
            )

            await session.abortTransaction();
            await session.endSession();
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Payment initiation failed');
        }

        await session.commitTransaction();
        await session.endSession();

        return response

    }
    catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error('Failed to complete payment');
    }


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

    const myBookings = await Booking.find({ customer: user?.id }).populate([
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
    ]).sort({ createdAt: 1 });

    return myBookings;
}


export const BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    getPersonalBookingDataFromDB,
}