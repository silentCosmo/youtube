import React, { useEffect, useRef, useState } from "react";
import "./VideoPage.css";
import LikeWatchLaterSaveBtns from "./LikeWatchLaterSaveBtns";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Comment from "../../components/Comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import { viewVideo } from "../../redux/action/video";
import { addHistory } from "../../redux/action/history";
import MoreVideoList from "./MoreVideoList";
import ShowVideo from "../../components/Showvideo/ShowVideo";
import VideoPlayer from "./VideoPlayer";
import { updatePoints } from "../../redux/action/profile";

function VideoPage() {
  const { vid } = useParams();
  const commetRef = useRef();
  const defaultScrollRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [commentToggle, setCommentToggle] = useState(false);
  const [randomMoreVids,setRandomMoreVids] =useState([])
  const vids = useSelector((state) => state.videoReducer);
  const currentUser = useSelector((state) => state.currentUserReducer);
  const commentList = useSelector((state) => state.commentReducer);
  const morevids = useSelector((state) => state.videoReducer);
  const vmd = vids?.data?.filter((q) => q._id === vid)[0];
  const totalComments = commentList?.data?.filter((q) => vid === q?.vid).length;
  

  const handleViews = () => {
    dispatch(viewVideo({ id: vid }));
  };
  const handleHistory = () => {
    dispatch(
      addHistory({
        vid: vid,
        viewer: currentUser?.result?._id,
      })
    );
  };
  useEffect(() => {
    if (currentUser) {
      handleHistory();
    }
    handleViews();
    setCommentToggle(false);
    defaultScrollRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    //eslint-disable-next-line
  }, [vid]);

  useEffect(() => {
    if (morevids?.data?.length > 0 && vid) {
      const updatedRandomMoreVids = morevids?.data
        ?.filter((vi) => vi._id !== vid)
        .sort(() => Math.random() - 0.5)
        .slice(0, 8 + totalComments);

      setRandomMoreVids(updatedRandomMoreVids);
    }
    // eslint-disable-next-line
  }, [vid, morevids?.data]);

  const playerControls = {
    onShowComments: () => {
      const commentsSection = commetRef.current;
      commentsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      setCommentToggle(true);
    },
    onNextVideo: () => {
      const nextVideo = randomMoreVids[0]._id
      navigate("/watch/"+nextVideo);
    },
    onCloseWebsite: ()=>{
      window.open("about:blank", "_self");
    },
    onPointUpdate: ()=>{
      //console.log('done watching',currentUser?.result.id);
      dispatch(updatePoints(currentUser?.result?._id))
    },
    isLoggedIn:currentUser?.result._id ? true : false
  };

  return (
    <>
      <div className="container_videoPage">
        <div className="container2_videoPage">
          <div
            className="video_display_screen_videoPage"
            ref={defaultScrollRef}
          >
            <div className="video_ShowVideo_videoPage">
              <VideoPlayer
                videoUrl={vmd?.path}
                playerControls={playerControls}
              />
            </div>
            <div className="video_details_videoPage">
              <div className="video_btns_title_VideoPage_cont">
                <p className="video_title_VideoPage">{vmd?.title}</p>
              </div>
              <div className="chanel_details_cont_videoPage">
                <div className="chanel_details_videoPage">
                  <b className="chanel_logo_videoPage">
                    <p>{vmd?.uploader.charAt(0).toUpperCase()}</p>
                  </b>
                  <p className="chanel_name_videoPage">{vmd?.uploader}</p>
                </div>
                <LikeWatchLaterSaveBtns vmd={vmd} vid={vid} />
              </div>
              <div className="description_videoPage">
                <div className="views_date_btns_VideoPage">
                  <div className="views_videoPage">
                    {vmd?.views > 0 ? vmd?.views : 1} views{" "}
                    <div className="dot"></div>{" "}
                    {moment(vmd?.createdAt).fromNow()}
                  </div>
                </div>
                {vmd?.description}
              </div>
              <div
                className={`comments_VideoPage ${
                  commentToggle ? "comments_visible_VideoPage" : ""
                }`}
                ref={commetRef}
              >
                {commentToggle ? (
                  <div
                    className="comment_close"
                    onClick={() => setCommentToggle(false)}
                  >
                    X
                  </div>
                ) : (
                  ""
                )}
                <h3 onClick={() => setCommentToggle(true)}>
                  <u>
                    <span className="com_md_count">{totalComments}</span>{" "}
                    Comments{" "}
                    <span className="com_sm_count">{totalComments}</span>
                  </u>
                </h3>
                <Comment videoId={vmd?._id} />
              </div>
            </div>
          </div>
          <div className="moreVideoBar">
            {randomMoreVids?.map((m) => {
              return <MoreVideoList video={m} key={m?._id} />;
            })}
          </div>
          <div className="moreVideoBar_mobile">
            {randomMoreVids?.map((m) => {
              return <ShowVideo vid={m} key={m?._id} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoPage;
