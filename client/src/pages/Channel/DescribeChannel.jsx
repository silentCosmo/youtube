import React from "react";
import "./DescribeChannel.css";
import { channel} from "../../assets/u_db";
import { FaEdit, FaUpload } from "react-icons/fa";
import { useSelector } from "react-redux";

function DescribeChannel({ cid, setVideoUploadPage, setEditCreateChannelBtn }) {
  const currentUser = useSelector(state=>state.currentUserReducer);
  const channel = useSelector(state=>state.channelReducer)
  
  
  const currentChannel = channel.filter((c) => c._id === cid)[0];
  
  return (
    <div className="container3_chanel">
      <div className="chanel_logo_chanel">
        <b>{currentChannel?.name.charAt(0).toUpperCase()}</b>
      </div>
      <div className="description_chanel">
        <b>{currentChannel?.name}</b>
        <p>{currentChannel?.desc}</p>
      </div>
      {currentUser?.result._id === currentChannel?._id && (
        <>
          <p
            className="editbtn_chanel"
            onClick={() => setEditCreateChannelBtn(true)}
          >
            <FaEdit />
            <b> Edit Chammel</b>
          </p>
          <p className="uploadbtn_chanel" onClick={() => setVideoUploadPage(true)}>
            <FaUpload />
            <b> Upload Video</b>
          </p>
        </>
      )}
    </div>
  );
}

export default DescribeChannel;