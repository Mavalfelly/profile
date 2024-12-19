import "../bckVid/backVid.css";

const BackgroundVideo = () => {
  return (
    <div>
      <div className="video-overlay" />
      <video
        muted
        autoPlay
        preload="true"
        loop
        id="bg-video"
        className="bg-video"
        src='/back.vid.mp4'
      />
    </div>
  );
}

export default BackgroundVideo