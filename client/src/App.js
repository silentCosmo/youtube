import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import AllRoutes from "./AllRoutes";
import DrawerSliderBar from "./components/Leftsidebar/DrawerSliderBar";
import CreateEditChannel from "./pages/Channel/CreateEditChannel";
import VideoUpload from "./pages/Videoupload/VideoUpload";
import { useDispatch } from "react-redux";
import { fetchAllChannel } from "./redux/action/channeluser";
import { getAllVideo } from "./redux/action/video";
import { getAllComments } from "./redux/action/comment";

function App() {
  const [toggleDrawerSidebar, setDrawerSidebar] = useState({ display: "none" });
  const [editCreateChannelBtn, setEditCreateChannelBtn] = useState(false);
  const [videoUploadPage, setVideoUploadPage] = useState(false);

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchAllChannel())
    dispatch(getAllVideo())
    dispatch(getAllComments())
  },[dispatch])
  const toggleDrawer = () => {
    if (toggleDrawerSidebar.display === "none") {
      setDrawerSidebar({ display: "flex" });
    } else {
      setDrawerSidebar({ display: "none" });
    }
  };

  return (
    <Router>
      {
        videoUploadPage && <VideoUpload setVideoUploadPage={setVideoUploadPage} />
      }
      {editCreateChannelBtn && (<CreateEditChannel setEditCreateChannelBtn={setEditCreateChannelBtn} />)}
        <Navbar setEditCreateChannelBtn={setEditCreateChannelBtn} toggleDrawer={toggleDrawer} setVideoUploadPage={setVideoUploadPage}/>
        <DrawerSliderBar toggleDrawer={toggleDrawer} toggleDrawerSidebar={toggleDrawerSidebar} />
        <AllRoutes setEditCreateChannelBtn={setEditCreateChannelBtn} setVideoUploadPage={setVideoUploadPage} />
    </Router>
  );
}

export default App;
