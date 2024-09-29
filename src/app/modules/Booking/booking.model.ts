import { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";
import { number } from "zod";


const bookingSchema = new Schema<TBooking>(
    {
        customer: {
            type: Schema.Types.ObjectId,
            required: [true, 'User id is required'],
            ref: 'User'
        },
        service: {
            type: Schema.Types.ObjectId,
            required: [true, 'Service id is required'],
            ref: 'Service'
        },
        slot: {
            type: Schema.Types.ObjectId,
            required: [true, 'Slot id is required'],
            ref: 'Slot'
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'truck', 'SUV', 'van', 'motorcycle', 'bus',
                'electricVehicle', 'hybridVehicle', 'bicycle', 'tractor']
        },
        vehicleBrand: {
            type: String,
            required: true,
        },
        vehicleModel: {
            type: String,
            required: true,
        },
        manufacturingYear: {
            type: Number,
            required: true,
        },
        registrationPlate: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Booking = model<TBooking>('Booking', bookingSchema);