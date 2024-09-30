import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SlotServices } from "./slot.service";


const createSlots = catchAsync(async (req, res) => {

    const result = await SlotServices.createSlotsIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Slots created successfully",
        data: result
    });
});


const getAvailableSlots = catchAsync(async (req, res) => {

    const { date, serviceId } = req.query;

    const filter: any = {};

    if (date) {
        filter.date = date;
    }

    if (serviceId) {
        filter.service = serviceId;
    }

    const result = await SlotServices.getAvailableSlotsFromDB(filter);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Available slots retrieved successfully",
        data: result
    });
});


const updateSlotStatus = catchAsync(async (req, res) => {

    const id = req.params.id;
    const { status_value } = req.body;

    const result = await SlotServices.updateSloteStatusInDB(id, status_value);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Available slots retrieved successfully",
        data: result
    });
});


export const SlotControllers = {
    createSlots,
    getAvailableSlots,
    updateSlotStatus,
}