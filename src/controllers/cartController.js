const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  if (product.stock < quantity) return res.status(400).json({ message: 'Not enough stock' });

  let item = await CartItem.findOne({ user: req.user._id, product: productId });
  if (item) {
    item.quantity += quantity;
  } else {
    item = new CartItem({ user: req.user._id, product: productId, quantity });
  }
  await item.save();
  res.status(201).json(item);
};

exports.getCart = async (req, res) => {
  const items = await CartItem.find({ user: req.user._id }).populate('product');
  res.json(items);
};

exports.updateCart = async (req, res) => {
  const { quantity } = req.body;
  const item = await CartItem.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Cart item not found' });
  if (String(item.user) !== String(req.user._id)) return res.status(403).json({ message: 'Forbidden' });
  item.quantity = quantity;
  await item.save();
  res.json(item);
};

exports.removeFromCart = async (req, res) => {
  const id = req.params.id;
  const item = await CartItem.findById(id);

  if (!item) return res.status(404).json({ message: 'Cart item not found' });
  if (String(item.user) !== String(req.user._id))
    return res.status(403).json({ message: 'Forbidden' });

  await CartItem.findByIdAndDelete(id);

  res.json({ message: 'Removed' });
};