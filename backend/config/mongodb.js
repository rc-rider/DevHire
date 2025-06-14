import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MongoDB)
        console.log("Database is Connected");
    } catch (error) {
        console.log(error,"ERROR");

    }
}

export default connectDB;