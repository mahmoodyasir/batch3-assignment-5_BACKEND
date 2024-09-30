import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLogin, TUser } from "./user.interface";
import { User } from "./user.model";
import { createToken } from "./user.authUtils";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../../config";


const createUserIntoDB = async (payload: TUser) => {

    const newUser = await User.create(payload);

    const userObject: any = newUser.toObject();

    const { password, __v, ...result } = userObject;

    return result;

};


const loginUser = async (payload: TLogin) => {

    const user = await User.isUserExistsByEmail(payload.email);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User Not Found !');
    }

    if (!(await User.isPasswordMatched(payload?.password, user?.password)))
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not match');

    const jwtPayload = {
        email: user.email,
        role: user.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
    )

    const userObject = (user as any).toObject();

    const { password, __v, ...remainingData } = userObject;

    return {
        accessToken,
        remainingData,
    }
};


const getUserFromDB = async (token: string) => {

    const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
    ) as JwtPayload;

    const { email, role } = decoded;

    const user = await User.isUserExistsByEmail(email);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User Not Found !');
    }

    const jwtPayload = {
        email: user.email,
        role: user.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
    );

    const userObject = (user as any).toObject();

    const { password, __v, ...remainingData } = userObject;

    return {
        accessToken,
        remainingData,
    }
}


const updateUserToDB = async (token: string, updatableData: Partial<TUser>) => {

    const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
    ) as JwtPayload;

    const { email, role } = decoded;

    const updatedUser = await User.findOneAndUpdate(
        { email },
        { $set: updatableData },
        { new: true, runValidators: true }
    ).select('-__v');

    if (!updatedUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'User Not Found !');
    };

    return updatedUser;

}



const getAllUserFromDB = async () => {

    const response = await User.find();

    return response;
}



export const UserServices = {
    createUserIntoDB,
    loginUser,
    getUserFromDB,
    updateUserToDB,
    getAllUserFromDB,
}