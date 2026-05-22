const Assessment = require('../models/Assessment');

// @desc    Save a new self-assessment attempt
// @route   POST /api/assessments
// @access  Private
const createAssessment = async (req, res) => {
  try {
    const { assessmentType, score, result, answers } = req.body;

    if (!assessmentType || score === undefined || !result || !answers) {
      return res.status(400).json({ message: 'Please provide all assessment details' });
    }

    if (!['Anxiety', 'Depression'].includes(assessmentType)) {
      return res.status(400).json({ message: 'Invalid assessment type provided' });
    }

    // Create a new record bound to the authenticated user ID and email
    const assessment = await Assessment.create({
      userId: req.user._id,
      userEmail: req.user.email,
      assessmentType,
      score,
      result,
      answers,
    });

    res.status(201).json(assessment);
  } catch (error) {
    console.error('Save Assessment Error:', error);
    res.status(500).json({ message: 'Server error during assessment saving', error: error.message });
  }
};

// @desc    Retrieve all assessment attempts for the authenticated user
// @route   GET /api/assessments
// @access  Private
const getUserAssessments = async (req, res) => {
  try {
    // Find all records matching the authenticated user ID, sorted chronologically
    const assessments = await Assessment.find({ userId: req.user._id }).sort({ createdAt: 1 });
    res.json(assessments);
  } catch (error) {
    console.error('Get User Assessments Error:', error);
    res.status(500).json({ message: 'Server error during assessment retrieval', error: error.message });
  }
};

module.exports = {
  createAssessment,
  getUserAssessments,
};
