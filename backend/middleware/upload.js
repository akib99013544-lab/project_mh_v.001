const multer = require('multer');

// Store files in memory for direct Cloudinary upload
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15 MB limit (adjustable)
});

module.exports = upload;
