import mongoose, { Schema, model } from 'mongoose';
import Joi from 'joi';

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'you must write your name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'You must Write your Email'],
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required: [true, "you didn't need write phone number"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'You must write your password'],
    },
    profilephoto: {
        type: Object,
        default: {
            url: "https://cdn.pixabay.com/photo/2017/06/09/23/22/avatar-2388584_1280.png",
            publicId: null
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'owner'],
        default: 'user'
    },
}, { timestamps: true });

// Define a Joi schema for register user data
const userSchemaValidation = Joi.object({
    username: Joi.string().required().min(3).trim(),
    email: Joi.string().email().required().trim(),
    phone: Joi.string().required().min(11),
    password: Joi.string().required().min(6),
});
// Validation function
export const validateSchema = (data) => {
    return userSchemaValidation.validate(data);
};
// Validate login data
const loginValidation = Joi.object({
    email: Joi.string().email().trim(),
    phone: Joi.string().min(11),
    password: Joi.string().required().min(6),
});
export const validateLogin = (data) => {
    return loginValidation.validate(data)
}
export const user = mongoose.model('user', userSchema);
