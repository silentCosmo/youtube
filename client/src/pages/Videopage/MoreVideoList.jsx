import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./MoreVideoList.css";
import moment from "moment";
import { BsThreeDotsVertical } from "react-icons/bs";

function MoreVideoList({ video }) {
  const videoRef = useRef(null); 
  useEffect(()=>{videoRef.current.currentTime = 10},[videoRef])
  return (
    <Link to={`/watch/${video._id}`} className="moreVideo_item">
      <div className="moreVideo_thumbnail">
        <video src={`${video.path}`} alt={video.title} ref={videoRef} />
      </div>
      <div className="moreVideo_details">
        <p className="moreVideo_title">{video.title.length > 35 ? video.title.substring(0, 35) + "..." : video.title}</p>
        <div className="moreVideo_upload_views">
          <p className="moreVideo_uploader">{video.uploader}</p>
          <p className="moreVideo_views">
            {video.views} views <span className="dot_1">•</span>{" "}
            {moment(video.createdAt).fromNow()}
          </p>
        </div>
        <p className="moreVideo_options">
          <BsThreeDotsVertical />
        </p>
      </div>
    </Link>
  );
}

export default MoreVideoList;
