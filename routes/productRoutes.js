import express from 'express';
import { 
  getProducts,    // Get all products
  getProductById, // Get one product by ID
  createProduct,  // Add a new product
  seedProducts    // Add sample products (seeding)
} from '../controllers/productController.js';

const router = express.Router(); // Create router

// /api/products
// GET → Get all products
// POST → Add a new product
router.route('/')
  .get(getProducts)
  .post(createProduct);

// /api/products/:id
// GET → Get product by ID
router.get('/:id', getProductById);

// /api/products/seed
// POST → Add sample products
router.post('/seed', seedProducts);

export default router; // Export router
