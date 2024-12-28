import { useState, useEffect } from 'react';
import "./backVid.css";

const BackgroundVideo: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    
    window.addEventListener('resize', checkMobile);
    
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
          src={isMobile ? "/back/mobile.mp4" : "/back/mobile.mp4"}
        />
      </div>
    </>
  );
};

export default BackgroundVideo;