// This schema represents the structure of every product stored in MongoDB.
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  stock: Number
});

module.exports = mongoose.model('Product', productSchema);