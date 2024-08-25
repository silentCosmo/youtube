import React, { useState } from "react";
import "./LikeWatchLaterSaveBtns.css";
import { BsThreeDots } from "react-icons/bs";
import { LiaDownloadSolid } from "react-icons/lia";
import {
  RiBookmarkLine,
  RiBookmarkFill,
  RiShareForwardLine,
  RiHeartFill,
} from "react-icons/ri";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { useSelector } from "react-redux";

function LikeWatchLaterSaveBtns({ vv, vid }) {
  const [saveVideo, setSaveVideo] = useState(false);
  const [likeVideo, setLikeVideo] = useState(false);
  const [dislikeVideo, setDislikeVideo] = useState(false);
  const currentUser = useSelector(state=>state.currentUserReducer);

  const toggleSaveVideo = () => {
    if (currentUser) {
      if (saveVideo) {
        setSaveVideo(false);
      } else {
        setSaveVideo(true);
      }
    } else {
      alert("Please login to Save the video");
    }
  };
  const toggleLike = () => {
    if (currentUser) {
      if (likeVideo) {
        setLikeVideo(false);
      } else {
        setLikeVideo(true);
        setDislikeVideo(false);
      }
    } else {
      alert("Please login to Like the video");
    }
  };
  const toggleDislike = () => {
    if (currentUser) {
      if (dislikeVideo) {
        setDislikeVideo(false);
      } else {
        setDislikeVideo(true);
        setLikeVideo(false);
      }
    } else {
      alert("Please login to Dislike the video");
    }
  };

  return (
    <div className="btns_cont_videoPage">
      <div className="btn_videoPage">
        <BsThreeDots size={22} />
      </div>
      <div className="btn_videoPage" onClick={(e) => toggleSaveVideo()}>
        {saveVideo ? (
          <>
            <RiBookmarkFill size={22} />
            <b className="tooltip_videoPage">Saved</b>
          </>
        ) : (
          <>
            <RiBookmarkLine size={22} />
            <b className="tooltip_videoPage">Save</b>
          </>
        )}
      </div>
      <div className="btn_videoPage">
        <LiaDownloadSolid size={22} />
        <b className="tooltip_videoPage">Download</b>
      </div>
      <div className="btn_videoPage">
        <RiShareForwardLine size={22} />
        <b className="tooltip_videoPage">Share</b>
      </div>
      <div className="like_container">
        <div className="like_btn" onClick={(e) => toggleLike()}>
          {likeVideo ? <BiSolidLike size={22} /> : <BiLike size={22} />}
          <b className="like_count">&nbsp;{vv?.like}&nbsp;</b>
        </div>
        <div className="lvr"></div>
        <div className="dislike_btn" onClick={(e) => toggleDislike()}>
          {dislikeVideo ? (
            <BiSolidDislike size={22} />
          ) : (
            <BiDislike size={22} />
          )}
        </div>
      </div>
    </div>
  );
}

export default LikeWatchLaterSaveBtns;
