import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TService } from "./service.interface";
import { Service } from "./service.model";
import { Slot } from "../Slot/slot.model";

const createServiceIntoDB = async (payload: TService) => {

    const newService = await Service.create(payload);

    const serviceObject = (newService as any).toObject();

    const { __v, ...remainingData } = serviceObject;

    return remainingData;
};


const getSingleServiceFromDB = async (id: string) => {

    const obtainedService = await Service.findById(id).select('-__v');

    const obtainedSlots = await Slot.find({service: id});

    const result = {
        service: obtainedService,
        slots: obtainedSlots,
    }

    if (!obtainedService) {
        throw new AppError(httpStatus.NOT_FOUND, 'Service Not Found !');
    }


    return result;
};


const getAllServiceFromDB = async () => {

    const obtainedServices = await Service.find({ isDeleted: false }).select('-__v');

    if (!obtainedServices) {
        throw new AppError(httpStatus.NOT_FOUND, 'Services Not Found !');
    }


    return obtainedServices;
};


const updateServiceIntoDB = async (id: string, updatableData: Partial<TService>) => {

    const updatedService = await Service.findByIdAndUpdate(
        id,
        { $set: updatableData },
        { new: true, runValidators: true }
    ).select('-__v');

    if (!updatedService) {
        throw new AppError(httpStatus.NOT_FOUND, 'Service Not Found !');
    };

    return updatedService;
}


const deleteServiceFromDB = async (id: string) => {

    const deletedService = await Service.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    ).select('-__v');

    if (!deletedService) {
        throw new AppError(httpStatus.NOT_FOUND, 'Failed To Delete Service !');
    };

    return deletedService;

}


export const ServiceOfServices = {
    createServiceIntoDB,
    getSingleServiceFromDB,
    getAllServiceFromDB,
    updateServiceIntoDB,
    deleteServiceFromDB,
}