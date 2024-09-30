import { model, Schema } from "mongoose";
import { TRating } from "./rating.interface";




const ratingSchema = new Schema<TRating>(
    {
        name: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            required: [true, 'User id is required'],
            ref: 'User'
        },

    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Rating = model<TRating>('Rating', ratingSchema);