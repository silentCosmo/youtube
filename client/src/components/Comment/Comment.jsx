import React, { useState } from "react";
import "./Comment.css";
import DisplayComment from "./DisplayComment";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "../../redux/action/comment";

function Comment({ videoId }) {
  const [commentText, setCommentText] = useState("");
  const [validInput,setValidInput] = useState(true)
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
  
  const regex = /^[a-zA-Z0-9\s.,!?'-]+$/

  const handleOnSubmit = (e)=>{
    e.preventDefault();
    if(currentUser){
        if(!commentText){
            alert('Please enter your comment!')
        }else{
          dispatch(postComment({
            vid:videoId,
            uid:currentUser?.result._id,
            city:currentUser?.result?.city,
            commentBody:commentText,
            commentedUser:currentUser.result.name? currentUser.result.name : currentUser.result.email.split('@')[0]
          }))
            setCommentText("")
            setValidInput(true)
        }
    }else{
        alert('Please login to comment!')
    }
  }

  const handleInputChange =(e)=>{
    const input = e.target.value
    setCommentText(input)
    if(input===""){
      setValidInput(true)
    }else{
      setValidInput(regex.test(input))
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
          placeholder="Add a comment..."
          onChange={handleInputChange}
          className="comment_ibox"
          value={commentText}
          />
        <input
          type="submit"
          value="Comment"
          disabled={!validInput}
          onClick={e=>handleOnSubmit(e)}
          className={`${commentText.length===0 || !validInput?"comment_add_btn_comments":"comment_add_btn_fill_comments"}`}
        />
      </form>
      {!validInput&&<p className="error_info">Special characters are not allowed!</p>}
      <div className="display_comment_container">
        {commentList?.data?.filter((q) => videoId === q?.vid).reverse().map((m)=>{
            return(<DisplayComment key={m._id} cId={m._id} userId={m.uid._id||m.uid} commentBody={m.commentBody} commentOn={m.commentedOn} userCommented={m.uid.name||m.commentedUser} userCity={m.uid.city||m.city} likes={m.like?m.like:0} likedBy={m.likedBy} dislikedBy={m.dislikedBy} />)
        })}
      </div>
    </>
  );
}

export default Comment;
