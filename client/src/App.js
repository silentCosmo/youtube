import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { useState } from "react";
import AllRoutes from "./AllRoutes";
import DrawerSliderBar from "./components/Leftsidebar/DrawerSliderBar";

function App() {
  const [toggleDrawerSidebar, setDrawerSidebar] = useState({ display: "none" });
  const [editCreateChannelBtn, setEditCreateChannelBtn] = useState(false);
  const [videoUploadPage, setVideoIUploadPage] = useState(false);

  const toggleDrawer = () => {
    if (toggleDrawerSidebar.display === "none") {
      setDrawerSidebar({ display: "flex" });
    } else {
      setDrawerSidebar({ display: "none" });
    }
  };

  return (
    <Router>
        <Navbar editCreateChannelBtn={setEditCreateChannelBtn} toggleDrawer={toggleDrawer}/>
        <DrawerSliderBar toggleDrawer={toggleDrawer} toggleDrawerSidebar={toggleDrawerSidebar} />
        <AllRoutes/>
    </Router>
  );
}

export default App;
