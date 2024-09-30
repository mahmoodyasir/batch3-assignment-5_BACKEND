import { model, Schema } from "mongoose";
import { TSlot } from "./slot.interface";

const slotSchema = new Schema<TSlot>(
    {
        service: {
            type: Schema.Types.ObjectId,
            required: [true, 'Service id is required'],
            ref: 'Service'
        },
        date: {
            type: String,
            required: true,
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
        isBooked: {
            type: String,
            enum: ['available', 'booked', 'cancelled']
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);


export const Slot = model<TSlot>('Slot', slotSchema);