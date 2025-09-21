import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/db";
import Order from "../../../models/orderSchema";
import Menu from "../../../models/menuSchema";

// Connect to the database
await dbConnect();

// GET function to read all orders
export async function GET() {
  try {
    // Populate the 'menuItem' field to retrieve full item details
    const orders = await Order.find({}).sort({ createdAt: -1 }).populate({
      path: "order.menuItem",
      model: Menu,
      select: "name price image", // Only select the fields you need
    });
    return NextResponse.json({ success: true, data: orders });
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}

// POST function to create a new order
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      contactNumber,
      email,
      deliveryMethod,
      tableNumber,
      deliveryAddress,
      order,
    } = body;

    // Validate required fields
    if (
      !name ||
      !contactNumber ||
      !email ||
      !deliveryMethod ||
      !order ||
      order.length === 0
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields or order items." },
        { status: 400 }
      );
    }

    if (deliveryMethod === "Dine-in" && !tableNumber) {
      return NextResponse.json(
        {
          success: false,
          error: "Table number is required for dine-in orders.",
        },
        { status: 400 }
      );
    }

    if (deliveryMethod === "Delivery" && !deliveryAddress) {
      return NextResponse.json(
        {
          success: false,
          error: "Delivery address is required for delivery orders.",
        },
        { status: 400 }
      );
    }

    // Calculate total amount based on prices from the Menu schema
    let totalAmount = 0;
    const populatedOrder = [];
    for (const item of order) {
      const menuItem = await Menu.findById(item.menuItem);
      if (!menuItem) {
        return NextResponse.json(
          {
            success: false,
            error: `Menu item with ID ${item.menuItem} not found.`,
          },
          { status: 404 }
        );
      }
      totalAmount += menuItem.price * item.quantity;
      populatedOrder.push({
        menuItem: menuItem._id,
        name: menuItem.name,
        quantity: item.quantity,
        price: menuItem.price,
      });
    }

    const newOrderData = {
      name,
      contactNumber,
      email,
      deliveryMethod,
      totalAmount,
      tableNumber: deliveryMethod === "Dine-in" ? tableNumber : undefined,
      deliveryAddress:
        deliveryMethod === "Delivery" ? deliveryAddress : undefined,
      order: populatedOrder,
    };

    const newOrder = await Order.create(newOrderData);
    return NextResponse.json(
      { success: true, data: newOrder },
      { status: 201 }
    );
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}

// PUT function to update an order (e.g., status)
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { _id, ...updatedData } = body;

    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Order ID is required for updating." },
        { status: 400 }
      );
    }

    const updatedOrder = await Order.findByIdAndUpdate(_id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, error: "Order not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedOrder },
      { status: 200 }
    );
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}

// DELETE function to delete an order
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { _id } = body;

    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Order ID is required for deletion." },
        { status: 400 }
      );
    }

    const deletedOrder = await Order.findByIdAndDelete(_id);

    if (!deletedOrder) {
      return NextResponse.json(
        { success: false, error: "Order not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}
