const express = require('express');
const router = express.Router();
const { createAssessment, getUserAssessments } = require('../controllers/assessmentController');
const { protect } = require('../middleware/authMiddleware');

// Protect all routes
router.use(protect);

// Route for saving and retrieving assessments
router.route('/')
  .post(createAssessment)
  .get(getUserAssessments);

module.exports = router;
