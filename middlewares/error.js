/**
 * Global Error Handler
 * --------------------
 * This middleware handles all errors in one place.
 * It checks for common error types (like bad IDs, validation errors, duplicates, JWT issues)
 * and sends a clean JSON response with the right status code.
 */
const errorHandler = (err, req, res, next) => {
  // Print the error with a time and stack trace for debugging
  console.error(`[${new Date().toISOString()}] Error:`, err.stack);

  // If the ID sent to MongoDB is not valid (e.g., wrong format)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID format',
      details: `Problem with ${err.path}: ${err.value}`
    });
  }

  // If MongoDB validation fails (e.g., required fields missing)
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: Object.values(err.errors).map(val => ({
        field: val.path,
        message: val.message
      }))
    });
  }

  // If there is a duplicate key (e.g., email already exists)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      error: 'Duplicate value',
      details: `${field} '${err.keyValue[field]}' already exists`
    });
  }

  // If JWT is not valid
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: 'Invalid token',
      solution: 'Please login again'
    });
  }

  // If JWT has expired
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      error: 'Token expired',
      solution: 'Please login again'
    });
  }

  // Any other error
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Server Error',
    // Show the stack only if in development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

/**
 * 404 Handler
 * -----------
 * Runs when no route matches.
 * Creates a "Not Found" error and passes it to the error handler.
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.method} ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export { errorHandler, notFound };
