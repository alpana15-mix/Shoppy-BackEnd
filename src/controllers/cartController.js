// Handles adding, updating, deleting items in the cart

const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

// -------- ADD TO CART --------
exports.addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  // Check whether product exists
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  // Validate stock
  if (product.stock < quantity)
    return res.status(400).json({ message: 'Not enough stock' });

  // Find existing cart item for logged-in user
  let item = await CartItem.findOne({ user: req.user._id, product: productId });

  // If exists → increase quantity
  if (item) {
    item.quantity += quantity;
  } else {
    // Else → create new cart item
    item = new CartItem({
      user: req.user._id,
      product: productId,
      quantity
    });
  }

  await item.save();
  res.status(201).json(item);
};

// -------- GET USER CART --------
exports.getCart = async (req, res) => {
  // Find all cart items of this user
  const items = await CartItem.find({ user: req.user._id }).populate('product');

  res.json(items);
};

// -------- UPDATE CART ITEM --------
exports.updateCart = async (req, res) => {
  const id = req.params.id;
  const { quantity } = req.body;

  const item = await CartItem.findById(id);

  if (!item) return res.status(404).json({ message: 'Cart item not found' });

  // Check if the cart item belongs to logged-in user
  if (String(item.user) !== String(req.user._id))
    return res.status(403).json({ message: 'Forbidden' });

  // Update quantity
  item.quantity = quantity;
  await item.save();

  res.json(item);
};

// -------- DELETE CART ITEM --------
exports.removeFromCart = async (req, res) => {
  const id = req.params.id;

  const item = await CartItem.findById(id);

  if (!item) return res.status(404).json({ message: 'Cart item not found' });

  if (String(item.user) !== String(req.user._id))
    return res.status(403).json({ message: 'Forbidden' });

  // Delete item using findByIdAndDelete
  await CartItem.findByIdAndDelete(id);

  res.json({ message: 'Removed' });
};