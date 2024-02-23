import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DBCONNECTION);
        console.log('DB connected successfuly');
    }
    catch (err) {
        console.log('Error' + err);
    }
};
export default dbConnection;
