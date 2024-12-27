import { useState, useEffect } from 'react';
import "./backVid.css";

const BackgroundVideo: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on mobile initially
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check immediately
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
          src={isMobile ? "/back/mobile.mp4" : "/back/back.mp4"}
        />
      </div>
    </>
  );
};

export default BackgroundVideo;