import React, { useRef, useState } from "react";
import "./ShowVideo.css";
import moment from "moment";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmationModal from "./ConfirmationModal";
import {useDispatch} from 'react-redux'
import { deleteVideo } from "../../redux/action/video";

function ShowVideo({ vid, opt}) {
  const dispatch = useDispatch()
  const videoRef = useRef(null); 
  const [isModalOpen, setModalOpen] = useState(false);

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

  const handleDelete = async () => {
    dispatch(deleteVideo(vid._id))
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const confirmDelete = () => {
    handleDelete();
    closeModal();
  };

  return (
    <>
      <Link to={`/watch/${vid._id}`}>
        <video src={vid.path} className="video_ShowVideo" 
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
            { opt&&<p className="moreVideo_options_delete" onClick={()=>openModal()}>
              <RiDeleteBin6Line />
            </p>}
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={closeModal}
        message="Do you really want to delete this video? This action cannot be undone."
      />
    </>
  );
}

export default ShowVideo;
