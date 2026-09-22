const mongoose = require('mongoose');

/**
 * Connect to MongoDB with robust error handling and event monitoring
 */
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/avyastore_ecommerce';
    
    const conn = await mongoose.connect(mongoUri, {
      autoIndex: true,
    });

    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);

    mongoose.connection.on('error', (err) => {
      console.error(`[MongoDB] Connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('[MongoDB] Disconnected from database');
    });

    return conn;
  } catch (error) {
    console.error(`[MongoDB] Initial connection error: ${error.message}`);
    // In development or testing, throw error to handle gracefully at startup
    throw error;
  }
};

module.exports = connectDB;
