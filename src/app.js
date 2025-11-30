// Load environment variables from .env file
require('dotenv').config();

// Import express framework
const express = require('express');

// Import mongoose for MongoDB connection
const mongoose = require('mongoose');

// This package helps catch async errors without try/catch blocks in controllers
require('express-async-errors');

// Import route files
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');

// Import global error handling middleware
const errorHandler = require('./middlewares/errorHandler');

// Initialize express app
const app = express();

// Enable JSON body parsing for all requests
app.use(express.json());

// ---------- Connect to MongoDB ----------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// ---------- Mount Routes ----------

// All authentication related routes (register, login)
app.use('/', authRoutes);

// All product related routes (list, get by ID, create)
app.use('/', productRoutes);

// All cart related routes (add, update, delete)
app.use('/', cartRoutes);

// Global error handler → catches all errors and sends clean JSON response
app.use(errorHandler);

// Start server on provided PORT
app.listen(process.env.PORT || 5000, () => {
  console.log("Server running...");
});