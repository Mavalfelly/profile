import React from 'react'; 
import "./backVid.css";


const BackgroundVideo: React.FC = () => {
  return (
    <>
      <div className="video-container">
        <div className="video-overlay" />
        <video
          muted
          autoPlay
          preload="true"
          loop
          className="bg-video"
          playsInline
          src="/back/back.mp4"
        />
      </div>
    </>
  );
};

export default BackgroundVideo;