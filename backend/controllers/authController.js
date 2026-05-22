const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper to generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'mental_health_geronessence_secret_key', {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, ageRange, livingSituation } = req.body;

    // Basic fields check
    if (!name || !email || !password || !ageRange || !livingSituation) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if user already exists
    const normalizedEmail = email.toLowerCase().trim();
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      ageRange,
      livingSituation,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        ageRange: user.ageRange,
        livingSituation: user.livingSituation,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data provided' });
    }
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
};

// @desc    Authenticate a user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Find User
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      ageRange: user.ageRange,
      livingSituation: user.livingSituation,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};

// @desc    Get current user profile + all their activity
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const Assessment = require('../models/Assessment');
    const Referral   = require('../models/Referral');

    const [assessments, referrals] = await Promise.all([
      Assessment.find({ userId: req.user._id }).sort({ createdAt: -1 }),
      Referral.find({ submittedByEmail: req.user.email }).sort({ createdAt: -1 }),
    ]);

    res.json({
      user: {
        _id:             req.user._id,
        name:            req.user.name,
        email:           req.user.email,
        ageRange:        req.user.ageRange,
        livingSituation: req.user.livingSituation,
        createdAt:       req.user.createdAt,
      },
      assessments,
      referrals,
      stats: {
        totalAssessments: assessments.length,
        totalReferrals:   referrals.length,
        lastActive:       assessments[0]?.createdAt || referrals[0]?.createdAt || req.user.createdAt,
        anxietyCount:     assessments.filter(a => a.assessmentType === 'Anxiety').length,
        depressionCount:  assessments.filter(a => a.assessmentType === 'Depression').length,
      },
    });
  } catch (error) {
    console.error('Get Profile Error:', error);
    res.status(500).json({ message: 'Server error fetching profile', error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
