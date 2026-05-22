const mongoose = require('mongoose');

const ResourceHubAssetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    default: '',
    trim: true,
  },
  imageUrl: {
    type: String,
    default: '',
  },
  fileUrl: {
    type: String,
    default: '',
  },
  fileType: {
    type: String,
    default: '',
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  uploadedByEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('ResourceHubAsset', ResourceHubAssetSchema);
