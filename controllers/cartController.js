// Import models
import Cart from '../models/Cart.js';    // Cart model
import Product from '../models/Product.js'; // Product model (for checking product details and stock)

// ---------------------- GET USER CART ----------------------
// Route:   GET /cart
// Access:  Private (only logged-in users)
export const getCart = async (req, res) => {
  try {
    // Find the cart for the logged-in user and include product details
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

    // If no cart found, return an empty cart
    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    // Return the cart
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ---------------------- ADD ITEM TO CART ----------------------
// Route:   POST /cart
// Access:  Private
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body; // Get product ID and quantity

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if enough stock is available
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    // Get the user's cart
    let cart = await Cart.findOne({ user: req.user._id });

    // If no cart, create a new one with this product
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [{ product: productId, quantity }]
      });
      await cart.save();
      return res.status(201).json(cart); // New cart created
    }

    // If cart exists, check if the product is already there
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex >= 0) {
      // If yes, just increase the quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // If no, add as a new item
      cart.items.push({ product: productId, quantity });
    }

    // Save the cart and return it
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ---------------------- UPDATE CART ITEM QUANTITY ----------------------
// Route:   PUT /cart/:itemId
// Access:  Private
export const updateCartItem = async (req, res) => {
  const { quantity } = req.body; // New quantity

  try {
    // Find the user's cart
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the item to update
    const itemIndex = cart.items.findIndex(
      item => item._id.toString() === req.params.itemId
    );

    if (itemIndex < 0) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Check if enough stock for the new quantity
    const product = await Product.findById(cart.items[itemIndex].product);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    // Update quantity
    cart.items[itemIndex].quantity = quantity;

    // Save and return updated cart
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ---------------------- REMOVE ITEM FROM CART ----------------------
// Route:   DELETE /cart/:itemId
// Access:  Private
export const removeFromCart = async (req, res) => {
  try {
    // Find the user's cart
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the item to remove
    const itemIndex = cart.items.findIndex(
      item => item._id.toString() === req.params.itemId
    );

    if (itemIndex < 0) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Remove the item
    cart.items.splice(itemIndex, 1);

    // Save and return updated cart
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
