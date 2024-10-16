import React, { useState } from "react";
import "./Comment.css";
import DisplayComment from "./DisplayComment";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "../../redux/action/comment";

function Comment({ videoId }) {
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch()
  const currentUser = useSelector(state=>state.currentUserReducer);
  const commentList =useSelector(state=>state.commentReducer);
  /* const commentList = [
    {
      _id: 1,
      commentbody: "Hi there",
      usercommented: "deadPool",
    },
    {
      _id: 2,
      commentbody: "Whats going on",
      usercommented: "ThorOdinSon",
    },
    {
      _id: 3,
      commentbody: "Where is Loki",
      usercommented: "Dr.Strange",
    },
  ]; */
  
  const handleOnSubmit = (e)=>{
    e.preventDefault();
    if(currentUser){
        if(!commentText){
            alert('Please enter your comment!')
        }else{
          dispatch(postComment({
            vid:videoId,
            uid:currentUser?.result._id,
            commentBody:commentText,
            commentedUser:currentUser.result.name? currentUser.result.name : currentUser.result.email.split('@')[0]
          }))
            setCommentText("")
        }
    }else{
        alert('Please login to comment!')
    }
  }

  return (
    <>
      <form className="comments_sub_form_comments">
      <div>
            <div className="Chanel_logo_App" id="comment_channel_logo">
              <p className="fstChar_logo_App">
                <>{currentUser ? (currentUser?.result?.name ? currentUser?.result?.name.charAt(0).toUpperCase():currentUser?.result?.email.charAt(0).toUpperCase()) : "X" }</>
              </p>
            </div>
          </div>
        <input
          type="text"
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          value={commentText}
          className="comment_ibox"
        />
        <input
          type="submit"
          value="Comment"
          onClick={e=>handleOnSubmit(e)}
          className={`${commentText.length===0?"comment_add_btn_comments":"comment_add_btn_fill_comments"}`}
        />
      </form>
      <div className="display_comment_container">
        {commentList?.data?.filter((q) => videoId === q?.vid).reverse().map((m)=>{
            return(<DisplayComment key={m._id} cId={m._id} userId={m.uid} commentBody={m.commentBody} commentOn={m.commentedOn} userCommented={m.commentedUser} />)
        })}
      </div>
    </>
  );
}

export default Comment;
