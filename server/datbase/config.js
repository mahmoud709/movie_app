import mongoose from "mongoose";
import asyncHandler from 'express-async-handler';

const dbConnection = asyncHandler(async (req, res) => {
    try {
        await mongoose.connect(process.env.DBCONNECTION);
        console.log('DB connected successfuly');
    }
    catch (err) {
        console.log('Error' + err);
    }
});
export default dbConnection;
