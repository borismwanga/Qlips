// backend/routes/api.js

const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

// Upload a video
router.post('/upload', videoController.uploadVideo);

// Get video details by ID
router.get('/videos/:id', videoController.getVideoDetails);

// Increment view count for a video
router.patch('/videos/:id/increment-view', videoController.incrementViewCount);

module.exports = router;
