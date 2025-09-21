import mongoose, { Schema, model, models, Document } from "mongoose";

// Define the interface for the Reservation document
// This is optional but highly recommended for TypeScript
export interface IReservation extends Document {
  name: string;
  partySize: number;
  contactNumber: string;
  email: string;
  date: Date;
  time: string;
  table: string | number;
  notes?: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: Date;
}

// Define the schema for the Reservation model
const reservationSchema = new Schema<IReservation>({
  name: {
    type: String,
    required: [true, "Please provide the customer name."],
    trim: true,
  },
  partySize: {
    type: Number,
    required: [true, "Please provide the number of people."],
    min: [1, "Party size must be at least 1."],
  },
  contactNumber: {
    type: String,
    required: [true, "Please provide a contact number."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email address."],
    trim: true,
    lowercase: true,
  },
  date: {
    type: Date,
    required: [true, "Please provide the reservation date."],
  },
  time: {
    type: String,
    required: [true, "Please provide the reservation time."],
    trim: true,
  },
  table: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled", "completed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model, checking if it already exists to avoid recompilation issues in Next.js
const Reservation =
  models.Reservation || model<IReservation>("Reservation", reservationSchema);

export default Reservation;
