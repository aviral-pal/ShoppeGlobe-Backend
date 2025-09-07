import express from 'express';
import { register, login } from '../controllers/authController.js'; // Bring in the controller functions for handling authentication

const router = express.Router(); // Initialize a new router to define auth-related endpoints

// ===========================
// User Registration Endpoint
// Method: POST
// URL:    /auth/register
// Purpose: Creates a new user account
// Logic: Delegates the actual registration work to the `register` controller
// ===========================
router.post('/register', register);

// ===========================
// User Login Endpoint
// Method: POST
// URL:    /auth/login
// Purpose: Authenticates an existing user and issues a token
// Logic: Passes login details to the `login` controller for validation
// ===========================
router.post('/login', login);

export default router; // Make this router available to be plugged into the main server file
