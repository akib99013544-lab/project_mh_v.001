const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { uploadAsset, getAssets } = require('../controllers/resourceHubController');
const upload = require('../middleware/upload');

const router = express.Router();

// POST /api/resourcehub - upload a resource (image/pdf/doc)
router.post('/', protect, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'file', maxCount: 1 }]), uploadAsset);

// GET /api/resourcehub - list resources (optional ?myOnly=true)
router.get('/', protect, getAssets);

module.exports = router;
