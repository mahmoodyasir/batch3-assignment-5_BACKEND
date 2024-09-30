import { Types } from "mongoose";

export interface TRating {
    rating: number;
    message: string,
    user: Types.ObjectId
}