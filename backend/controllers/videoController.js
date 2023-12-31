// backend/controllers/videoController.js

const cloudinary = require('../config/cloudinaryConfig');
const Video = require('../models/Video');

// Controller for uploading a video to Cloudinary
exports.uploadVideo = async (req, res) => {
  try {
    if (req.file) {
      const { title } = req.body;
      const result = await cloudinary.uploader.upload_stream(
        { resource_type: 'video' },
        (error, result) => {
          if (error) throw error;

          const newVideo = new Video({
            title,
            url: result.secure_url,
            uploadDate: new Date(),
            deleteDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
            viewCount: 0,
          });

          newVideo.save()
            .then(video => res.status(201).json({ message: 'Video uploaded successfully!', video }))
            .catch(err => { throw err; });
        }
      ).end(req.file.buffer);

    } else {
      throw new Error('No file uploaded');
    }
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ message: 'Error uploading video.' });
  }
};


// Controller for getting all videos
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json({ videos });
  } catch (error) {
    console.error('Error getting all videos:', error);
    res.status(500).json({ message: 'Error getting all videos.' });
  }
};

// Controller for getting video details by ID
exports.getVideoById = async (req, res) => {
  try {
    const videoId = req.params.id;

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: 'Video not found.' });
    }
    // Increment the view count
    video.viewCount++;
    await video.save();
    
    res.status(200).json({ video });
  } catch (error) {
    console.error('Error getting video by ID:', error);
    res.status(500).json({ message: 'Error getting video by ID.' });
  }
};

// Controller for updating view count of a video
exports.incrementViewCount = async (req, res) => {
  try {
    const videoId = req.params.id;

    await Video.findByIdAndUpdate(videoId, { $inc: { viewCount: 1 } });

    res.status(200).json({ message: 'View count updated successfully.' });
  } catch (error) {
    console.error('Error updating view count:', error);
    res.status(500).json({ message: 'Error updating view count.' });
  }
};

// video views increment
exports.incrementViewCount = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    video.viewCount += 1;
    await video.save();

    res.status(200).json({ message: 'View count incremented successfully' });
  } catch (error) {
    console.error('Error incrementing view count:', error);
    res.status(500).json({ message: 'Server error' });
  }
};