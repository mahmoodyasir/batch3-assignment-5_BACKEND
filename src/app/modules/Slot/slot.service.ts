import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Service } from "../Service/service.model";
import { TSlot } from "./slot.interface";
import { Slot } from "./slot.model";
import mongoose from "mongoose";



const createSlotsIntoDB = async (payload: Partial<TSlot>) => {

    const { service, date, startTime, endTime } = payload;

    const session = await mongoose.startSession();

    try {

        session.startTransaction();

        const fetchedService = await Service.findById(service);

        if (!fetchedService) {
            throw new AppError(httpStatus.NOT_FOUND, 'Service Not Found !');
        };

        const serviceDuration = fetchedService?.duration;

        const convertToMinutes = (time: string) => {
            const [hours, minutes] = time.split(':').map(Number);
            return hours * 60 + minutes;
        };

        const startMinutes = convertToMinutes(startTime as string);
        const endMinutes = convertToMinutes(endTime as string);
        const totalDuration = endMinutes - startMinutes;

        if (totalDuration <= 0) {
            throw new AppError(httpStatus.CONFLICT, 'End Time cannot be smaller than Start Time');
        };

        const numberOfSlots = Math.floor(totalDuration / serviceDuration);

        if (numberOfSlots <= 0) {
            throw new AppError(httpStatus.CONFLICT, 'Service Dureation cannot be greater than time range');
        };

        const slots = [];
        let currentStartMinutes = startMinutes;

        for (let i = 0; i < numberOfSlots; i++) {
            const slotStartTime = `${String(Math.floor(currentStartMinutes / 60)).padStart(2, '0')}:${String(currentStartMinutes % 60).padStart(2, '0')}`;
            const slotEndMinutes = currentStartMinutes + serviceDuration;
            const slotEndTime = `${String(Math.floor(slotEndMinutes / 60)).padStart(2, '0')}:${String(slotEndMinutes % 60).padStart(2, '0')}`;

            slots.push({
                service: service,
                date,
                startTime: slotStartTime,
                endTime: slotEndTime,
                isBooked: 'available'
            });

            currentStartMinutes = slotEndMinutes;
        }

        const createdSlots = await Slot.insertMany(slots);

        await session.commitTransaction();
        await session.endSession();

        return createdSlots;

    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error('Failed to delete student');
    }

};


const getAvailableSlotsFromDB = async (filter: any) => {

    const availableSlots = await Slot.find(filter)
        .populate({
            path: 'service',
            select: '-__v'
        }).sort({ createdAt: -1 });

    return availableSlots
}

const updateSloteStatusInDB = async (id: string, status_value: string) => {

    const updatedSlot = Slot.findByIdAndUpdate(
        id,
        { $set: { isBooked: status_value } },
        { new: true, runValidators: true }
    ).populate({
        path: 'service',
        select: '-__v'
    });

    return updatedSlot;
}


export const SlotServices = {
    createSlotsIntoDB,
    getAvailableSlotsFromDB,
    updateSloteStatusInDB,
}