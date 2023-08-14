// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function VideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/api/videos/${id}`);
        setVideo(response.data.video);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    fetchVideoDetails();
  }, [id]);

  const handleIncrementView = async () => {
    try {
      await axios.patch(`http://127.0.0.1:3000/api/videos/${id}/increment-view`);
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

