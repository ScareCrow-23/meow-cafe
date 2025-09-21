# Meow Cafe - Restaurant Management System

A full-stack Next.js application for managing a cat cafe's menu items and reservations. Built with TypeScript, MongoDB, and Mongoose.

## Tech Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Styling**: Tailwind CSS
- **Runtime**: Node.js
- **Package Manager**: npm/pnpm

## Project Structure

```
meow-cafe/my-app/
├── app/
│   ├── api/
│   │   ├── menu/route.ts          # Menu CRUD operations
│   │   └── reservations/route.ts  # Reservation CRUD operations
│   ├── favicon.ico
│   ├── globals.css               # Global styles
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Home page component
├── lib/
│   └── db.ts                    # MongoDB connection utility
├── models/
│   ├── menuSchema.ts            # Menu item Mongoose schema
│   └── reservationSchema.ts     # Reservation Mongoose schema
├── types/
│   └── mongoose.d.ts            # TypeScript declarations for Mongoose
├── public/                      # Static assets
├── .env                        # Environment variables
└── package.json               # Dependencies and scripts
```

## Database Schemas

### Menu Schema (`models/menuSchema.ts`)

Defines the structure for cafe menu items:

```typescript
interface MenuItem {
  name: string;          // Required, unique, max 50 chars
  description: string;   // Required, max 200 chars
  price: number;        // Required, min 0
  category: string;     // Required, enum values
  image?: string;       // Optional image URL
  createdAt: Date;      // Auto-generated timestamp
}
```

**Categories**: "Hot Coffee", "Cold Coffee", "Pastries", "Sandwiches", "Tea"

**Validations**:
- Name: Required, unique, trimmed, max 50 characters
- Description: Required, trimmed, max 200 characters
- Price: Required, cannot be negative
- Category: Required, must be one of predefined enum values

### Reservation Schema (`models/reservationSchema.ts`)

Defines the structure for customer reservations:

```typescript
interface IReservation {
  name: string;           // Required customer name
  partySize: number;      // Required, min 1
  contactNumber: string;  // Required phone number
  email: string;         // Required, auto-lowercase
  date: Date;           // Required reservation date
  time: string;         // Required reservation time
  table?: string;       // Optional table assignment
  notes?: string;       // Optional special requests
  status: string;       // Enum: pending/confirmed/cancelled/completed
  createdAt: Date;      // Auto-generated timestamp
}
```

**Status Values**: "pending" (default), "confirmed", "cancelled", "completed"

**Validations**:
- Name: Required, trimmed
- Party Size: Required, minimum 1 person
- Contact Number: Required, trimmed
- Email: Required, trimmed, converted to lowercase
- Date & Time: Required for reservation scheduling

## API Endpoints

### Menu API (`/api/menu`)

#### GET `/api/menu`
- **Purpose**: Retrieve all menu items
- **Response**: Array of menu items sorted by category and name
- **Success**: `{ success: true, data: MenuItem[] }`
- **Error**: `{ success: false, error: string }`

#### POST `/api/menu`
- **Purpose**: Create a new menu item
- **Required Fields**: name, description, price, category
- **Optional Fields**: image
- **Response**: Created menu item
- **Validation**: All required fields must be provided

#### PUT `/api/menu`
- **Purpose**: Update an existing menu item
- **Required Fields**: _id (MongoDB ObjectId)
- **Optional Fields**: Any menu item fields to update
- **Response**: Updated menu item
- **Error Cases**: Missing ID, item not found

#### DELETE `/api/menu`
- **Purpose**: Delete a menu item
- **Required Fields**: _id (MongoDB ObjectId)
- **Response**: Success confirmation
- **Error Cases**: Missing ID, item not found

### Reservations API (`/api/reservations`)

#### GET `/api/reservations`
- **Purpose**: Retrieve all reservations
- **Response**: Array of reservations sorted by date and time
- **Success**: `{ success: true, data: IReservation[] }`
- **Error**: `{ success: false, error: string }`

#### POST `/api/reservations`
- **Purpose**: Create a new reservation
- **Required Fields**: name, partySize, contactNumber, email, date, time
- **Optional Fields**: table, notes, status
- **Response**: Created reservation
- **Default Status**: "pending"

#### PUT `/api/reservations`
- **Purpose**: Update an existing reservation
- **Required Fields**: _id (MongoDB ObjectId)
- **Optional Fields**: Any reservation fields to update
- **Response**: Updated reservation
- **Use Cases**: Confirm reservations, assign tables, update status

#### DELETE `/api/reservations`
- **Purpose**: Cancel/delete a reservation
- **Required Fields**: _id (MongoDB ObjectId)
- **Response**: Success confirmation
- **Error Cases**: Missing ID, reservation not found

## Core Functions

### Database Connection (`lib/db.ts`)

#### `dbConnect()`
- **Purpose**: Establishes and manages MongoDB connection
- **Features**: 
  - Connection caching to prevent multiple connections
  - Error handling for connection failures
  - Environment variable validation
- **Returns**: Mongoose connection instance
- **Error Handling**: Throws error if MONGODB_URI is not defined

**Connection Caching Logic**:
```typescript
// Global cache prevents multiple connections in serverless environment
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
```

### Error Handling Pattern

All API routes implement consistent error handling:

```typescript
try {
  // Operation logic
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
```

## Environment Setup

### Required Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/meow-cafe
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/meow-cafe
```

### Installation & Development

```bash
# Install dependencies
npm install

# Run development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## TypeScript Configuration

### Global Type Declarations (`types/mongoose.d.ts`)

Extends global namespace for Mongoose connection caching:

```typescript
interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}
```

## Key Features Implemented

1. **Full CRUD Operations**: Complete Create, Read, Update, Delete functionality for both menu items and reservations
2. **Data Validation**: Comprehensive validation using Mongoose schemas
3. **Error Handling**: Consistent error handling across all API endpoints
4. **Type Safety**: Full TypeScript implementation with proper type definitions
5. **Database Optimization**: Connection caching and query optimization
6. **RESTful API Design**: Standard HTTP methods and response formats
7. **Scalable Architecture**: Modular structure supporting future enhancements

## Development Notes

- Uses Next.js App Router for modern routing
- Implements Turbopack for faster development builds
- Mongoose models prevent recompilation in serverless environments
- All API responses follow consistent `{ success: boolean, data?: any, error?: string }` format
- Database connection is cached globally to optimize performance
- TypeScript strict mode enabled for better code quality

## Future Enhancements

- Frontend UI components for menu and reservation management
- User authentication and authorization
- Real-time reservation updates
- Email notifications for reservations
- Image upload functionality for menu items
- Advanced filtering and search capabilities
- Analytics and reporting features