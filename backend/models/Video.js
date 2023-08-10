// backend/models/Video.js

const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: String,
  url: String, // Store the Cloudinary URL
  uploadDate: Date,
  deleteDate: Date,
  viewCount: Number,
});

module.exports = mongoose.model('Video', videoSchema);
