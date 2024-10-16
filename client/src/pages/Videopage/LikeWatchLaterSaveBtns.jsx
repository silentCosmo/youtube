import React, { useEffect, useState } from "react";
import "./LikeWatchLaterSaveBtns.css";
import { BsThreeDots } from "react-icons/bs";
import { LiaDownloadSolid } from "react-icons/lia";
import {
  RiBookmarkLine,
  RiBookmarkFill,
  RiShareForwardLine,
} from "react-icons/ri";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { likeVideo as likeVideoAction } from "../../redux/action/video";
import { addWatchLater, deleteWatchLater } from "../../redux/action/watchlater";
import { addLikedVideo, deleteLikedVideo } from "../../redux/action/likedvideo";


function LikeWatchLaterSaveBtns({ vmd, vid }) {
  const [saveVideo, setSaveVideo] = useState(false);
  const [likeVideo, setLikeVideo] = useState(false);
  const [dislikeVideo, setDislikeVideo] = useState(false);
  const currentUser = useSelector(state=>state.currentUserReducer);
  const likedvideoList = useSelector((state)=>state.likedvideoReducer)
  const watchlaterList = useSelector((state)=>state.watchlaterReducer)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    if (Array.isArray(likedvideoList?.data)) {
    likedvideoList?.data?.filter((q)=>q.vid===vid && q.viewer===currentUser?.result?._id).map((m)=>setLikeVideo(true))
    }
    if (Array.isArray(watchlaterList?.data)) {
    watchlaterList?.data?.filter((q)=>q.vid===vid && q.viewer===currentUser?.result?._id).map((m)=>setSaveVideo(true))
    }
    // eslint-disable-next-line
  },[likedvideoList,watchlaterList])

  const toggleSaveVideo = () => {
    if (currentUser) {
      if (saveVideo) {
        setSaveVideo(false);
        dispatch(deleteWatchLater({vid:vid,viewer:currentUser?.result._id}))
      } else {
        setSaveVideo(true);
        dispatch(addWatchLater({vid:vid,viewer:currentUser?.result._id}))
      }
    } else {
      alert("Please login to Save the video");
    }
  };
  const toggleLike = (e,lk) => {
    if (currentUser) {
      if (likeVideo) {
        setLikeVideo(false);
        dispatch(likeVideoAction({id:vid,like:lk>0?lk-1:0}))
        dispatch(deleteLikedVideo({vid:vid,viewer:currentUser?.result._id}))
      } else {
        setLikeVideo(true);
        dispatch(likeVideoAction({id:vid,like:lk+1}))
        dispatch(addLikedVideo({vid:vid,viewer:currentUser?.result._id}))
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
          dispatch(likeVideoAction({id:vid,like:lk>1&&lk-1}))
          dispatch(deleteLikedVideo({vid:vid,viewer:currentUser?.result._id}))
        }
        setLikeVideo(false);
      }
    } else {
      alert("Please login to Dislike the video");
    }
  };

  const toggleShare = () => {
    const videoUrl = `${window.location.origin}/video/${vid}`; 

    if (navigator.share) {
      
      navigator.share({
        title: "Check out this video!",
        text: "I found this great video. You should check it out!",
        url: videoUrl,
      })
      .then(() => console.log("Shared successfully"))
      .catch((error) => console.error("Error sharing", error));
    } else {
      
      navigator.clipboard.writeText(videoUrl).then(() => {
        alert("Video link copied to clipboard!");
      });
    }
  };

  const downloadVideo = () => {
    const videoUrl = "https://youtube-0xsa.onrender.com/"+vmd.path; 
    console.log(videoUrl);
    
    if (videoUrl) {
      const link = document.createElement('a');
      link.href = videoUrl;
      link.setAttribute('download', 'video.mp4'); 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); 
    } else {
      alert('Video URL is not available.');
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
      <div className="btn_videoPage" onClick={()=>downloadVideo()}>
        <LiaDownloadSolid size={22} />
        <b className="tooltip_videoPage">Download</b>
      </div>
      <div className="btn_videoPage" onClick={()=>toggleShare()}>
        <RiShareForwardLine size={22} />
        <b className="tooltip_videoPage">Share</b>
      </div>
      <div className="like_container">
        <div className="like_btn" onClick={(e) => toggleLike(e,vmd.like)}>
          {likeVideo ? <BiSolidLike size={22} /> : <BiLike size={22} />}
          <b className="like_count">&nbsp;{vmd?.like}&nbsp;</b>
        </div>
        <div className="lvr"></div>
        <div className="dislike_btn" onClick={(e) => toggleDislike(e,vmd.like)}>
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
