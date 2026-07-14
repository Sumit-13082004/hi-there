import "dotenv/config";
import mongoose from "mongoose";

const mongo_uri = process.env.MONGO_URI;

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongo_uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Error in connecting to MongoDB", error);
        process.exit(1);
    }
};