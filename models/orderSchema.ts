import mongoose from "mongoose";

// Define the shape of the document for TypeScript
interface OrderDocument extends mongoose.Document {
  deliveryMethod: string;
  tableNumber?: number;
  deliveryAddress?: string;
}

// Define the schema for a single item within an order
const orderItemSchema = new mongoose.Schema({
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu", // This creates a reference to the Menu model
    required: [true, "Menu item ID is required."],
  },
  name: {
    // Denormalize the name for easier retrieval
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required."],
    min: [1, "Quantity must be at least 1."],
  },
  price: {
    // Denormalize the price for easier retrieval
    type: Number,
    required: true,
  },
});

// Define the main order schema
const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Customer name is required."],
    trim: true,
  },
  contactNumber: {
    type: String,
    required: [true, "Contact number is required."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid email address."],
  },
  totalAmount: {
    type: Number,
    required: [true, "Total amount is required."],
    min: [0, "Total amount cannot be negative."],
  },
  deliveryMethod: {
    type: String,
    required: [true, "Delivery method is required."],
    enum: ["Dine-in", "Delivery"],
  },
  tableNumber: {
    type: Number,
    required: [
      function (this: OrderDocument) {
        return this.deliveryMethod === "Dine-in";
      },
      "Table number is required for dine-in orders.",
    ],
    min: [1, "Table number must be at least 1."],
  },
  deliveryAddress: {
    type: String,
    required: [
      function (this: OrderDocument) {
        return this.deliveryMethod === "Delivery";
      },
      "Delivery address is required for delivery orders.",
    ],
    trim: true,
  },
  order: {
    type: [orderItemSchema],
    required: [true, "Order items are required."],
  },
  status: {
    type: String,
    required: true,
    enum: [
      "Pending",
      "Confirmed",
      "Preparing",
      "Ready for pickup/delivery",
      "Completed",
      "Cancelled",
    ],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model based on the schema
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
