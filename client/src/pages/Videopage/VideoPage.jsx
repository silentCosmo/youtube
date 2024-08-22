import React from "react";
import "./VideoPage.css";
import LikeWatchLaterSaveBtns from "./LikeWatchLaterSaveBtns";
import { Link, useParams } from "react-router-dom";
import { vids } from "../../components/video/v_db";
import moment from "moment";
import Comment from "../../components/Comment/Comment";

function VideoPage() {
  const { vid } = useParams();
  const vidNumber = parseInt(vid, 10);
  const vv = vids?.filter((q) => q._id === vidNumber)[0];

  return (
    <>
      <div className="container_videoPage">
        <div className="container2_videoPage">
          <div className="video_display_screen_videoPage">
            <video
              src={vv.src}
              className="video_ShowVideo_videoPage"
              controls
            ></video>
            <div className="video_details_videoPage">
              <div className="video_btns_title_VideoPage_cont">
                <p className="video_title_VideoPage">{vv?.title}</p>
{/*                 <div className="views_date_btns_VideoPage">
                  <div className="views_videoPage">
                    {vv?.views ? vv.views : 1} views <div className="dot"></div>{" "}
                    {moment(vv?.createdat).fromNow()}
                  </div>
                </div> */}
              </div>
              <div className="chanel_details_cont_videoPage">
                <Link to={"/"} className="chanel_details_videoPage">
                  <b className="chanel_logo_videoPage">
                    <p>{vv?.uploader.charAt(0).toUpperCase()}</p>
                  </b>
                  <p className="chanel_name_videoPage">{vv.uploader}</p>
                </Link>
                <LikeWatchLaterSaveBtns vv={vv} vid={vid} />
              </div>
              <div className="description_videoPage">
              <div className="views_date_btns_VideoPage">
                  <div className="views_videoPage">
                    {vv?.views ? vv.views : 1} views <div className="dot"></div>{" "}
                    {moment(vv?.createdat).fromNow()}
                  </div>
                </div>
                {vv.description}
              </div>
              <div className="comments_videoPage">
                <h2>
                  <u>Comments</u>
                </h2>
                <Comment videoId={vv._id}/>
              </div>
            </div>
          </div>
          <div className="moreVideoBar">More videos..</div>
        </div>
      </div>
    </>
  );
}

export default VideoPage;
