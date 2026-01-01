const mongoose = require('mongoose');
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;

export const connectDatabase = async () => {
    try {
        await mongoose.connect(uri);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};