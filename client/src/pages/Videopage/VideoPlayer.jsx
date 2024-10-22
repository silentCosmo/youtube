import React from "react";

function VideoPlayer({ videoPath }) {
  return (
    <div>
      <video
        src={`${videoPath}`}
        className="video_ShowVideo_videoPage"
        controls
        controlsList="nodownload play"
      ></video>
    </div>
  );
}

export default VideoPlayer;
