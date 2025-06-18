const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../config/db');
const User = require('../models/user');
require('dotenv').config();

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Basic field validation
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.loginUser(email, password);
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(401).json({ message: err.message });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  // Basic field validation
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Optional: Validate role
  const validRoles = ['student', 'admin', 'faculty'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await User.createUser(name, email, hashedPassword, role);

    const token = jwt.sign({ id: userId, email }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });
    res.status(201).json({ token, id: userId });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(409).json({ message: err.message });
  }
}
module.exports = {
  loginUser,
  registerUser,
};
