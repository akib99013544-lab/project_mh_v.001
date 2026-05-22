const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your full name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter your email address'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    ageRange: {
      type: String,
      required: [true, 'Please select your age range'],
      enum: ['50–59', '60–69', '70+'],
    },
    livingSituation: {
      type: String,
      required: [true, 'Please select your living situation'],
      enum: ['Live alone', 'With family', 'Aged care'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', UserSchema);
