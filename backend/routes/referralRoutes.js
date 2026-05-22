const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createReferral, getUserReferrals } = require('../controllers/referralController');

const router = express.Router();

const attachUserIfPresent = (req, res, next) => {
  if (!req.headers.authorization?.startsWith('Bearer')) {
    return next();
  }

  return protect(req, res, next);
};

// POST — public, no auth required (self-referral form)
router.post('/', attachUserIfPresent, createReferral);

// GET — protected, admin/authenticated use only
router.get('/', protect, getUserReferrals);

module.exports = router;
