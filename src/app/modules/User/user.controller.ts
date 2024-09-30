import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";


const userSignUp = catchAsync(async (req, res) => {

    const result = await UserServices.createUserIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User registered successfully",
        data: result
    })
});

const userLogin = catchAsync(async (req, res) => {

    const result = await UserServices.loginUser(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully",
        token: result?.accessToken,
        data: result?.remainingData
    })
});

const getUser = catchAsync(async (req, res) => {

    const bearerToken = req.headers.authorization;

    const token = bearerToken?.split(' ')[1];

    const result = await UserServices.getUserFromDB(token as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User fetched successfully",
        token: result?.accessToken,
        data: result?.remainingData
    })
});

const updateUser = catchAsync(async (req, res) => {

    const bearerToken = req.headers.authorization;

    const token = bearerToken?.split(' ')[1];
    const updatableData = req.body;

    const result = await UserServices.updateUserToDB(token as string, updatableData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User updated successfully",
        data: result
    });

});


const getAllUser = catchAsync(async (req, res) => {


    const result = await UserServices.getAllUserFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All User Retrieved successfully",
        data: result
    });

});

const updateUserRole = catchAsync(async (req, res) => {
    const id = req.params.id;
    const { role } = req.body;

    const result = await UserServices.updateUserRoleIntoDB(id, role);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Updated successfully",
        data: result
    });

});


export const UserControllers = {
    userSignUp,
    userLogin,
    getUser,
    updateUser,
    getAllUser,
    updateUserRole,
}