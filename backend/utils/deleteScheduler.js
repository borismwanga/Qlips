// backend/utils/deleteScheduler.js

const schedule = require('node-cron');
const Video = require('../models/Video');

// Delete videos scheduled for deletion
schedule.schedule('* * * * *', async () => {
  try {
    const currentTimestamp = new Date();
    const videosToDelete = await Video.find({ deleteDate: { $lte: currentTimestamp } });

    for (const video of videosToDelete) {
      // Delete the video from the database or storage
      await Video.findByIdAndDelete(video._id);
    }

    console.log(`${videosToDelete.length} videos deleted.`);
  } catch (error) {
    console.error('Error deleting videos:', error);
  }
});
