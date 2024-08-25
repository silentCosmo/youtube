import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";

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
  const currentUser = useSelector(state=>state.currentUserReducer);
  const handleEdit = (cId, cBody) => {
    setEdit(true);
    setCmtId(cId);
    setCmtBody(cBody);
  };
  return (
    <>
      {edit ? (
        <>
          <form className="comments_sub_form_comments">
            <input
              type="text"
              onChange={(e) => setCmtBody(e.target.value)}
              placeholder="Edit comments.."
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
          <p className="usercommented">{""} @{userCommented.toLowerCase()} <span className="commenton">commented {moment(commentOn).fromNow()}</span></p>
          <p className="comment_body">{commentBody}</p>
        </>
      )}
      {currentUser?.result?._id===userId&&(<p className="EditDel_DisplayComment"><i onClick={()=>handleEdit(cId,commentBody)}>Edit</i>&nbsp;&nbsp;&nbsp;<i>Delete</i></p>)}
      
    </>
  );
}

export default DisplayComment;
