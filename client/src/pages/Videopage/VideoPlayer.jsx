import React, { useEffect, useRef, useState } from "react";
import { fullscreenToggle } from "./Fullscreen";
import "./VideoPlayer.css";
import {
  IoMdPause,
  IoMdPlay,
  IoMdSettings,
  IoMdSkipForward,
  IoMdVolumeHigh,
  IoMdVolumeOff,
} from "react-icons/io";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";

function VideoPlayer({ videoUrl, playerControls }) {
  const videoRef = useRef(null);
  const video = videoRef.current;
  const progressRef = useRef(null);
  const controlTimeoutRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume,setVolume] = useState(1)
  const [fullscreeen, setFullscreen] = useState(false);
  const [moreControl,setMoreControl] = useState(true)
  const [currentTime,setCurrentTime] = useState(0);
  const [duration,setDuration] =useState(0)
  const [tapCount, setTapCount] = useState(0);
  const [showControl, setShowControl] = useState(false); //changed for style

  useEffect(() => {
    const handleTap = (event) => {
      const { clientX, target } = event;
      console.log(tapCount, target.tagName);

      if (target.tagName ==="VIDEO") {
        setTapCount((prev) => prev + 1);
        setTimeout(() => {
          if (tapCount === 1) {
            setShowControl(true);
            if (playing) {
              videoRef.current.pause();
              setPlaying(false)
            } else {
              videoRef.current.play();
              setPlaying(true)
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
      }
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
    if (showControl) {
      console.log(controlTimeoutRef);
      
      if (controlTimeoutRef.current) {
        clearTimeout(controlTimeoutRef.current);
      }
      setTimeout(() => {
        controlTimeoutRef.current = setShowControl(false);
      }, 5000);
    } //changed for style
  }, [showControl]);

  useEffect(()=>{
    const video = videoRef.current;
    const updateTime =()=>{
      setCurrentTime(video.currentTime)
      setDuration(video.duration)
    }
    video.addEventListener('timeupdate',updateTime)
    return ()=> {video.removeEventListener('timeupdate',updateTime)}
  },[])
  
  const formatTime = (seconds)=>{
    const minutes = Math.floor(seconds/60)
    const secs = Math.floor(seconds%60)
    return `${minutes}:${secs<10?"0":""}${secs}`
  }

  const handlePlayPause = ()=>{
    if(playing){
      video.pause()
    }else{
      video.play()
    }
    setPlaying(!playing)
  }
  const handleMute = ()=>{
    if(muted){
      video.volume = volume;
    }else{
      video.volume = 0;
    }
    setMuted(!muted)
  }
  const handleVolumeChange = (e)=>{
    const newVolume = e.target.value;
    video.volume = newVolume;
    console.log(video.volume,controlTimeoutRef);
    clearTimeout(controlTimeoutRef.current);
    setVolume(newVolume)
    setMuted(newVolume=== '0')
  }
  const handleFullscreen = ()=>{
    if(!fullscreeen){
      fullscreenToggle.open(videoRef.current.parentElement)
    }else{
      fullscreenToggle.close()
    }
    setFullscreen(!fullscreeen)
  }
  

  const handleProgress = () => {
    if(progressRef.current){
    const progress =
      (videoRef.current?.currentTime / videoRef.current?.duration) * 100;
      progressRef.current.value = progress;
      requestAnimationFrame(handleProgress);
    }
  };
  const handleProgressChange = (e) => {
    //const progressBar = progressRef.current;
    const duration = videoRef.current.duration;
    const newTime = (e.target.value / 100) * duration;
    //const newTime = (e.nativeEvent.offsetX / progressBar.offsetWidth) * duration;
    videoRef.current.currentTime = newTime;
    videoRef.current.play();
    setPlaying(true)
  };

  return (
    <div className="video_player">
      <video
        ref={videoRef}
        src={`${videoUrl}`}
        /* src={`http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4`} */
        className="video"
        controls={false}
        autoPlay
        onTimeUpdate={handleProgress}
        onMouseOver={() => setShowControl(true)}
        onMouseMove={() => setShowControl(true)}
      ></video>
      {showControl ? (
        <div className="controls">
          <div className="seek_controls">
            <input
              className="video_seeker"
              type="range"
              ref={progressRef}
              defaultValue="0"
              step="0.01"
              onInput={handleProgressChange}
            />
          </div>
          <div className="button_controls">
            <div className="left_controls">
              <button className="play_btn" onClick={()=>handlePlayPause()}>
                {!playing ? <IoMdPlay size={24} /> : <IoMdPause size={24} />}
              </button>
              <button className="next_btn" onClick={()=>playerControls.onNextVideo()}>
                <IoMdSkipForward size={24} />
              </button>
              <div className={`${muted?"mute_btn volume_controls":"volume_controls"}`}>
                <button /* className={`${muted?"mute_btn volume_controls":"volume_controls"}`} */ onClick={()=>handleMute()}>
                  {muted ? (
                    <IoMdVolumeOff size={24} />
                  ) : (
                    <IoMdVolumeHigh size={24} />
                  )}
                </button>
                <input className="volume_bar" type="range" step="0.01" min="0" max="1" value={muted?0:volume} onInput={handleVolumeChange} />
              </div>
              <label className="elapsed_time">{formatTime(currentTime)} / {formatTime(duration)}</label>
            </div>
            <div className="right_controls">
              <button className="options_btn">
                <IoMdSettings size={24} />
              </button>
              <button className="fullscreen_btn" onClick={()=>handleFullscreen()}>
                {!fullscreeen ? (
                  <BsFullscreen size={20} />
                ) : (
                  <BsFullscreenExit size={20} />
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default VideoPlayer;
