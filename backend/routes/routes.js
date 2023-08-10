// backend/routes/routes.js

const express = require('express');
const router = express.Router();
const path = require('path');
const upload = require('../config/multerConfig'); // Use relative path without path.join

const videoController = require('../controllers/videoController');

// Home page route
router.get('/', (req, res) => {
    // Handle your home page content here
    res.send('Welcome to Qlips!');
});
// Upload a video route
router.post('/upload', upload.single('file'), videoController.uploadVideo);

// Get video details by ID route
router.get('/videos/:id', videoController.getVideoById);

// Get all videos route
router.get('/videos', videoController.getAllVideos);

// Add more routes as needed

module.exports = router;
