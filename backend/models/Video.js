// backend/models/Video.js

const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  uploadDate: { type: Date, required: true },
  deleteDate: { type: Date, required: true },
  viewCount: { type: Number, default: 0 },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
