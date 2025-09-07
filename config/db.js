// Import the mongoose library for MongoDB interaction
import mongoose from 'mongoose';

// Define an asynchronous function to connect to MongoDB
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the connection URI from environment variables
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Log success message if connection is established
    console.log('MongoDB Connected...');
  } catch (err) {
    // Log any errors that occur during the connection attempt
    console.error('MongoDB Connection Error:', err);
    
    // Exit the process with a failure code (1) if connection fails
    process.exit(1);
  }
};

// Export the connectDB function to be used in other parts of the application
export default connectDB;