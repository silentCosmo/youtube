import React, { useState } from "react";
import "./Comment.css";
import DisplayComment from "./DisplayComment";
import { useSelector } from "react-redux";

function Comment({ videoId }) {
  const [commentText, setCommentText] = useState("");
  const currentUser = useSelector(state=>state.currentUserReducer);
  const commentList = [
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
  ];
  const handleOnSubmit = (e)=>{
    e.preventDefault();
    if(currentUser){
        if(!commentText){
            alert('Please enter your comment!')
        }else{
            setCommentText("")
        }
    }else{
        alert('Please login to comment!')
    }
  }

  return (
    <>
      <form className="comments_sub_form_comments">
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
        {commentList?.filter((q) => videoId === q._id).reverse().map((m)=>{
            return(<DisplayComment cId={m._id} userId={m.userId} commentBody={m.commentbody} commentOn={m.commenton} userCommented={m.usercommented} />)
        })}
      </div>
    </>
  );
}

export default Comment;
