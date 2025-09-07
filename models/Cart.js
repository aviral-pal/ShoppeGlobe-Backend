import mongoose from 'mongoose';

// Schema for a single cart item
const cartItemSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, // Link to a Product
    ref: 'Product',                       // Pull data from Product collection
    required: true                        // Product is required
  },
  quantity: { 
    type: Number,                         // How many of that product
    required: true,                       // Quantity is required
    min: 1                                // Must be at least 1
  }
});

// Schema for the whole cart
const cartSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, // Link to the User
    ref: 'User',                          // Pull data from User collection
    required: true,                       // User is required
    unique: true                          // One cart per user
  },
  items: [cartItemSchema]                 // List of cart items
}, { timestamps: true });                  // Adds createdAt and updatedAt automatically

// Create Cart model
const Cart = mongoose.model('Cart', cartSchema);

// Export for use in other files
export default Cart;
