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
    }, 3000);

    return () => clearTimeout(hoverTimeout); // Clear the timeout on unmount

  }, [id]);

  // const handleIncrementView = async () => {
  //   try {
  //     await axios.patch(`http://127.0.0.1:3000/api/videos/${id}/increment-view`);
  //   } catch (error) {
  //     console.error('Error incrementing view count:', error);
  //   }
  // };

  const formatUploadDate = uploadDate => {
    const now = new Date();
    const uploadDateTime = new Date(uploadDate);
    const timeDiff = now - uploadDateTime;
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const year = 365 * day;
  
    if (timeDiff < minute) {
      return `${Math.floor(timeDiff / 1000)} s ago`;
    } else if (timeDiff < hour) {
      return `${Math.floor(timeDiff / minute)} m ago`;
    } else if (timeDiff < day) {
      return `${Math.floor(timeDiff / hour)} h ago`;
    } else if (timeDiff < year) {
      return `${Math.floor(timeDiff / day)} d ago`;
    } else {
      return `${Math.floor(timeDiff / year)} y ago`;
    }
  };

  const copyToClipboard = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      alert('Link copied to clipboard!');
    }).catch(error => {
      console.error('Error copying link to clipboard:', error);
    });
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
              <div className='ptbly-left'>
                <span className="title">
                  {video.title}
                  </span>
                <span className="info">
                  {/* <p>
                    <span className="material-symbols-outlined">
                      visibility
                    </span>
                    {video.viewCount}
                  </p> */}
                  
                  <p>
                    <span className="material-symbols-outlined">
                      schedule
                    </span>
                      {formatUploadDate(video.uploadDate)}
                  </p>
                </span>
              </div>
              <div className='ptby-right'>
                <button onClick={copyToClipboard}> 
                  <span className="material-symbols-outlined">
                    link
                  </span> 
                  COPY LINK
                </button>
              </div>
              
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
