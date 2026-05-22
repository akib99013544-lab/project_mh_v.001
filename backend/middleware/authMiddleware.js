const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token from the 'Bearer <token>' pattern
      token = req.headers.authorization.split(' ')[1];

      // Decode and verify the token signature
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mental_health_geronessence_secret_key');

      // Fetch the matching user record, excluding the password hash
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found, unauthorized access' });
      }

      next();
    } catch (error) {
      console.error('Authentication verification failed:', error);
      return res.status(401).json({ message: 'Not authorized, session token has expired or is invalid' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no session token provided' });
  }
};

module.exports = { protect };
