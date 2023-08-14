// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function VideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [isVideoHovered, setIsVideoHovered] = useState(false);

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

    const hoverTimeout = setTimeout(() => {
      setIsVideoHovered(true);
    }, 5000);

    return () => clearTimeout(hoverTimeout); // Clear the timeout on unmount

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
        <div className={`container ${isVideoHovered ? 'hover' : ''}`}>
          <div
            className={`video-wrapper ${isVideoHovered ? '' : 'video-hover'}`}
            onMouseEnter={() => setIsVideoHovered(true)}
            onMouseLeave={() => setIsVideoHovered(false)}
          >
            <video className={`video ${isVideoHovered ? '' : 'video-hover'}`} controls>
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className={`ptby ${isVideoHovered ? 'hover' : ''}`}>
              <span className="title">{video.title}</span>
              <span className="info">
                <p>
                  <i className="fa-regular fa-eye"></i> {video.viewCount}
                </p>
                <p>
                  <i className="fa-regular fa-clock"></i> 3 hours ago
                </p>
              </span>
            </div>
            {/* <button onClick={handleIncrementView}>Increment View</button> */}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
