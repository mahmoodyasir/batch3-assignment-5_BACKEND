import { User } from "../User/user.model";
import { TRating } from "./rating.interface"
import { Rating } from "./rating.model"

const createRatingIntoDB = async (email: string, payload: Partial<TRating>) => {

    const user = await User.findOne({ email });

    const newObj = {
        rating: payload.rating,
        message: payload.message,
        user: user?.id
    }

    const newRating = (await Rating.create(newObj)).populate([
        {
            path: 'user',
            select: '-__v'
        },
    ]);;

    return newRating;
}

const getRatingFromDB = async () => {

    const response = await Rating.find().populate([
        {
            path: 'user',
            select: '-__v'
        },
    ]);

    return response;

}


export const RatingServices = {
    createRatingIntoDB,
    getRatingFromDB,
}