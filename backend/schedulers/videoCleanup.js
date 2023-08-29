const cron = require('node-cron');
const Video = require('../models/Video');
const cloudinary = require('../config/cloudinaryConfig');

// Schedule a job to run once every day
cron.schedule('0 0 * * *', async () => {
  try {
    const currentDate = new Date();
    
    // Find videos that need to be deleted
    const videosToDelete = await Video.find({ deleteDate: { $lte: currentDate } });

    for (let video of videosToDelete) {
      // Remove the video from Cloudinary
      const publicId = video.url.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });

      // Remove the video from MongoDB
      await Video.findByIdAndDelete(video._id);
    }
  } catch (error) {
    console.error('Error in video cleanup:', error);
  }
});

