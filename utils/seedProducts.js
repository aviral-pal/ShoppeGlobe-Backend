// Import dependencies
import axios from 'axios';
import Product from '../models/Product.js';

// A utility function to populate the database with sample products
const seedProducts = async () => {
  try {
    console.log('🌱 Starting product seeding...');

    // Step 1: Retrieve product data from the DummyJSON public API
    const response = await axios.get('https://dummyjson.com/products');
    const products = response.data.products;

    // Step 2: Wipe any previously stored products to avoid duplicates
    await Product.deleteMany({});

    // Step 3: Reshape the API data so it aligns with our Product schema
    const formattedProducts = products.map((product) => ({
      productId: product.id,           // Use DummyJSON's ID as our productId field
      title: product.title,            // Product name/title
      description: product.description,// A short description
      price: product.price,            // Selling price
      discountPercentage: product.discountPercentage, // Discount (if any)
      rating: product.rating,          // Average customer rating
      stock: product.stock,            // Quantity available
      brand: product.brand,            // Brand name
      category: product.category,      // Product category
      thumbnail: product.thumbnail,    // Main thumbnail image
      images: product.images,          // Additional product images
    }));

    // Step 4: Save the cleaned-up product list into the database
    const insertedProducts = await Product.insertMany(formattedProducts);

    console.log(`✅ ${insertedProducts.length} products have been seeded into the database`);
  } catch (error) {
    console.error('❌ Failed to seed products:', error.message);
  }
};

export default seedProducts;
