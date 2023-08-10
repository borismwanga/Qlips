
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
export default function VideoPage({ match }){
  // eslint-disable-next-line react/prop-types
  const videoId = match.params.id;
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get(`/api/videos/${videoId}`);
        setVideo(response.data.video);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    fetchVideoDetails();
  }, [videoId]);

  const handleIncrementView = async () => {
    try {
      await axios.patch(`/api/videos/${videoId}/increment-view`);
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  };

  return (
    <div>
      {video ? (
        <div>
          <h2>{video.title}</h2>
          <video controls>
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p>Views: {video.viewCount}</p>
          <button onClick={handleIncrementView}>Increment View</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

