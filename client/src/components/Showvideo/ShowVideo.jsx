import React from "react";
import "./ShowVideo.css";
import moment from "moment";
import { Link } from "react-router-dom";

function ShowVideo({ vid }) {
  return (
    <>
      <Link to={`/watch/${vid._id}`}>
        <video src={vid.src} className="video_ShowVideo"></video>
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
          <p className="vid_views_UploadTime">
            {vid?.views ? vid.views : 0} views <div className="dot"></div>
            {moment(vid?.createdat).fromNow()}
          </p>
        </div>
      </div>
    </>
  );
}

export default ShowVideo;
