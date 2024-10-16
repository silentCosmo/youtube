import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, editComment } from "../../redux/action/comment";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

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
  const [cmtMenu,setCmtMenu] = useState(false)
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUserReducer);

  const handleEdit = (cId, cBody) => {
    setCmtMenu(false)
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

  const handleDelete = (id) => {
    const confirmDel = window.confirm("Delete your comment permanently?")
    if(confirmDel){
      dispatch(deleteComment(id))
    }
    setCmtMenu(false)
  };

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
            <input className="comment_add_btn_comments" value="Cancel" readOnly onClick={() => setEdit(false)}/>
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
            </p>
            <p className="comment_body">{commentBody}</p>
          </div>
        </div>
      )}
      {currentUser?.result?._id === userId && (
        <>
        <p className="comment_options" onClick={()=>setCmtMenu(!cmtMenu)}><BsThreeDotsVertical /></p>
        { cmtMenu?  
        <p className="EditDel_DisplayComment">
          <span onClick={() => handleEdit(cId, commentBody)}><MdOutlineEdit/>&nbsp; Edit</span>
          <span onClick={() => handleDelete(cId)}><RiDeleteBin6Line/>&nbsp; Delete</span>
        </p>:""
        }
        {
          cmtMenu? <div className="menu_bg" onClick={()=>setCmtMenu(false)}></div> : ""
        }
        </>
      )}
    </div>
  );
}

export default DisplayComment;
