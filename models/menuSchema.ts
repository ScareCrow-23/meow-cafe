import mongoose from "mongoose";

// Define the schema for a single menu item
const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Menu item name is required."],
    unique: true,
    trim: true,
    maxlength: [50, "Menu item name cannot be more than 50 characters."],
  },
  description: {
    type: String,
    required: [true, "Menu item description is required."],
    trim: true,
    maxlength: [
      200,
      "Menu item description cannot be more than 200 characters.",
    ],
  },
  price: {
    type: Number,
    required: [true, "Menu item price is required."],
    min: [0, "Price cannot be negative."],
  },
  category: {
    type: String,
    required: [true, "Menu item category is required."],
    enum: ["Hot Coffee", "Cold Coffee", "Pastries", "Sandwiches", "Tea"],
    trim: true,
  },
  image: {
    type: String,
    required: false,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model based on the schema
// Mongoose.models is checked to prevent model re-compilation
const Menu = mongoose.models.Menu || mongoose.model("Menu", menuItemSchema);

export default Menu;
