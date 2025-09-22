// app/models/contactSchema.ts
import mongoose, { Schema, Document, models } from "mongoose";

// 1. Define the interface for TypeScript
export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

// 2. Define the schema
const contactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please use a valid email address"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      minlength: [5, "Message must be at least 5 characters long"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// 3. Prevent recompiling model in dev / hot-reload
const Contact =
  models.Contact || mongoose.model<IContact>("Contact", contactSchema);

export default Contact;
