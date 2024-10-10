import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, editComment } from "../../redux/action/comment";

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
  const dispatch = useDispatch()
  const currentUser = useSelector(state=>state.currentUserReducer);
  
  const handleEdit = (cId, cBody) => {
    setEdit(true);
    setCmtId(cId);
    setCmtBody(cBody);
  };

  const handleOnSubmit = (e)=>{
    e.preventDefault();
    if(!cmtBody){
      alert("type your comment!")
    }else{
      dispatch(editComment({id:cmtId,commentBody:cmtBody}))
      setCmtBody("")
    }
    setEdit(false)
  }

  const handleDelete = (id) =>{
    dispatch(deleteComment(id))
  }

  return (
    <>
      {edit ? (
        <>
          <form className="comments_sub_form_comments" onSubmit={(e)=>handleOnSubmit(e)}>
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
          </form>
        </>
      ) : (
          <>
          <p className="usercommented">{""} @{userCommented?.toLowerCase()} <span className="commenton">commented {moment(commentOn).fromNow()}</span></p>
          <p className="comment_body">{commentBody}</p>
        </>
      )}
      {currentUser?.result?._id===userId&&(<p className="EditDel_DisplayComment"><i onClick={()=>handleEdit(cId,commentBody)}>Edit</i>&nbsp;&nbsp;&nbsp;<i onClick={()=>handleDelete(cId)}>Delete</i></p>)}
      
    </>
  );
}

export default DisplayComment;
