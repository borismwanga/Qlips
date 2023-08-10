// backend/routes/routes.js

const express = require('express');
const router = express.Router();
const path = require('path');
const upload = require('../config/multerConfig'); // Use relative path without path.join

const videoController = require('../controllers/videoController');

// Define your routes
router.post('/upload', upload.single('file'), videoController.uploadVideo);

// Add more routes as needed

module.exports = router;
