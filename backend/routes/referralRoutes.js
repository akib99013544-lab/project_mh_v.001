const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createReferral, getUserReferrals } = require('../controllers/referralController');

const router = express.Router();

// POST — public, no auth required (self-referral form)
router.post('/', createReferral);

// GET — protected, admin/authenticated use only
router.get('/', protect, getUserReferrals);

module.exports = router;
