# The Daily Grind - Complete Restaurant Management System

A comprehensive full-stack Next.js application for managing a modern coffee shop with complete admin panel, customer ordering system, reservations, and contact management. Built with TypeScript, MongoDB, Material-UI, and advanced authentication.

## 🚀 Tech Stack

- **Framework**: Next.js 15.5.3 with App Router & Turbopack
- **Language**: TypeScript 5+ with strict mode
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcryptjs hashing
- **File Upload**: Cloudinary integration
- **UI Framework**: Material-UI (MUI) + Tailwind CSS
- **Icons**: Lucide React + MUI Icons
- **Runtime**: Node.js
- **Package Manager**: pnpm/npm

## 📁 Complete Project Structure

```
the-daily-grind/
├── app/
│   ├── admin/                   # Admin panel with authentication
│   │   ├── components/
│   │   │   └── Sidebar.tsx      # Admin navigation sidebar
│   │   ├── contact/page.tsx     # Contact messages management
│   │   ├── login/page.tsx       # Admin login page
│   │   ├── menu/page.tsx        # Menu items management
│   │   ├── orders/page.tsx      # Order management
│   │   ├── reservations/page.tsx # Reservation management
│   │   ├── layout.tsx           # Admin layout with sidebar
│   │   └── page.tsx             # Admin dashboard
│   ├── api/                     # REST API endpoints
│   │   ├── admin/
│   │   │   ├── login/route.ts   # Admin authentication
│   │   │   └── logout/route.ts  # Admin logout
│   │   ├── contact/route.ts     # Contact form CRUD
│   │   ├── menu/
│   │   │   ├── upload/route.ts  # Image upload to Cloudinary
│   │   │   └── route.ts         # Menu CRUD operations
│   │   ├── orders/route.ts      # Order management CRUD
│   │   └── reservations/route.ts # Reservation CRUD
│   ├── components/              # Reusable UI components
│   │   ├── About.tsx            # About section
│   │   ├── Contact.tsx          # Contact form component
│   │   ├── FeaturedProducts.tsx # Featured menu items
│   │   ├── Footer.tsx           # Site footer
│   │   ├── Hero.tsx             # Hero section with video
│   │   ├── Navbar.tsx           # Main navigation
│   │   ├── Reservation.tsx      # Reservation form
│   │   └── Testimonials.tsx     # Customer testimonials
│   ├── menu/                    # Customer menu & ordering
│   │   ├── components/
│   │   │   ├── Hero.tsx         # Menu page hero
│   │   │   ├── MenuItems.tsx    # Menu display component
│   │   │   ├── MenuNavigation.tsx # Category navigation
│   │   │   └── OrderSummary.tsx # Shopping cart summary
│   │   └── page.tsx             # Menu page with cart
│   ├── about/page.tsx           # About page
│   ├── favicon.ico              # Site favicon
│   ├── globals.css              # Global styles & CSS variables
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── lib/
│   ├── auth.ts                  # JWT authentication utilities
│   └── db.ts                    # MongoDB connection
├── models/                      # Mongoose schemas
│   ├── contactSchema.ts         # Contact form schema
│   ├── menuSchema.ts            # Menu item schema
│   ├── orderSchema.ts           # Order schema with items
│   └── reservationSchema.ts     # Reservation schema
├── types/
│   └── mongoose.d.ts            # TypeScript declarations
├── public/                      # Static assets
│   ├── hero.mp4                 # Hero video background
│   └── [images]                 # Product images
├── .env                         # Environment variables
└── package.json                 # Dependencies
```

## 🗄️ Database Schemas

### Menu Schema (`models/menuSchema.ts`)

Defines the structure for cafe menu items with image support:

```typescript
interface MenuItem {
  name: string;          // Required, unique, max 50 chars
  description: string;   // Required, max 200 chars
  price: number;        // Required, min 0
  category: string;     // Required, enum values
  image?: string;       // Optional Cloudinary image URL
  createdAt: Date;      // Auto-generated timestamp
}
```

**Categories**: "Hot Coffee", "Cold Coffee", "Pastries", "Sandwiches", "Tea"

**Validations**:
- Name: Required, unique, trimmed, max 50 characters
- Description: Required, trimmed, max 200 characters
- Price: Required, cannot be negative
- Category: Required, must be one of predefined enum values
- Image: Optional Cloudinary URL for menu item photos

### Order Schema (`models/orderSchema.ts`)

Defines the structure for customer orders with items and delivery options:

```typescript
interface OrderDocument {
  name: string;              // Customer name
  contactNumber: string;     // Phone number
  email: string;            // Email address
  totalAmount: number;      // Total order value
  deliveryMethod: string;   // "Dine-in" | "Delivery"
  tableNumber?: number;     // Required for dine-in
  deliveryAddress?: string; // Required for delivery
  order: OrderItem[];       // Array of ordered items
  status: string;          // Order status
  createdAt: Date;         // Order timestamp
}

interface OrderItem {
  menuItem: ObjectId;       // Reference to Menu item
  name: string;            // Denormalized item name
  quantity: number;        // Item quantity
  price: number;          // Denormalized item price
}
```

**Order Status Values**: "Pending", "Confirmed", "Preparing", "Ready for pickup/delivery", "Completed", "Cancelled"

**Conditional Validations**:
- Table Number: Required only for "Dine-in" orders
- Delivery Address: Required only for "Delivery" orders

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

### Contact Schema (`models/contactSchema.ts`)

Defines the structure for customer contact messages:

```typescript
interface IContact {
  name: string;        // Required, min 2 chars
  email: string;       // Required, validated email format
  message: string;     // Required, min 5 chars
  createdAt: Date;     // Auto-generated timestamp
}
```

**Validations**:
- Name: Required, trimmed, minimum 2 characters
- Email: Required, trimmed, lowercase, valid email format
- Message: Required, minimum 5 characters

## 🔌 API Endpoints

### Authentication API

#### POST `/api/admin/login`
- **Purpose**: Admin authentication with JWT
- **Required Fields**: email, password
- **Authentication**: Validates against environment variables
- **Response**: Sets secure HTTP-only cookie with JWT token
- **Security Features**:
  - bcrypt password hashing support
  - Timing-safe password comparison
  - Secure cookie configuration
  - JWT token expiration

#### POST `/api/admin/logout`
- **Purpose**: Admin logout
- **Authentication**: Clears admin authentication cookie
- **Response**: Success confirmation

### Menu API (`/api/menu`)

#### GET `/api/menu`
- **Purpose**: Retrieve all menu items
- **Response**: Array of menu items sorted by category and name
- **Success**: `{ success: true, data: MenuItem[] }`
- **Error**: `{ success: false, error: string }`

#### POST `/api/menu`
- **Purpose**: Create a new menu item
- **Authentication**: Admin JWT required
- **Required Fields**: name, description, price, category
- **Optional Fields**: image (Cloudinary URL)
- **Response**: Created menu item
- **Validation**: All required fields must be provided

#### PUT `/api/menu`
- **Purpose**: Update an existing menu item
- **Authentication**: Admin JWT required
- **Required Fields**: _id (MongoDB ObjectId)
- **Optional Fields**: Any menu item fields to update
- **Response**: Updated menu item
- **Error Cases**: Missing ID, item not found

#### DELETE `/api/menu`
- **Purpose**: Delete a menu item
- **Authentication**: Admin JWT required
- **Required Fields**: _id (MongoDB ObjectId)
- **Response**: Success confirmation
- **Error Cases**: Missing ID, item not found

### Image Upload API (`/api/menu/upload`)

#### POST `/api/menu/upload`
- **Purpose**: Upload menu item images to Cloudinary
- **Authentication**: Admin JWT required
- **Content-Type**: multipart/form-data
- **Required Fields**: file (image file)
- **Response**: `{ success: true, url: string }` (Cloudinary URL)
- **Features**:
  - Automatic folder organization ("menu")
  - Secure URL generation
  - Error handling for upload failures

### Orders API (`/api/orders`)

#### GET `/api/orders`
- **Purpose**: Retrieve all orders
- **Authentication**: Admin access recommended
- **Response**: Array of orders with populated menu items
- **Success**: `{ success: true, data: Order[] }`
- **Sorting**: By creation date (newest first)

#### POST `/api/orders`
- **Purpose**: Create a new customer order
- **Required Fields**: name, contactNumber, email, totalAmount, deliveryMethod, order[]
- **Conditional Fields**: 
  - tableNumber (required for "Dine-in")
  - deliveryAddress (required for "Delivery")
- **Response**: Created order with "Pending" status
- **Validation**: Delivery method-specific field validation

#### PUT `/api/orders`
- **Purpose**: Update order status
- **Authentication**: Admin JWT required
- **Required Fields**: _id (MongoDB ObjectId)
- **Optional Fields**: Any order fields (typically status)
- **Response**: Updated order
- **Use Cases**: Status updates, order modifications

#### DELETE `/api/orders`
- **Purpose**: Cancel/delete an order
- **Authentication**: Admin JWT required
- **Required Fields**: _id (MongoDB ObjectId)
- **Response**: Success confirmation

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
- **Authentication**: Admin JWT recommended for status changes
- **Required Fields**: _id (MongoDB ObjectId)
- **Optional Fields**: Any reservation fields to update
- **Response**: Updated reservation
- **Use Cases**: Confirm reservations, assign tables, update status

#### DELETE `/api/reservations`
- **Purpose**: Cancel/delete a reservation
- **Authentication**: Admin JWT recommended
- **Required Fields**: _id (MongoDB ObjectId)
- **Response**: Success confirmation
- **Error Cases**: Missing ID, reservation not found

### Contact API (`/api/contact`)

#### GET `/api/contact`
- **Purpose**: Retrieve all contact messages
- **Authentication**: Admin access recommended
- **Response**: Array of contact messages sorted by date (newest first)
- **Success**: `{ success: true, data: IContact[] }`

#### POST `/api/contact`
- **Purpose**: Submit a contact form message
- **Required Fields**: name, email, message
- **Response**: Created contact message
- **Validation**: Email format, minimum field lengths

#### PUT `/api/contact`
- **Purpose**: Update contact message (admin use)
- **Authentication**: Admin JWT required
- **Required Fields**: id (query parameter)
- **Optional Fields**: Any contact fields
- **Response**: Updated contact message

#### DELETE `/api/contact`
- **Purpose**: Delete contact message
- **Authentication**: Admin JWT required
- **Required Fields**: id (query parameter)
- **Response**: Success confirmation

## ⚙️ Core Functions & Utilities

### Authentication System (`lib/auth.ts`)

#### `signAdminToken(payload: { email: string })`
- **Purpose**: Creates signed JWT tokens for admin authentication
- **Parameters**: Admin email payload
- **Returns**: JWT token string with configurable expiration
- **Security**: Uses environment JWT_SECRET

#### `verifyAdminToken(token: string)`
- **Purpose**: Verifies and decodes JWT tokens
- **Parameters**: JWT token string
- **Returns**: Decoded token payload with email, iat, exp
- **Error Handling**: Throws on invalid/expired tokens

#### `verifyAdminCredentials(email: string, password: string)`
- **Purpose**: Validates admin login credentials
- **Features**:
  - Supports both plain text and bcrypt hashed passwords
  - Timing-safe password comparison
  - Environment variable credential validation
- **Returns**: Boolean indicating credential validity
- **Security**: Prevents timing attacks with crypto.timingSafeEqual

#### `safeEqual(a: string, b: string)`
- **Purpose**: Timing-safe string comparison
- **Implementation**: Uses SHA-256 hashing + crypto.timingSafeEqual
- **Security**: Mitigates timing attack vulnerabilities

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

### Frontend Components

#### Admin Components

**Sidebar (`app/admin/components/Sidebar.tsx`)**
- **Purpose**: Admin panel navigation
- **Features**: 
  - Active route highlighting
  - Lucide React icons
  - Responsive design
- **Navigation Items**: Dashboard, Menu, Reservations, Orders, Contact

#### Customer Components

**Navbar (`app/components/Navbar.tsx`)**
- **Purpose**: Main site navigation
- **Features**:
  - Material-UI AppBar with blur backdrop
  - Responsive design with mobile menu
  - Smooth hover animations
  - Brand logo and navigation links

**Hero Section (`app/components/Hero.tsx`)**
- **Purpose**: Landing page hero with video background
- **Features**:
  - Full-screen video background
  - Dark overlay for text readability
  - Call-to-action button
  - Responsive typography

**Menu Components (`app/menu/components/`)**
- **MenuItems.tsx**: Displays menu items with category filtering
- **OrderSummary.tsx**: Shopping cart functionality
- **MenuNavigation.tsx**: Category-based navigation
- **Hero.tsx**: Menu page hero section

#### Shopping Cart System

**Cart State Management (`app/menu/page.tsx`)**
```typescript
interface CartItem extends MenuItem {
  quantity: number;
}

// Cart operations
const handleAddToCart = (item: MenuItem) => { /* Add/increment logic */ };
const handleUpdateQuantity = (id: string, newQty: number) => { /* Update logic */ };
const handleRemoveItem = (id: string) => { /* Remove logic */ };
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

### Image Upload System

**Cloudinary Integration (`app/api/menu/upload/route.ts`)**
- **Purpose**: Secure image upload for menu items
- **Features**:
  - Admin authentication required
  - Automatic folder organization
  - Stream-based upload handling
  - Error handling and validation
- **Security**: JWT token verification before upload

## 🔧 Environment Setup

### Required Environment Variables

Create a `.env` file in the root directory:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/daily-grind?retryWrites=true&w=majority

# Admin credentials
ADMIN_EMAIL=admin@dailygrind.com
# Choose one of the following password options:
ADMIN_PASSWORD=your_plain_password  # For development only
# ADMIN_PASSWORD_HASH=$2b$10$... # Recommended for production (bcrypt hash)

# JWT Configuration (REQUIRED)
JWT_SECRET=your_super_secure_jwt_secret_key_here_minimum_32_characters

# Cookie settings
ADMIN_COOKIE_NAME=admin_token
ADMIN_COOKIE_MAX_AGE=604800  # 7 days in seconds

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
```

### Environment Variable Details

**Database Configuration**:
- `MONGODB_URI`: MongoDB connection string (Atlas or local)

**Authentication Configuration**:
- `ADMIN_EMAIL`: Admin login email
- `ADMIN_PASSWORD`: Plain text password (development only)
- `ADMIN_PASSWORD_HASH`: bcrypt hashed password (production recommended)
- `JWT_SECRET`: Secret key for JWT signing (minimum 32 characters)
- `ADMIN_COOKIE_NAME`: Name of authentication cookie
- `ADMIN_COOKIE_MAX_AGE`: Cookie expiration time in seconds

**File Upload Configuration**:
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret
- `CLOUDINARY_URL`: Complete Cloudinary URL (optional)

### Security Best Practices

1. **Production Passwords**: Always use `ADMIN_PASSWORD_HASH` in production
2. **JWT Secret**: Use a cryptographically secure random string
3. **Environment Files**: Never commit `.env` files to version control
4. **HTTPS**: Use secure cookies in production (automatic when NODE_ENV=production)

## ✨ Key Features Implemented

### 🔐 Authentication & Security
1. **JWT Authentication**: Secure admin login with HTTP-only cookies
2. **Password Security**: bcrypt hashing with timing-safe comparisons
3. **Route Protection**: Admin-only endpoints with token verification
4. **Secure Cookies**: HTTP-only, secure, SameSite cookie configuration

### 📊 Admin Panel
1. **Complete Dashboard**: Full admin interface with sidebar navigation
2. **Menu Management**: CRUD operations with image upload support
3. **Order Management**: View and update order status with detailed tracking
4. **Reservation Management**: Handle table bookings and status updates
5. **Contact Management**: View and manage customer inquiries
6. **Responsive Design**: Mobile-friendly admin interface

### 🛒 Customer Experience
1. **Interactive Menu**: Category-based browsing with search functionality
2. **Shopping Cart**: Add, remove, and modify items with quantity control
3. **Order System**: Complete ordering with delivery/dine-in options
4. **Reservation System**: Table booking with date/time selection
5. **Contact Form**: Customer inquiry submission
6. **Responsive UI**: Mobile-first design with Material-UI components

### 🖼️ Media Management
1. **Image Upload**: Cloudinary integration for menu item photos
2. **Video Background**: Hero section with video background
3. **Optimized Assets**: Automatic image optimization and CDN delivery

### 🗄️ Database Features
1. **Full CRUD Operations**: Complete Create, Read, Update, Delete for all entities
2. **Data Validation**: Comprehensive Mongoose schema validation
3. **Relationship Management**: Order items linked to menu items
4. **Conditional Validation**: Dynamic validation based on delivery method
5. **Connection Caching**: Optimized database connections for serverless

### 🎨 UI/UX Features
1. **Material-UI Integration**: Professional component library
2. **Tailwind CSS**: Utility-first styling with custom CSS variables
3. **Responsive Design**: Mobile-first approach with breakpoint optimization
4. **Smooth Animations**: Hover effects and transitions
5. **Accessibility**: ARIA labels and keyboard navigation support

### 🔧 Technical Features
1. **TypeScript**: Full type safety with strict mode
2. **Next.js App Router**: Modern routing with server components
3. **Turbopack**: Fast development builds
4. **Error Handling**: Consistent error patterns across all endpoints
5. **API Design**: RESTful endpoints with standard HTTP methods
6. **Environment Configuration**: Flexible environment variable setup

## 🚀 Installation & Development

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Installation Steps

```bash
# Clone the repository
git clone <repository-url>
cd daily-grind

# Install dependencies
npm install
# or
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Generate bcrypt password hash (optional)
node -e "console.log(require('bcryptjs').hashSync('your_password', 10))"

# Run development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Development Scripts

- `npm run dev`: Start development server with Turbopack
- `npm run build`: Build for production with Turbopack
- `npm start`: Start production server
- `npm run lint`: Run ESLint for code quality

## 📝 Development Notes

### Architecture Decisions
- **Next.js App Router**: Modern routing with server components and layouts
- **Turbopack**: Faster development builds and hot reloading
- **Mongoose Models**: Prevent recompilation in serverless environments
- **JWT Cookies**: Secure authentication without localStorage vulnerabilities
- **Material-UI + Tailwind**: Component library + utility classes for optimal DX

### Code Patterns
- **Consistent API Responses**: `{ success: boolean, data?: any, error?: string }`
- **Error Boundaries**: Comprehensive error handling in all API routes
- **Type Safety**: Strict TypeScript with proper interface definitions
- **Connection Caching**: Global MongoDB connection cache for performance
- **Component Composition**: Reusable components with proper prop interfaces

### Performance Optimizations
- Database connection caching for serverless environments
- Image optimization through Cloudinary CDN
- Lazy loading for menu items and components
- Efficient state management in shopping cart
- Optimized bundle splitting with Next.js

## 📚 API Documentation

### Authentication Flow

1. **Admin Login**: POST `/api/admin/login` with email/password
2. **Token Storage**: JWT stored in HTTP-only cookie
3. **Protected Routes**: Admin endpoints verify JWT from cookie
4. **Logout**: POST `/api/admin/logout` clears authentication cookie

### Response Format

All API endpoints follow a consistent response format:

```typescript
// Success Response
{
  success: true,
  data: any // The requested data
}

// Error Response
{
  success: false,
  error: string // Error message
}
```

### Error Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (authentication required)
- `404`: Not Found
- `500`: Internal Server Error

## 🔧 TypeScript Configuration

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

### Component Interfaces

```typescript
// Menu Item Interface
interface MenuItem {
  _id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category: string;
}

// Cart Item Interface
interface CartItem extends MenuItem {
  quantity: number;
}

// Order Interface
interface Order {
  _id: string;
  name: string;
  contactNumber: string;
  email: string;
  totalAmount: number;
  deliveryMethod: 'Dine-in' | 'Delivery';
  tableNumber?: number;
  deliveryAddress?: string;
  order: OrderItem[];
  status: OrderStatus;
  createdAt: Date;
}
```

## 🔮 Future Enhancements

### Planned Features
- **Real-time Updates**: WebSocket integration for live order tracking
- **Email Notifications**: Automated emails for orders and reservations
- **Payment Integration**: Stripe/PayPal integration for online payments
- **Inventory Management**: Stock tracking and low-stock alerts
- **Analytics Dashboard**: Sales reports and customer insights
- **Multi-location Support**: Support for multiple restaurant locations
- **Customer Accounts**: User registration and order history
- **Loyalty Program**: Points system and rewards
- **Mobile App**: React Native mobile application
- **Advanced Search**: Full-text search with filters and sorting

### Technical Improvements
- **Caching Layer**: Redis integration for improved performance
- **Rate Limiting**: API rate limiting for security
- **Monitoring**: Application performance monitoring
- **Testing**: Comprehensive test suite with Jest and Cypress
- **CI/CD**: Automated deployment pipeline
- **Microservices**: Split into smaller, focused services
- **GraphQL**: Alternative API layer for complex queries

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Material-UI for the component library
- Cloudinary for image management
- MongoDB for the database solution