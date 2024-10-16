import React, { useRef } from "react";
import "./ShowVideo.css";
import moment from "moment";
import { Link } from "react-router-dom";

function ShowVideo({ vid }) {
  const videoRef = useRef(null); 

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play(); 
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause(); 
      videoRef.current.currentTime = 0; 
    }
  };
  return (
    <>
      <Link to={`/watch/${vid._id}`}>
        <video src={`https://youtube-0xsa.onrender.com/`+vid.path} className="video_ShowVideo" 
          ref={videoRef} muted
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave} ></video>
      </Link>
      <div className="video_description">
        <div className="Chanel_logo_App">
          <div className="fstChar_logo_App">
            <>{vid?.uploader?.charAt(0).toUpperCase()}</>
          </div>
        </div>
        <div className="video_details">
          <p className="title_vid_ShowVideo">{vid?.title}</p>
          <p className="vid_views_UploadTime">{vid?.uploader}</p>
          <div className="vid_views_UploadTime">
            {vid?.views ? vid.views : 0} views <div className="dot"></div>
            {moment(vid?.createdAt).fromNow()}
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowVideo;
