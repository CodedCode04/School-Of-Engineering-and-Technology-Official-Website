import mongoose from 'mongoose';
import 'dotenv/config';

export const connectDB = async () => {
    if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes('<user>')) {
        console.error('WARNING: MONGODB_URI is mock/empty. Bypassing DB connect for local UI verification.');
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000, // Keep timeout sensible
            socketTimeoutMS: 45000
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};
