const mongoose = require('mongoose');

const AssessmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userEmail: {
      type: String,
      required: [true, 'User email is required'],
      lowercase: true,
      trim: true,
    },
    assessmentType: {
      type: String,
      required: [true, 'Please select the assessment type'],
      enum: ['Anxiety', 'Depression'],
    },
    score: {
      type: Number,
      required: [true, 'Please provide the total score'],
    },
    result: {
      type: String,
      required: [true, 'Please provide the assessment classification result'],
    },
    answers: {
      type: [Number],
      required: [true, 'Please provide the raw answer list'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Assessment', AssessmentSchema);
