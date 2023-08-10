// backend/controllers/videoController.js

const Video = require('../models/Video'); // Import the Video model


// Controller for uploading a video
exports.uploadVideo = async (req, res) => {
  try {
    // Check if the user uploaded a file
    if (req.file) {
      // Extract the title from the request body
      const { title } = req.body;

      // Get the file's path
      const path = req.file.path;

      // Create a new Video document in the database
      const newVideo = new Video({
        title,
        url: req.file.filename,
        uploadDate: new Date(),
        deleteDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        viewCount: 0,
      });

      // Save the new video document
      await newVideo.save();

      res.status(201).json({ message: 'Video uploaded successfully!', video: newVideo });
    } else {
      // The user did not upload a file
      throw new Error('No file uploaded');
    }
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ message: 'Error uploading video.' });
  }
};