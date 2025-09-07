import Product from '../models/Product.js'; // Product model for database operations
import axios from 'axios'; // HTTP client for external API requests

// @desc    Get all products with optional category filter
// @route   GET /products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const { category } = req.query; // Extract category query param if provided
    const query = category ? { category } : {}; // Build query object
    const products = await Product.find(query); // Fetch products from DB

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Get Products Error:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get a single product by ID
// @route   GET /products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Find product by ID

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    console.error('Get Product Error:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, error: 'Invalid product ID format' });
    }

    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create a new product (Admin only)
// @route   POST /products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock } = req.body; // Extract fields

    if (!title || !description || !price || !category || !stock) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required: title, description, price, category, stock'
      });
    }

    const product = new Product({ title, description, price, category, stock });
    const createdProduct = await product.save(); // Save product to DB

    res.status(201).json({ success: true, data: createdProduct });
  } catch (error) {
    console.error('Create Product Error:', error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: Object.values(error.errors).map(val => val.message)
      });
    }

    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Seed database with sample products from dummyjson.com
// @route   POST /products/seed
// @access  Public (should be protected in production)
export const seedProducts = async (req, res) => {
  try {
    const response = await axios.get('https://dummyjson.com/products'); // Fetch sample products
    const products = response.data.products;

    // Map API data to Product schema format
    const formattedProducts = products.map(product => ({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      rating: product.rating,
      brand: product.brand,
      thumbnail: product.thumbnail,
      images: product.images
    }));

    await Product.deleteMany({}); // Optional: clear existing products
    const insertedProducts = await Product.insertMany(formattedProducts); // Bulk insert

    res.status(201).json({
      success: true,
      message: 'Products seeded successfully',
      count: insertedProducts.length
    });
  } catch (error) {
    console.error('Seed Products Error:', error);
    res.status(500).json({ success: false, error: 'Error seeding products', details: error.message });
  }
};
