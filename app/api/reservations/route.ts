import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/db";
import Reservation from "../../../models/reservationSchema";

// Connect to the database
await dbConnect();

// GET function to read all reservations
export async function GET() {
  try {
    const reservations = await Reservation.find({}).sort({ date: 1, time: 1 });
    return NextResponse.json({ success: true, data: reservations });
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

// POST function to create a new reservation
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, partySize, contactNumber, email, date, time } = body;

    if (!name || !partySize || !contactNumber || !email || !date || !time) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const newReservation = await Reservation.create(body);
    return NextResponse.json(
      { success: true, data: newReservation },
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

// PUT function to update a reservation
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { _id, ...updatedData } = body;

    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Reservation ID is required for updating." },
        { status: 400 }
      );
    }

    const updatedReservation = await Reservation.findByIdAndUpdate(
      _id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedReservation) {
      return NextResponse.json(
        { success: false, error: "Reservation not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedReservation },
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

// DELETE function to delete a reservation
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { _id } = body;

    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Reservation ID is required for deletion." },
        { status: 400 }
      );
    }

    const deletedReservation = await Reservation.findByIdAndDelete(_id);

    if (!deletedReservation) {
      return NextResponse.json(
        { success: false, error: "Reservation not found." },
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
