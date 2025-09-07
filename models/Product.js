import mongoose from 'mongoose';

// Product schema
const productSchema = new mongoose.Schema({
  // title of the product
  title: { 
    type: String, 
    required: true 
  },

  // short description
  description: { 
    type: String, 
    required: true 
  },

  // price of the product
  price: { 
    type: Number, 
    required: true 
  },

  // optional discount percentage
  discountPercentage: { 
    type: Number 
  },

  // optional rating (e.g., out of 5)
  rating: { 
    type: Number 
  },

  // available quantity in stock
  stock: { 
    type: Number, 
    required: true 
  },

  // optional brand name
  brand: { 
    type: String 
  },

  // optional category (e.g., electronics, fashion)
  category: { 
    type: String 
  },

  // main product image URL
  thumbnail: { 
    type: String 
  },

  // other image URLs
  images: [{ 
    type: String 
  }]
}, { 
  timestamps: true // adds createdAt and updatedAt
});

// Create Product model
const Product = mongoose.model('Product', productSchema);

// Export model
export default Product;
