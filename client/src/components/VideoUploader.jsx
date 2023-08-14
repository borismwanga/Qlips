// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function VideoUploader() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const history = useHistory();

  const handleFileChange = event => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type.includes('video')) {
        setFile(selectedFile);
        setTitle(getTitleFromFileName(selectedFile.name));
      } else {
        setFile(null);
        setTitle('');
        alert('Please select a valid video format (e.g., .mp4)');
      }
    }
  };

  const getTitleFromFileName = fileName => {
    const titleWithoutExtension = fileName.split('.').slice(0, -1).join('.');
    return titleWithoutExtension;
  };

  const handleDragOver = event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  };
  
  const handleDrop = event => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      if (droppedFile.type.includes('video')) {
        setFile(droppedFile);
        setTitle(getTitleFromFileName(droppedFile.name));
      } else {
        setFile(null);
        setTitle('');
        alert('Please drop a valid video format (e.g., .mp4)');
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a video file to upload.');
      return;
    }
  
    setIsUploading(true);
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
  
    try {
      const response = await axios.post('http://127.0.0.1:3000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      console.log('Upload response:', response);
  
      if (response.status === 201) {
        console.log('Redirecting to video page...');
        history.push(`/videoPage/${response.data.video._id}`);
      }
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  
    setIsUploading(false);
  };
  

  return (
    <div>
      <h2>Upload a Video</h2>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: '2px dashed #cccccc',
          borderRadius: '4px',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        {file ? (
          <p>Video: {file.name}</p>
        ) : (
          <p>Drag your video here or click to select a file</p>
        )}
      </div>
      {/* Use a label to wrap the input */}
      <label htmlFor="fileInput">Click here to select a file
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          accept="video/*"
          onChange={handleFileChange}
        />
      </label>
      <input
        type="text"
        placeholder="Video Title"
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
      <button
        disabled={isUploading}
        onClick={handleUpload}
      >
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}
