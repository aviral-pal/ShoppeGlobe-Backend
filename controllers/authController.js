// Import required modules
import jwt from 'jsonwebtoken';   // Used to create JSON Web Tokens (JWT)
import User from '../models/User.js'; // Import the User model for database operations

// ---------------------- REGISTER A NEW USER ----------------------
// Route:   POST /auth/register
// Access:  Public (anyone can register)
export const register = async (req, res) => {
  // Get name, email, and password from request body
  const { name, email, password } = req.body;

  try {
    // Check if a user with this email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      // If user found, stop and return an error
      return res.status(400).json({ message: 'User already exists' });
    }

    // If no user found, create a new user
    const user = await User.create({
      name,
      email,
      password // Password will be automatically hashed (User model pre-save hook)
    });

    if (user) {
      // Successfully created a new user
      res.status(201).json({
        _id: user._id,         // Send user ID
        name: user.name,       // Send user name
        email: user.email,     // Send user email
        token: generateToken(user._id) // Also send a JWT token for login
      });
    } else {
      // If user creation failed
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    // If something unexpected happens
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ---------------------- USER LOGIN ----------------------
// Route:   POST /auth/login
// Access:  Public (anyone can try to log in)
export const login = async (req, res) => {
  // Get email and password from request body
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // If user exists and password is correct
    if (user && (await user.matchPassword(password))) {
      // Send back user data + token
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id) // Create a fresh JWT token
      });
    } else {
      // Wrong email or password
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    // If something goes wrong with the database or server
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ---------------------- HELPER: GENERATE JWT TOKEN ----------------------
const generateToken = (id) => {
  // Create a JWT token with user ID as payload
  return jwt.sign(
    { id },                  // Data to store in token
    process.env.JWT_SECRET,  // Secret key (from environment variables)
    { expiresIn: '30d' }     // Token will expire in 30 days
  );
};
