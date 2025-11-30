// ===============================
//  AUTH CONTROLLER
//  Handles User Registration & Login
// ===============================

const User = require("../models/User");     // Import User model
const bcrypt = require("bcryptjs");           // For hashing and comparing passwords
const jwt = require("jsonwebtoken");        // For generating authentication token

// =====================================
//          REGISTER USER
// =====================================
exports.register = async (req, res) => {
  try {
    // Get user details from request body
    const { name, email, password } = req.body;

    // Check if email or password is missing
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Check if user already exists in database
    const user_exists = await User.findOne({ email });

    if (user_exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password before saving (security best-practice)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Send success response
    return res.status(201).json({
      message: "User created",
      user,
    });

  } catch (error) {
    return res.status(500).json({ message: "Registration failed", error });
  }
};

// =====================================
//              LOGIN USER
// =====================================
exports.login = async (req, res) => {
  try {
    // Extract email and password
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Find user in database
    const user = await User.findOne({ email });

    if (!user) {
      // User does not exist
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password with hashed version in DB
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token with user ID
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Successful login response
    return res.json({
      message: "Login successful",
      token,
    });

  } catch (error) {
    return res.status(500).json({ message: "Login failed", error });
  }
};