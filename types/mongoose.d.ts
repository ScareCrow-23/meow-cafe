import mongoose from "mongoose";

// Define a new interface for the cached mongoose connection
interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Mongoose> | null;
}

// Extend the global namespace to include the mongoose cache
declare global {
  var mongoose: MongooseCache;
}
