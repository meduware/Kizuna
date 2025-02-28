import mongoose from "mongoose";
import { env } from "process";

const connection = {};

async function connectDB() {
  if (connection.isConnected) {
    console.log("Using existing connection");
    return;
  }

  // Create new database connection
  try {
    const db = await mongoose.connect(env.MONGODB_URI);
    connection.isConnected = db.connections[0].readyState;
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

export default connectDB;
