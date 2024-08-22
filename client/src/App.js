import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { useState } from "react";
import AllRoutes from "./AllRoutes";
import DrawerSliderBar from "./components/Leftsidebar/DrawerSliderBar";
import CreateEditChannel from "./pages/Channel/CreateEditChannel";
import VideoUpload from "./pages/Videoupload/VideoUpload";

function App() {
  const [toggleDrawerSidebar, setDrawerSidebar] = useState({ display: "none" });
  const [editCreateChannelBtn, setEditCreateChannelBtn] = useState(false);
  const [videoUploadPage, setVideoUploadPage] = useState(false);

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
        <Navbar setEditCreateChannelBtn={setEditCreateChannelBtn} toggleDrawer={toggleDrawer}/>
        <DrawerSliderBar toggleDrawer={toggleDrawer} toggleDrawerSidebar={toggleDrawerSidebar} />
        <AllRoutes setEditCreateChannelBtn={setEditCreateChannelBtn} setVideoUploadPage={setVideoUploadPage} />
    </Router>
  );
}

export default App;
