import React, { useEffect } from "react";
import "./VideoPage.css";
import LikeWatchLaterSaveBtns from "./LikeWatchLaterSaveBtns";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import Comment from "../../components/Comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import { viewVideo } from "../../redux/action/video";
import { addHistory } from "../../redux/action/history";
import MoreVideoList from "./MoreVideoList";

function VideoPage() {
  const { vid } = useParams();
  const dispatch = useDispatch();
  
  const vids = useSelector((state)=>state.videoReducer)
  const currentUser = useSelector((state)=>state.currentUserReducer)
  const commentList = useSelector(state=>state.commentReducer)
  const morevids = useSelector(state=>state.videoReducer);
  
  const randomMoreVids = morevids?.data?.filter(vi=> vi._id !== vid).sort(()=>Math.random()-0.5)
  
  const vmd = vids?.data?.filter((q) => q._id === vid)[0]; 
  const totalComments = commentList?.data?.filter((q) => vid === q?.vid).length

  const handleViews = ()=> {
    dispatch(viewVideo({id:vid}))
  }
  const handleHistory = ()=>{
    dispatch(addHistory({
      vid:vid,
      viewer:currentUser?.result?._id,
    }))
  }
  useEffect(()=>{
    if(currentUser){
      handleHistory()
    }
    handleViews()
    //eslint-disable-next-line
  },[vid])
  
  return (
    <>
      <div className="container_videoPage">
        <div className="container2_videoPage">
          <div className="video_display_screen_videoPage">
            <video
              src={`https://youtube-0xsa.onrender.com/${vmd?.path}`}
              className="video_ShowVideo_videoPage"
              controls
              controlsList="nodownload play"
            ></video>
            <div className="video_details_videoPage">
              <div className="video_btns_title_VideoPage_cont">
                <p className="video_title_VideoPage">{vmd?.title}</p>
{/*                 <div className="views_date_btns_VideoPage">
                  <div className="views_videoPage">
                    {vmd?.views ? vmd.views : 1} views <div className="dot"></div>{" "}
                    {moment(vmd?.createdat).fromNow()}
                  </div>
                </div> */}
              </div>
              <div className="chanel_details_cont_videoPage">
                <Link to={"/"} className="chanel_details_videoPage">
                  <b className="chanel_logo_videoPage">
                    <p>{vmd?.uploader.charAt(0).toUpperCase()}</p>
                  </b>
                  <p className="chanel_name_videoPage">{vmd?.uploader}</p>
                </Link>
                <LikeWatchLaterSaveBtns vmd={vmd} vid={vid} />
              </div>
              <div className="description_videoPage">
              <div className="views_date_btns_VideoPage">
                  <div className="views_videoPage">
                    {vmd?.views>0 ? vmd?.views : 1} views <div className="dot"></div>{" "}
                    {moment(vmd?.createdAt).fromNow()}
                  </div>
                </div>
                {vmd?.description}
              </div>
              <div className="comments_VideoPage">
                <h2>
                  <u>{totalComments} Comments</u>
                </h2>
                <Comment videoId={vmd?._id}/>
              </div>
            </div>
          </div>
          <div className="moreVideoBar">
            {
              randomMoreVids?.map((m)=>{ return <MoreVideoList video={m} key={m?._id} />})
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoPage;
