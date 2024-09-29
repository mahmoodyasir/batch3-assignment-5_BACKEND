import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ServiceOfServices } from "./service.service";


const createService = catchAsync(async (req, res) => {

    const result = await ServiceOfServices.createServiceIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service created successfully",
        data: result
    });
});

const getSingleService = catchAsync(async (req, res) => {

    const { id } = req.params;

    const result = await ServiceOfServices.getSingleServiceFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service retrieved successfully",
        data: result
    });
});


const getAllService = catchAsync(async (req, res) => {

    const { search, minPrice, maxPrice, minDuration, maxDuration, sortBy } = req.body;

    const filterOptions = {
        search: search || '',
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        minDuration: minDuration || undefined,
        maxDuration: maxDuration || undefined,
        sortBy: sortBy || undefined,
    };

    const result = await ServiceOfServices.getAllServiceFromDB(filterOptions);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Services retrieved successfully",
        data: result
    });
});


const updateService = catchAsync(async (req, res) => {

    const id = req.params.id;
    const updatableData = req.body;

    const result = await ServiceOfServices.updateServiceIntoDB(id, updatableData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service updated successfully",
        data: result
    });

});


const deleteService = catchAsync(async (req, res) => {

    const id = req.params.id;

    const result = await ServiceOfServices.deleteServiceFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service deleted successfully",
        data: result
    });

})


export const ServiceControllers = {
    createService,
    getSingleService,
    getAllService,
    updateService,
    deleteService,
}