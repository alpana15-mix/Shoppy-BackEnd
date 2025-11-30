// This schema stores all user-related data such as name, email, password.
// This model is used for authentication(register + login).
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true } // will store hashed password
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);