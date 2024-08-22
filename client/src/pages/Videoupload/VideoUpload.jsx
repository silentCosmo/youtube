import React, { useState } from "react";
import "./VideoUpload.css";
import { currentUser } from "../../assets/u_db";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

function VideoUpload({ setVideoUploadPage }) {
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const [progress, setProgress] = useState(0);
  const handleSetVideoFile = (e) => {
    setVideoFile(e.target.files[0]);
  };
  const uploadVideoFile = () => {
    if (!title) {
      alert("Title could not be empty");
    } else if (!videoFile) {
      alert("Please select a video file");
    } else if (videoFile.size > 1000000) {
      alert("Plese select a video file lessthan 10 mb");
    } else {
      const fileData = new FormData();
      fileData.append("file", videoFile);
      fileData.append("title", title);
      fileData.append("channel", currentUser?.result?._id);
      fileData.append("uploader", currentUser?.result?.name);
    }
  };
  return (
    <div className="container_VidUpload">
      <input
        type="submit"
        name="text"
        value="X"
        onClick={() => setVideoUploadPage(false)}
        className="ibtn_x"
      />
      <div className="container2_VidUpload">
        <div className="ibox_div_vidupload">
          <input
            type="text"
            maxLength={30}
            placeholder="Enter title for the video"
            className="ibox_vidupload"
          />
          <label htmlFor="file" className="ibox_vidupload btn_vidUpload">
            <input
              type="file"
              name="file"
              /* accept="video/mp4" */
              style={{ fontSize: "1rem" }}
              onChange={(e) => handleSetVideoFile(e)}
              className="ibox_vidupload"
            />
          </label>
        </div>
        <div className="ibox_div_vidupload">
          <input
            type="submit"
            onClick={() => uploadVideoFile()}
            value={"Upload"}
            className="ibox_vidupload btn_vidUpload"
          />
          <div className="loader ibox_div_vidupload">
            <CircularProgressbar
              value={progress}
              text={`${progress}`}
              styles={buildStyles({
                rotation: 0.25,
                strokeLinecap: "butt",
                textSize: "20px",
                pathTransitionDuration: "0.5",
                pathColor: `rgba(255,255,255,${progress / 100}`,
                textColor: "#f88",
                trailColor: "#adff2f",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoUpload;
