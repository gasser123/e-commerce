# MyShop - E-commerce Web Application

MyShop is a feature-rich e-commerce platform that enables users to browse products, add them to a cart, make secure payments, and leave product reviews. The application also provides an admin panel for managing products, orders, and users.

## Features

### User

- Browse products
- Add items to the shopping cart
- Make secure payments via PayPal
- Review purchased products

### Admin

- Access an admin panel
- Manage products: add, update, and remove items
- View and manage orders and users

---

## Tech Stack

### Backend

- **Framework**: NestJS
- **Database**: PostgreSQL (using pg)
- **ORM**: TypeORM
- **Utilities**: class-validator, class-transformer, cookie-parser, bcrypt for hashing
- **Authentication**: JWT in httponly cookie

### Frontend

- **Framework**: TypeScript React + Vite
- **UI**: Bootstrap and react-bootstrap
- **State Management**: RTK (Redux Toolkit) and RTK Query
- **Routing**: react-router
- **Payment Integration**: @paypal/react-paypal-js
- **Validation**: Zod

---

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env.development.local` and `.env.test.local` files in backend directory:

| Variable            | Description                              |
| ------------------- | ---------------------------------------- |
| `PORT`              | Server port                              |
| `POSTGRES_HOST`     | PostgreSQL database host                 |
| `POSTGRES_DB`       | Database name                            |
| `POSTGRES_USER`     | Database username                        |
| `POSTGRES_PASSWORD` | Database password                        |
| `BCRYPT_PASSWORD`   | Pepper for password hashing              |
| `SALT_ROUNDS`       | Number of salt rounds for hashing        |
| `JWT_SECRET`        | JWT secret for token generation          |
| `PAYPAL_CLIENT_ID`  | PayPal Client ID                         |
| `SERVER_URL`        | Server URL (e.g., http://localhost:3000) |

---

## Setup

### Backend

1. **Prepare Environment**:

   - Add a directory named `uploads` in the backend directory.
   - Configure environment variables in `.env.development.local` for development and `.env.test.local` for testing.

2. **Run the Backend**:
   ```bash
   cd backend
   npm run migration:run  # Run database migrations
   npm run seed           # Seed database with sample products and an admin user
   npm run start:dev      # Start the development server
   ```

### Frontend

```bash
cd frontend
npm run dev      # Start the development server
```
