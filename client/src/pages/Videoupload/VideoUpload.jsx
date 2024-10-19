import React, { useState } from "react";
import "./VideoUpload.css";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";
import { uploadVideo } from "../../redux/action/video";

function VideoUpload({ setVideoUploadPage }) {
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUserReducer);

  const fileOption = {
    onUploadProgress: (ProgressEvent) => {
      const { loaded, total } = ProgressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setProgress(percentage);
      if (percentage === 100) {
        setTimeout(function () {}, 3000);
        setVideoUploadPage(false);
      }
    },
  };

  const handleSetVideoFile = (file) => {
    setVideoFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleSetVideoFile(e.dataTransfer.files[0]);
    }
  };

  const uploadVideoFile = () => {
    if (!title) {
      alert("Title cannot be empty");
    } else if (!videoFile) {
      alert("Please select a video file");
    } else if (videoFile.size > 20000000) {
      alert("Please select a video file less than 20 MB");
    } else {
      const fileData = new FormData();
      fileData.append("file", videoFile);
      fileData.append("title", title);
      fileData.append("channel", currentUser?.result?._id);
      fileData.append("uploader", currentUser?.result?.name);

      // Log each key-value pair in FormData
      for (let pair of fileData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      dispatch(uploadVideo({ fileData: fileData, fileOption: fileOption }));
    }
  };

  const handleClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="container_VidUpload">
      <div className="container2_VidUpload">
      <label className="ibtn_label">Upload videos</label>
      <input
        type="submit"
        name="text"
        value="X"
        onClick={() => setVideoUploadPage(false)}
        id="ibtn_x"
      />
      <hr className="hr"/>
        <div className="ibox_div_vidupload">
          <input
            type="text"
            maxLength={62}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title for the video"
            className="ibox_vidupload"
          />

          {/* Drag-and-drop and click-to-browse area */}
          <div
            className={`drop_zone ${isDragging ? "dragging" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={handleClick} // Triggers file input click
          >
            {videoFile ? (
              <p>{videoFile.name}</p>
            ) : (
              <p>Drag and drop a video file here, or click to browse</p>
            )}
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }} // Hides the default input
              onChange={(e) => handleSetVideoFile(e.target.files[0])}
            />
          </div>
        </div>

        <div className="ibox_div_vidupload">
          <input
            type="submit"
            onClick={() => uploadVideoFile()}
            value={"Upload"}
            className="ibox_vidupload btn_vidUpload"
          />
{/*           <div className="loader ibox_div_vidupload">
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
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default VideoUpload;


/* import React, { useState } from "react";
import "./VideoUpload.css";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";
import { uploadVideo } from "../../redux/action/video";

function VideoUpload({ setVideoUploadPage }) {
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch()
  
  const currentUser = useSelector(state=>state.currentUserReducer);

  const fileOption = {
    onUploadProgress:(ProgressEvent)=>{
      const {loaded,total} = ProgressEvent;
      const percentage = Math.floor(((loaded / 1000)*100)/ (total/1000))
      setProgress(percentage)
      if(percentage === 100){
        setTimeout(function(){},3000)
        setVideoUploadPage(false)
      }
    },
  }

  const handleSetVideoFile = (e) => {
    setVideoFile(e.target.files[0]);
  };
  const uploadVideoFile = () => {
    if (!title) {
      alert("Title could not be empty");
    } else if (!videoFile) {
      alert("Please select a video file");
    } else if (videoFile.size > 20000000) {
      alert("Plese select a video file lessthan 20 mb");
    } else {
      const fileData = new FormData()
      fileData.append("file", videoFile)
      fileData.append("title", title)
      fileData.append("channel", currentUser?.result?._id)
      fileData.append("uploader", currentUser?.result?.name)
      console.log(videoFile);
      console.log(fileData);
      // Log each key-value pair in FormData
    for (let pair of fileData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
      dispatch(uploadVideo({fileData:fileData,fileOption:fileOption}))
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
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            placeholder="Enter title for the video"
            className="ibox_vidupload"
          />
          <label htmlFor="file" className="">
            <input
              type="file"
              name="file"
              accept="video/mp4"
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
 */