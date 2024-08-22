import React from "react";
import "./DescribeChannel.css";
import { channel, currentUser } from "../../assets/u_db";
import { FaEdit, FaUpload } from "react-icons/fa";

function DescribeChannel({ cid, setVideoUploadPage, setEditCreateChannelBtn }) {
  console.log(cid);
  console.log(Number(cid));

  const currentChannel = channel.filter((c) => c._id === Number(cid))[0];
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
