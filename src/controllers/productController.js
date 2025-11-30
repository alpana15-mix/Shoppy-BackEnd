// Controller responsible for product CRUD operations

const Product = require('../models/Product');

// --------- GET ALL PRODUCTS ----------
exports.getProducts = async (req, res) => {
  // Fetch all products from database
  const products = await Product.find();
  res.json(products);
};

// --------- GET PRODUCT BY ID ----------
exports.getProductById = async (req, res) => {
  const id = req.params.id;

  // Find product by MongoDB ObjectId
  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
};

// --------- CREATE PRODUCT (for testing) ----------
exports.createProduct = async (req, res) => {
  const { name, price, description, stock } = req.body;

  // Create new product in database
  const product = await Product.create({ name, price, description, stock });

  res.status(201).json(product);
};