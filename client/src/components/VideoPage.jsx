// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'vidstack/styles/defaults.css';
import 'vidstack/styles/community-skin/video.css';
// import {formatUploadDate} from './dateUtiles'



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

  // const handleIncrementView = async () => {
  //   try {
  //     await axios.patch(`http://127.0.0.1:3000/api/videos/${id}/increment-view`);
  //   } catch (error) {
  //     console.error('Error incrementing view count:', error);
  //   }
  // };

 
  // copy link to clipboard
  // const copyToClipboard = () => {
  //   const currentURL = window.location.href;
  //   navigator.clipboard.writeText(currentURL).then(() => {
  //     alert('Link copied to clipboard!');
  //   }).catch(error => {
  //     console.error('Error copying link to clipboard:', error);
  //   });
  // };

  return (
    <div className='video-page'>
      {video ? 
          <div className='player-wrapper' >
            <video  className='video' preload="metadata" controls>
              <source 
                src={video.url}
                type="video/mp4" />
              Your browser does not support the video tag.
            </video> 
            {/* <div className='video-info'>
              <div className="video-title">
                {video.title}
              </div>
              <div className="video-views">
                {video.views} views
              </div>
            </div>   */}
          </div>
       : <div> 
          Loading... 
        </div>
       }
    </div>
  );
}
