import jwt from 'jsonwebtoken';           // to verify JWT tokens
import asyncHandler from 'express-async-handler'; // to handle async errors
import User from '../models/User.js';     // user model

// Middleware to protect routes (only for logged-in users)
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the request has an Authorization header with Bearer token
  if (
    req.headers.authorization && 
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (after "Bearer ")
      token = req.headers.authorization.split(' ')[1];

      // Verify token and decode user data
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by ID from decoded token (exclude password)
      req.user = await User.findById(decoded.id).select('-password');

      // Go to next middleware or route
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401);
      throw new Error('Not authorized, invalid or expired token');
    }
  }

  // If no token found
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token provided');
  }
});

export { protect };
