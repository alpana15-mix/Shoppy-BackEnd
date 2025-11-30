const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

// optional: create product (for testing)
exports.createProduct = async (req, res) => {
  const { name, price, description, stock } = req.body;
  const p = await Product.create({ name, price, description, stock });
  res.status(201).json(p);
};