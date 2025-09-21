import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/db";
import Menu from "../../../models/menuSchema";

// Connect to the database
await dbConnect();

// GET function to read all menu items
export async function GET() {
  try {
    const menuItems = await Menu.find({}).sort({ category: 1, name: 1 });
    return NextResponse.json({ success: true, data: menuItems });
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

// POST function to create a new menu item
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, price, category, image } = body;

    if (!name || !description || !price || !category) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing required fields: name, description, price, and category are required.",
        },
        { status: 400 }
      );
    }

    const newMenuItem = await Menu.create(body);
    return NextResponse.json(
      { success: true, data: newMenuItem },
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

// PUT function to update a menu item
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { _id, ...updatedData } = body;

    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Menu item ID is required for updating." },
        { status: 400 }
      );
    }

    const updatedMenuItem = await Menu.findByIdAndUpdate(_id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedMenuItem) {
      return NextResponse.json(
        { success: false, error: "Menu item not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedMenuItem },
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

// DELETE function to delete a menu item
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { _id } = body;

    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Menu item ID is required for deletion." },
        { status: 400 }
      );
    }

    const deletedMenuItem = await Menu.findByIdAndDelete(_id);

    if (!deletedMenuItem) {
      return NextResponse.json(
        { success: false, error: "Menu item not found." },
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
