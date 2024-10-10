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
import { useDispatch, useSelector } from "react-redux";
import { likeVideo as likeVideoAction } from "../../redux/action/video";


function LikeWatchLaterSaveBtns({ vmd, vid }) {
  const [saveVideo, setSaveVideo] = useState(false);
  const [likeVideo, setLikeVideo] = useState(false);
  const [dislikeVideo, setDislikeVideo] = useState(false);
  const currentUser = useSelector(state=>state.currentUserReducer);
  const dispatch = useDispatch()

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
  const toggleLike = (e,lk) => {
    if (currentUser) {
      if (likeVideo) {
        setLikeVideo(false);
        dispatch(likeVideoAction({id:vid,like:lk-1}))
      } else {
        setLikeVideo(true);
        dispatch(likeVideoAction({id:vid,like:lk+1}))
        setDislikeVideo(false);
      }
    } else {
      alert("Please login to Like the video");
    }
  };
  const toggleDislike = (e,lk) => {
    if (currentUser) {
      if (dislikeVideo) {
        setDislikeVideo(false);
      } else {
        setDislikeVideo(true);
        if(likeVideo){
          dispatch(likeVideoAction({id:vid,like:lk-1}))
        }
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
      <div className="btn_videoPage" onClick={(e) => toggleSaveVideo(e)}>
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
        <div className="like_btn" onClick={(e) => toggleLike(e,vmd.like)}>
          {likeVideo ? <BiSolidLike size={22} /> : <BiLike size={22} />}
          <b className="like_count">&nbsp;{vmd?.like}&nbsp;</b>
        </div>
        <div className="lvr"></div>
        <div className="dislike_btn" onClick={(e) => toggleDislike(vmd.like)}>
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
