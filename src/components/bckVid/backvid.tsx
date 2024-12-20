import "../bckVid/backVid.css";

const BackgroundVideo = () => {
  return (
    <div className="video-container">
      <div className="video-overlay" />
      <video
        muted
        autoPlay
        preload="true"
        loop
        className="bg-video"
        src="/back.vid.mp4"
      />
    </div>
  );
};

export default BackgroundVideo;
