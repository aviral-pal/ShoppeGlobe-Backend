import express from 'express';
import { protect } from '../middlewares/auth.js'; // Checks if the user is logged in
import { 
  getCart,        // Get user's cart
  addToCart,      // Add a product to cart
  updateCartItem, // Change quantity of an item
  removeFromCart  // Remove an item from cart
} from '../controllers/cartController.js';

const router = express.Router(); // Create a router

// All cart routes need the user to be logged in
router.use(protect);

// GET /api/cart
// Get the current user's cart
router.get('/', getCart);

// POST /api/cart
// Add a product to the cart
router.post('/', addToCart);

// PUT /api/cart/:itemId
// Update the quantity of a cart item
router.put('/:itemId', updateCartItem);

// DELETE /api/cart/:itemId
// Delete a cart item
router.delete('/:itemId', removeFromCart);

export default router; // Export router
