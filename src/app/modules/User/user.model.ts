import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";


const userSchema = new Schema<TUser, UserModel>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: 0,
        },
        phone: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['admin', 'user']
        },
        address: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

userSchema.statics.isUserExistsByEmail = async function (email: string) {
    return await User.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
    plainPassword,
    hashedPassword,
) {
    return await bcrypt.compare(plainPassword, hashedPassword);
};


userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
    next();
})

export const User = model<TUser, UserModel>('User', userSchema);