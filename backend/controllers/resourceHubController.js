const ResourceHubAsset = require('../models/ResourceHubAsset');
const cloudinary = require('../utils/cloudinary');

// @desc   Upload a new resource asset (image, PDF, doc, etc.)
// @route  POST /api/resourcehub
// @access Private
// Helper function to handle upload
const uploadFile = async (file, isCloudinaryConfigured) => {
  if (isCloudinaryConfigured) {
    const uploadPromise = new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
      stream.end(file.buffer);
    });
    const uploadResult = await uploadPromise;
    return {
      url: uploadResult.secure_url,
      type: uploadResult.resource_type || file.mimetype.split('/')[0]
    };
  } else {
    console.warn('⚠️ Cloudinary not configured or using placeholders. Falling back to local Base64 encoding.');
    const base64Data = file.buffer.toString('base64');
    return {
      url: `data:${file.mimetype};base64,${base64Data}`,
      type: file.mimetype.split('/')[0]
    };
  }
};

const uploadAsset = async (req, res) => {
  try {
    console.log('Upload request user:', req.user);
    const { title, description } = req.body;
    console.log('Upload request body:', { title, description });

    const imageFile = req.files && req.files['image'] && req.files['image'][0];
    const attachedFile = req.files && req.files['file'] && req.files['file'][0];

    console.log('Files received:', {
      image: imageFile ? imageFile.originalname : 'none',
      file: attachedFile ? attachedFile.originalname : 'none'
    });

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    if (!imageFile && !attachedFile) {
      return res.status(400).json({ message: 'At least one file (image or attachment) is required' });
    }

    // Ensure user is authenticated
    if (!req.user) {
      console.error('Upload Asset Error: User not authenticated');
      return res.status(401).json({ message: 'Authentication required' });
    }

    let imageUrl = '';
    let fileUrl = '';
    let fileType = '';

    // Check if Cloudinary credentials are valid
    const isCloudinaryConfigured = 
      process.env.CLOUDINARY_CLOUD_NAME && 
      process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name' &&
      process.env.CLOUDINARY_API_KEY && 
      process.env.CLOUDINARY_API_KEY !== 'your_api_key';

    if (imageFile) {
      const uploadResult = await uploadFile(imageFile, isCloudinaryConfigured);
      imageUrl = uploadResult.url;
    }

    if (attachedFile) {
      const uploadResult = await uploadFile(attachedFile, isCloudinaryConfigured);
      fileUrl = uploadResult.url;
      fileType = uploadResult.type;
    }

    const asset = await ResourceHubAsset.create({
      title,
      description: description || '',
      imageUrl,
      fileUrl,
      fileType,
      uploadedBy: req.user._id,
      uploadedByEmail: req.user.email,
    });

    res.status(201).json(asset);
  } catch (err) {
    // Log full error for debugging
    console.error('Upload Asset Error:', err);
    // If Cloudinary upload failed, send specific message
    const clientMessage = err.name === 'Error' && err.message.includes('cloudinary')
      ? 'Failed to upload file to Cloudinary'
      : 'Server error uploading asset';
    res.status(500).json({ message: clientMessage, error: err.message });
  }
};

// @desc   Get resource hub assets (optionally filter to current user)
// @route  GET /api/resourcehub
// @access Private
const getAssets = async (req, res) => {
  try {
    const filter = {};
    if (req.query.myOnly === 'true') {
      filter.uploadedBy = req.user._id;
    }
    const assets = await ResourceHubAsset.find(filter).sort({ createdAt: -1 });
    res.json(assets);
  } catch (err) {
    console.error('Get Assets Error:', err);
    res.status(500).json({ message: 'Server error fetching assets', error: err.message });
  }
};

module.exports = { uploadAsset, getAssets };
