import React, { useEffect, useRef, useState } from "react";
import { fullscreenToggle } from "./Fullscreen";
import { ImSpinner8 } from "react-icons/im";
import "./VideoPlayer.css";
import {
  IoMdPause,
  IoMdPlay,
  IoMdSettings,
  IoMdSkipForward,
  IoMdVolumeHigh,
  IoMdVolumeOff,
} from "react-icons/io";
import { BsFullscreen, BsFullscreenExit, BsPip, BsPipFill, BsSpeedometer } from "react-icons/bs";
import { MdCast, MdCastConnected } from "react-icons/md";

function VideoPlayer({ videoUrl, playerControls }) {
  const videoRef = useRef(null);
  const video = videoRef.current;
  const progressRef = useRef(null);
  const tapCountRef = useRef(0);
  const controlTimeoutRef = useRef(null);
  const [pip,setPip] = useState(false)
  const [cast,setCast] = useState(false)
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [fullscreeen, setFullscreen] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [tapCount, setTapCount] = useState(0);
  const [playbackRate,setPlaybackRate] = useState(1)
  const [loading, setLoading] = useState(true);
  const [showControl, setShowControl] = useState(false); //changed for style

  useEffect(() => {
    let tapTimeout;
    const handleTap = (event) => {
      const { clientX, target } = event;
      const middleStart = window.innerWidth / 3;
      const middleEnd = (window.innerWidth / 3) *2; 

      //console.log(tapCountRef.current, target.tagName);

      if (target.tagName === "VIDEO") {
        tapCountRef.current += 1;
        //setTapCount((prev) => prev + 1);

        tapTimeout && clearTimeout(tapTimeout);
        tapTimeout = setTimeout(() => {
          if (tapCountRef.current === 1) {
            if(clientX>=middleStart&&clientX<=middleEnd){
            if (playing) {
              videoRef.current.pause();
            } else {
              videoRef.current.play();
            }
          }
            //setPlaying(!playing);
            //setTapCount(0);
          } else if (tapCountRef.current === 2) {
            clearTimeout(tapTimeout);

            if (clientX > window.innerWidth / 2) {
              videoRef.current.currentTime += 10;
            } else {
              videoRef.current.currentTime -= 10;
            }
            videoRef.current.play();
            setTapCount(0);
          } else if (tapCountRef.current === 3) {
            clearTimeout(tapTimeout);
            if (clientX < middleStart) {
              playerControls.onShowComments();
            } else if (clientX > middleEnd) {
              playerControls.onCloseWebsite();
            } else {
              playerControls.onNextVideo();
            }
          }
          tapCountRef.current = 0;
        }, 300);
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
    const video = videoRef.current;
    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    const handleWaiting = () => setLoading(true);
    const handlePlaying = () => setLoading(false);
    const handleCanPlay = () => {setLoading(false);setDuration(video.duration)}

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("canplay", handleCanPlay);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
    };
  }, [videoRef]);

  useEffect(() => {
    if (showControl) {
      console.log(controlTimeoutRef);

      controlTimeoutRef.current && clearTimeout(controlTimeoutRef)

     if(playing){ controlTimeoutRef.current = setTimeout(() => {
        setShowControl(false);
      }, 5000);} //changed for style test
      return()=>{
        controlTimeoutRef.current && clearTimeout(controlTimeoutRef)
      }
    }
  }, [showControl, playing]);

  useEffect(() => {
    const video = videoRef.current;
    const updateTime = () => {
      setCurrentTime(video.currentTime);
    };
    video.addEventListener("timeupdate", updateTime);
    return () => {
      video.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handlePlayPause = () => {
    if (playing) {
      video.pause();
    } else {
      video.play();
    }
    setPlaying(!playing);
  };
  const handleMute = () => {
    if (muted) {
      video.volume = volume;
    } else {
      video.volume = 0;
    }
    setMuted(!muted);
  };
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    video.volume = newVolume;
    console.log(video.volume, controlTimeoutRef);
    clearTimeout(controlTimeoutRef.current);
    setVolume(newVolume);
    setMuted(newVolume === "0");
  };
  const handleFullscreen = () => {
    if (!fullscreeen) {
      fullscreenToggle.open(videoRef.current.parentElement);
    } else {
      fullscreenToggle.close();
    }
    setFullscreen(!fullscreeen);
  };

  const handleProgress = () => {
    if (progressRef.current) {
      const progress =
        (videoRef.current?.currentTime / videoRef.current?.duration) * 100;
      progressRef.current.value = progress;
      requestAnimationFrame(handleProgress);
    }
  };
  const handleProgressChange = (e) => {
    const duration = videoRef.current.duration;
    const newTime = (e.target.value / 100) * duration;
    videoRef.current.currentTime = newTime;
    videoRef.current.play();
    setPlaying(true);
  };
  const handlePlaybackRateChange = (rate)=>{
    setPlaybackRate(rate)
    video.playbackRate = rate
  }
  const handlePip = async()=>{
    if(document.pictureInPictureElement){
      await document.exitPictureInPicture()
      setPip(false)
    }else{
      await video.requestPictureInPicture()
      setPip(true)
    }
  }
  const handleCast = ()=>{
    setCast(!cast)
  }

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
      {loading && (
        <div className="loading_spinner">
          <ImSpinner8 size={50} className="spinner" />
        </div>
      )}
      
        <div className={`controls ${showControl?"show":""}`}>
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
              <button className="play_btn" onClick={() => handlePlayPause()}>
                {!playing ? <IoMdPlay size={24} /> : <IoMdPause size={24} />}
              </button>
              <button
                className="next_btn"
                onClick={() => playerControls.onNextVideo()}
              >
                <IoMdSkipForward size={24} />
              </button>
              <div
                className={`${
                  muted ? "mute_btn volume_controls" : "volume_controls"
                }`}
              >
                <button onClick={() => handleMute()}>
                  {muted ? (
                    <IoMdVolumeOff size={24} />
                  ) : (
                    <IoMdVolumeHigh size={24} />
                  )}
                </button>
                <input
                  className="volume_bar"
                  type="range"
                  step="0.01"
                  min="0"
                  max="1"
                  value={muted ? 0 : volume}
                  onInput={handleVolumeChange}
                />
              </div>
              <label className="elapsed_time">
                {formatTime(currentTime)} / {formatTime(duration)}
              </label>
            </div>
            <div className="right_controls">
              <button className={`options_btn ${showOptions?"show":""}`} onClick={()=>setShowOptions(!showOptions)}>
                <IoMdSettings size={24} />
              </button>
              <button
                className="fullscreen_btn"
                onClick={() => handleFullscreen()}
              >
                {!fullscreeen ? (
                  <BsFullscreen size={20} />
                ) : (
                  <BsFullscreenExit size={20} />
                )}
              </button>
            </div>
            <div className={`options_menu ${showOptions?"show":""}`}>
                
            <div className="option_item">
              <div className="option_label"> <BsSpeedometer size={24} /> Playback Speed</div>
              <div className="playback_rates">
                {[0.5, 1, 1.5, 2].map((rate) => (
                  <button
                    key={rate}
                    className={`rate_btn ${playbackRate === rate ? 'active' : ''}`}
                    onClick={() => handlePlaybackRateChange(rate)}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>

            <div className="option_item">
              
              <button
                className={`item_btn ${0<1 ? 'active' : ''}`}
                onClick={handlePip}
              >
             {!pip? <><BsPip size={24}/> Picture-In-Picture</> : <><BsPipFill size={24}/> Exit PIP Mode </>}
              </button>
            </div>
            <div className="option_item">
              <button
                className="item_btn"
                onClick={handleCast}
              >
               {!cast?<><MdCast size={24}/> Remote Playback</>:<><MdCastConnected size={24}/> Disconnect Cast</>}
              </button>
            </div>

            </div>
          </div>
        </div>
      
    </div>
  );
}

export default VideoPlayer;
