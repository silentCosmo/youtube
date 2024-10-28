import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, editComment } from "../../redux/action/comment";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmationModal from "../Showvideo/ConfirmationModal";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";

function DisplayComment({
  cId,
  commentBody,
  userId,
  commentOn,
  userCommented,
}) {
  const [edit, setEdit] = useState(false);
  const [cmtId, setCmtId] = useState("");
  const [cmtBody, setCmtBody] = useState("");
  const [cmtMenu, setCmtMenu] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [likeComment, setLikeComment] = useState(false);
  const [dislikeComment, setDislikeComment] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUserReducer);

  const handleEdit = (cId, cBody) => {
    setCmtMenu(false);
    setEdit(true);
    setCmtId(cId);
    setCmtBody(cBody);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!cmtBody) {
      alert("type your comment!");
    } else {
      dispatch(editComment({ id: cmtId, commentBody: cmtBody }));
      setCmtBody("");
    }
    setEdit(false);
  };

  const handleDelete = () => {
    dispatch(deleteComment(cId));
    setCmtMenu(false);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const confirmDelete = () => {
    handleDelete();
    closeModal();
  };
  const handleLike =()=>{
    if(currentUser){
      if(likeComment){
        setLikeComment(false)
      }else{
        setLikeComment(true)
        setDislikeComment(false)
      }
    }else{
      alert('Please login to like the comment')
    }
  }
  const handleDislike =()=>{
    if(currentUser){
      if(dislikeComment){
        setDislikeComment(false)
      }else{
        setDislikeComment(true)
        setLikeComment(false)
      }
    }else{
      alert('Please login to like the comment')
    }
  }

  //console.log(navigator.geolocation.getCurrentPosition);
 /*  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position)=>{
      const {latitude,longitude} = position.coords
      console.log(position.coords);
      
    })
  } */

  return (
    <div id="container_main_comment">
      {edit ? (
        <>
          <form
            className="comments_sub_form_comments"
            onSubmit={(e) => handleOnSubmit(e)}
          >
            <input
              type="text"
              onChange={(e) => setCmtBody(e.target.value)}
              placeholder="Edit comment.."
              value={cmtBody}
              className="comment_ibox"
            />
            <input
              type="submit"
              value="Change"
              className="comment_add_btn_comments"
            />
            <input
              className="comment_add_btn_comments"
              value="Cancel"
              readOnly
              onClick={() => setEdit(false)}
            />
          </form>
        </>
      ) : (
        <div className="comment_container">
          <div>
            <div className="Chanel_logo_App" id="comment_channel_logo">
              <p className="fstChar_logo_App">
                <>{userCommented.charAt(0).toUpperCase()}</>
              </p>
            </div>
          </div>
          <div className="comment_content">
            <p className="usercommented">
              {""} @{userCommented?.toLowerCase()}{" "}
              <span className="commenton">
                commented {moment(commentOn).fromNow()}
              </span>
              <span className="usercommented">&nbsp; <small>from</small> {currentUser?.result?.city? currentUser?.result?.city : 'cityname'}</span>
            </p>
            <p className="comment_body">{commentBody}</p>
            <div className="comment_interactions">
              <div className="comment_like_dislike">
                <div
                  className="comment_like_container"
                  onClick={() => handleLike()}
                >
                  <div className="comment_like_btn">
                  {likeComment ? (
                    <BiSolidLike size={20} />
                  ) : (
                    <BiLike size={20} />
                  )}</div>
                  <span className="comment_like_count">&nbsp;86</span>
                </div>
                <div
                  className="comment_dislike_btn"
                  onClick={() => handleDislike()}
                >
                  {dislikeComment ? (
                    <BiSolidDislike size={20} />
                  ) : (
                    <BiDislike size={20} />
                  )}
                </div>
              </div>
              <div className="comment_translation">Translate</div>
            </div>
          </div>
        </div>
      )}
      {currentUser?.result?._id === userId && (
        <>
          <p className="comment_options" onClick={() => setCmtMenu(!cmtMenu)}>
            <BsThreeDotsVertical />
          </p>
          {cmtMenu ? (
            <p className="EditDel_DisplayComment">
              <span onClick={() => handleEdit(cId, commentBody)}>
                <MdOutlineEdit />
                &nbsp; Edit
              </span>
              <span onClick={() => openModal(cId)}>
                <RiDeleteBin6Line />
                &nbsp; Delete
              </span>
            </p>
          ) : (
            ""
          )}
          {cmtMenu ? (
            <div className="menu_bg" onClick={() => setCmtMenu(false)}></div>
          ) : (
            ""
          )}
        </>
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={closeModal}
        message="Delete your comment permanently?"
      />
    </div>
  );
}

export default DisplayComment;
