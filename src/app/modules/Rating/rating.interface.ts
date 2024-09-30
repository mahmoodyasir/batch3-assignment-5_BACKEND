import { Types } from "mongoose";

export interface TRating {
    name: string;
    rating: number;
    message: string,
    user: Types.ObjectId
}