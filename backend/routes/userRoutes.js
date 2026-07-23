const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const User = require('../models/User.js');

const router = express.Router();

// REGISTER A NEW USER
router.post('/register', async (req, res) => {
  // ... (your existing register code is here, no changes needed)
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// --- NEW CODE: LOGIN A USER ---
// @desc    Authenticate a user and get token
// @route   POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });

    // 2. If user exists, compare the entered password with the stored hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
      // 3. If passwords match, send back user data and a new token
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: '30d', // Token expires in 30 days
        }),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;