import React, { useEffect, useRef, useState } from "react";
import { fullscreenToggle } from "./Fullscreen";
import "./VideoPlayer.css";
import { ImSpinner8 } from "react-icons/im";
import {
  IoVolumeHighSharp,
  IoVolumeLowSharp,
  IoVolumeMediumSharp,
} from "react-icons/io5";
import { MdComment, MdForward10, MdReplay10 } from "react-icons/md";
import {
  IoMdPause,
  IoMdPlay,
  IoMdSettings,
  IoMdSkipForward,
  IoMdVolumeHigh,
  IoMdVolumeOff,
} from "react-icons/io";
import {
  BsFullscreen,
  BsFullscreenExit,
  BsPip,
  BsPipFill,
  BsSpeedometer,
} from "react-icons/bs";
//import { MdCast, MdCastConnected } from "react-icons/md";

function VideoPlayer({ videoUrl, playerControls }) {
  const videoRef = useRef(null);
  const video = videoRef.current;
  const progressRef = useRef(null);
  const tapCountRef = useRef(0);
  const controlTimeoutRef = useRef(null);
  const [pip, setPip] = useState(false);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [volume, setVolume] = useState(1);
  const [fullscreeen, setFullscreen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [tapCount, setTapCount] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showControl, setShowControl] = useState(false);

  useEffect(() => {
    let totalWatchTime = 0;
    let lastWatchTime = 0;
    let watchCompleted = false;
    let watchSeconds = new Set();

    const video = videoRef.current;
    const handleTimeUpdate = () => {
     
      const currentTime = Math.floor(video.currentTime);
      const timeDifference = currentTime - lastWatchTime;

      if (timeDifference > 1) {
        totalWatchTime -= timeDifference;
        if (totalWatchTime < 0) totalWatchTime = 0;
        console.log("Skipped forward:", timeDifference);
      } else if (timeDifference < -1) {
        //totalWatchTime -= Math.abs(timeDifference);
        console.log("Skipped backward:", Math.abs(timeDifference));
      } else if (timeDifference > 0) {
        //totalWatchTime += timeDifference;
        watchSeconds.add(currentTime);
      }

      lastWatchTime = currentTime;
      validatePoint(watchSeconds.size);
    };

    const validatePoint = (watchedSeconds) => {

      if (!watchCompleted && watchedSeconds >= Math.floor(video.duration)-1) {
        watchCompleted = true;
        displayPoint()
        console.log("Point", Math.floor(video.duration));
        showFeedback("poitupdate");
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
    // eslint-disable-next-line
  }, [videoUrl]);

  useEffect(() => {
    let tapTimeout;
    const handleTap = (event) => {
      const { clientX, target } = event;
      const middleStart = window.innerWidth / 3;
      const middleEnd = (window.innerWidth / 3) * 2;

      //console.log(tapCountRef.current, target.tagName);

      if (target.tagName === "VIDEO") {
        tapCountRef.current += 1;
        //setTapCount((prev) => prev + 1);

        tapTimeout && clearTimeout(tapTimeout);
        tapTimeout = setTimeout(() => {
          if (tapCountRef.current === 1) {
            if (clientX >= middleStart && clientX <= middleEnd) {
              handlePlayPause();
            }
          } else if (tapCountRef.current === 2) {
            clearTimeout(tapTimeout);

            if (clientX > window.innerWidth / 2) {
              showFeedback("forward");
              videoRef.current.currentTime += 10;
            } else {
              showFeedback("backward");
              videoRef.current.currentTime -= 10;
            }
            videoRef.current.play();
            setTapCount(0);
          } else if (tapCountRef.current === 3) {
            clearTimeout(tapTimeout);
            if (clientX < middleStart) {
              showFeedback("comments");
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
    const handlePlay = () => {
      setPlaying(true);
      showFeedback("play");
    };
    const handlePause = () => {
      setPlaying(false);
      setShowControl(true)
      showFeedback("pause");
    };
    const handleWaiting = () => setLoading(true);
    const handlePlaying = () => setLoading(false);
    const handleCanPlay = () => {
      setLoading(false);
      setDuration(video.duration);
      //video.play();
    };

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
      if (controlTimeoutRef.current) {
        clearTimeout(controlTimeoutRef.current);
      }

      if (playing) {
        controlTimeoutRef.current = setTimeout(() => {
          setShowControl(false);
          setShowOptions(false);
        }, 5000);
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

  useEffect(() => {
    const handlePiPChange = () => {
      if (!document.pictureInPictureElement) {
        setPip(false);
      }
    };
    document.addEventListener("leavepictureinpicture", handlePiPChange);

    return () => {
      document.removeEventListener("leavepictureinpicture", handlePiPChange);
    };
  }, []);

  useEffect(() => {
    video && (video.playbackRate = playbackRate);
    // eslint-disable-next-line
  }, [videoUrl]);

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
    //setPlaying(!playing);
  };
  const handleMute = () => {
    if (muted) {
      video.volume = volume;
      showFeedback(Math.floor(volume * 10));
    } else {
      video.volume = 0;
      showFeedback("mute");
    }
    setMuted(!muted);
  };
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    video.volume = newVolume;
    console.log(video.volume, controlTimeoutRef.current);
    clearTimeout(controlTimeoutRef.current);
    setVolume(newVolume);
    setMuted(newVolume === "0");
    showFeedback(newVolume === "0" ? "mute" : Math.floor(newVolume * 10));
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
    //videoRef.current.pause();
    //setPlaying(true);
  };
  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
    video.playbackRate = rate;
  };
  const handlePip = async () => {
    if (document.pictureInPictureElement) {
      console.log(document.pictureInPictureElement);
      await document.exitPictureInPicture();
      setPip(false);
    } else {
      await video.requestPictureInPicture();
      setPip(true);
    }
  };

  const showFeedback = (type) => {
    setFeedback(type);
    const feedbackElement = document.querySelector(".feedback");
    feedbackElement?.classList.add("show");
    setTimeout(() => {
      feedbackElement?.classList.remove("show");
    }, 300);
  };
  const displayPoint=()=>{
    playerControls.onPointUpdate()
    const pointDisplay = document.querySelector('.point_display')
    pointDisplay?.classList.add('animate_point')
    setTimeout(()=>{pointDisplay?.classList.remove('animate_point')},4000)
  }

  return (
    <div className="video_player">
      <video
        ref={videoRef}
        src={`${videoUrl}`}
        /* src={`http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4`} */
        autoPlay
        className="video"
        controls={false}
        onTimeUpdate={handleProgress}
        onMouseOver={() => setShowControl(true)}
        onMouseMove={() => setShowControl(true)}
      ></video>
      {loading && (
        <div className="loading_spinner">
          <ImSpinner8 size={50} className="spinner" />
        </div>
      )}

      <div className={`controls ${showControl ? "show" : ""}`}>
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
            <button
              className={`options_btn ${showOptions ? "show" : ""}`}
              onClick={() => setShowOptions(!showOptions)}
            >
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
          <div className={`options_menu ${showOptions ? "show" : ""}`}>
            <div className="option_item">
              <div className="option_label">
                {" "}
                <BsSpeedometer size={24} /> Playback Speed
              </div>
              <div className="playback_rates">
                {[0.5, 1, 1.5, 2].map((rate) => (
                  <button
                    key={rate}
                    className={`rate_btn ${
                      playbackRate === rate ? "active" : ""
                    }`}
                    onClick={() => handlePlaybackRateChange(rate)}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>

            <div className="option_item">
              <button
                className={`item_btn ${0 < 1 ? "active" : ""}`}
                onClick={handlePip}
              >
                {!pip ? (
                  <>
                    <BsPip size={24} /> Picture-In-Picture
                  </>
                ) : (
                  <>
                    <BsPipFill size={24} /> Exit PIP Mode{" "}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`feedback `}>
        {feedback === "play" && <IoMdPlay />}
        {feedback === "pause" && <IoMdPause />}
        {feedback === "forward" && <MdForward10 />}
        {feedback === "backward" && <MdReplay10 />}
        {feedback === "comments" && <MdComment />}
        {feedback === "mute" && <IoMdVolumeOff />}
        {feedback <= 3 && (
          <>
            <IoVolumeLowSharp /> {feedback}
          </>
        )}
        {feedback > 3 && feedback < 7 && (
          <>
            <IoVolumeMediumSharp /> {feedback}
          </>
        )}
        {feedback > 7 && feedback <= 10 && (
          <>
            <IoVolumeHighSharp /> {feedback}
          </>
        )}
      </div>
      <div className="point_display">+5 EP</div>
    </div>
  );
}

export default VideoPlayer;
