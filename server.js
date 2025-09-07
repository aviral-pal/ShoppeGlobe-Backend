// Importing core dependencies
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Importing custom route handlers
import productRoutes from './routes/productRoutes.js'; // Product APIs
import cartRoutes from './routes/cartRoutes.js';       // Cart-related APIs
import authRoutes from './routes/authRoutes.js';       // Authentication APIs

// Importing custom error-handling middlewares
import { errorHandler, notFound } from './middlewares/error.js';

// Load environment variables from the .env file
dotenv.config();

// Create an Express application instance
const app = express();

// ---------- Global Middlewares ---------- //

// Allow cross-origin requests (helps frontend apps hosted on other domains)
app.use(cors());

// Enable parsing of JSON payloads in incoming requests
app.use(express.json());

// ---------- Database Connection ---------- //

// Establish a connection to MongoDB using the URI stored in environment variables
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connection established'))
  .catch((err) => console.error('❌ Failed to connect to MongoDB:', err));

// ---------- Register Routes ---------- //

// Product-related endpoints (e.g., fetch all products, get by ID)
app.use('/products', productRoutes);

// Shopping cart-related endpoints (add, update, remove items)
app.use('/cart', cartRoutes);

// User registration and login endpoints
app.use('/auth', authRoutes);

// Handle any unknown routes with a 404 response
app.use(notFound);

// Centralized error handler for all thrown errors in routes/middlewares
app.use(errorHandler);

// ---------- Start the HTTP Server ---------- //

// Use the PORT from the environment or default to 5000
const PORT = process.env.PORT || 5000;

// Start listening for incoming requests
app.listen(PORT, () => {
  console.log(`🚀 Server is running and listening on port ${PORT}`);
});
