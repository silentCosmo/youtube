import React, { useEffect, useRef, useState } from "react";
import "./VideoPlayer.css";

function VideoPlayer({
  videoUrl,
  playerControls
}) {
  
  const videoRef = useRef(null);
  const controlTimeoutRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [tapCount, setTapCount] = useState(0);
  const [showControl, setShowControl] = useState(false);

  useEffect(() => {
    const handleTap = (event) => {
      const { clientX } = event;
      console.log(tapCount);

      setTapCount((prev) => prev + 1);
      setTimeout(() => {
        if (tapCount === 1) {
          setShowControl(true);
          if (playing) {
            videoRef.current.pause();
          } else {
            videoRef.current.play();
          }
          setPlaying(!playing);
        } else if (tapCount === 2) {
          if (clientX > window.innerWidth / 2) {
            videoRef.current.currentTime += 10;
          } else {
            videoRef.current.currentTime -= 10;
          }
          videoRef.current.play();
        } else if (tapCount === 3) {
          if (clientX < window.innerWidth / 3) {
            playerControls.onShowComments();
          } else if (clientX > (window.innerWidth / 3) * 2) {
            playerControls.onCloseWebsite();
          } else {
            playerControls.onNextVideo();
          }
        }
        setTapCount(1);
      }, 500);
    };

    const videoContainer = videoRef.current.parentElement;

    if (videoContainer) {
      videoContainer.addEventListener("click", handleTap);
    }

    return () => {
      if (videoContainer) {
        videoContainer.removeEventListener("click", handleTap);
      }
    };
    // eslint-disable-next-line
  }, [tapCount, playing, playerControls]);

  useEffect(() => {
    if(showControl){
      if(controlTimeoutRef.current){
        clearTimeout(controlTimeoutRef.current)
      }
      setTimeout(() => {
        controlTimeoutRef.current = setShowControl(false);
      }, 5000);}
  }, [showControl]);

  return (
    <div className="video_player">
      <video
        ref={videoRef}
        src={`${videoUrl}`}
        className="video"
        controls={false}
        autoPlay
        onMouseOver={() => setShowControl(true)}
        onMouseMove={() => setShowControl(true)}
      ></video>
      {showControl ? <div className="controls">Coming soon</div> : ""}
    </div>
  );
}

export default VideoPlayer;
