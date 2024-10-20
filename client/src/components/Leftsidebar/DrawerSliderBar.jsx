import React from "react";
import "./LeftSideBar.css";
import { AiFillPlaySquare, AiOutlineHome, AiFillLike } from "react-icons/ai";
import {
  MdOutlineVideoLibrary,
  MdSubscriptions,
  MdOutlineWatchLater,
} from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import shorts from "./shorts.png";
import { NavLink } from "react-router-dom";

function DrawerSliderBar({ toggleDrawer, toggleDrawerSidebar }) {
  return (
    <div className="container_DrawerLeftSidebar" style={toggleDrawerSidebar}>
      <div className="container2_DrawerLeftSidebar">
        <div className="Drawer_leftsidebar">
          <NavLink to={"/"} className="icon_slidebar_div">
            <AiOutlineHome
              size={22}
              className="icon_sidebar"
              style={{ margin: "auto 0.7rem" }}
            />
            <div className="text_sidebar_icon">Home</div>
          </NavLink>
          <NavLink to={"/shorts"} className="icon_slidebar_div">
            <img
              src={shorts}
              width={22}
              className="icon_sidebar"
              style={{ margin: "auto 0.7rem" }}
              alt="Icon of youtube shorts"
            />
            <div className="text_sidebar_icon">Shorts</div>
          </NavLink>
          <NavLink to={"/feed/subscription"} className="icon_slidebar_div">
            <MdSubscriptions
              size={22}
              className="icon_sidebar"
              style={{ margin: "auto 0.7rem" }}
            />
            <div className="text_sidebar_icon">Subscription</div>
          </NavLink>
        </div>
        <div className="libraryBtn_Drawerleftsidebar">
          <NavLink to={"/feed/you"} className="icon_sidebar_div">
            <div className="option_container">
              <MdOutlineVideoLibrary
                size={22}
                className="icon_sidebar"
                style={{ margin: "auto 0.7rem" }}
              />
              <div className="text_sidebar_icon">Library</div>
            </div>
          </NavLink>
          <NavLink to={"/feed/history"} className="icon_sidebar_div">
            <div className="option_container">
              <FaHistory
                size={22}
                className="icon_sidebar"
                style={{ margin: "auto 0.7rem" }}
              />
              <div className="text_sidebar_icon">History</div>
            </div>
          </NavLink>
          <NavLink to={"/Yourvideo"} className="icon_sidebar_div">
            <div className="option_container">
              <AiFillPlaySquare
                size={22}
                className="icon_sidebar"
                style={{ margin: "auto 0.7rem" }}
              />
              <div className="text_sidebar_icon">Your Videos</div>
            </div>
          </NavLink>
          <NavLink to={"/watchlater"} className="icon_sidebar_div">
            <div className="option_container">
              <MdOutlineWatchLater
                size={22}
                className={"icon_sidebar"}
                style={{ margin: "auto 0.7rem" }}
              />
              <div className="text_sidebar_icon">Watch Later</div>
            </div>
          </NavLink>
          <NavLink to={"/liked"} className="icon_sidebar_div">
            <div className="option_container">
              <AiFillLike
                size={22}
                className="icon_sidebar"
                style={{ margin: "auto 0.7rem" }}
              />
              <div className="text_sidebar_icon">Liked Videos</div>
            </div>
          </NavLink>
        </div>
        <div className="subScriptions_lsdbar">
          <h4>Subscription</h4>
          <div className="chanel_lsdbar">
            <p>C</p>
            <div>Chanel</div>
          </div>
          <div className="chanel_lsdbar">
            <p>C</p>
            <div>Chanel</div>
          </div>
          <div className="chanel_lsdbar">
            <p>C</p>
            <div>Chanel</div>
          </div>
          <div className="chanel_lsdbar">
            <p>C</p>
            <div>Chanel</div>
          </div>
        </div>
      </div>
      <div className="container3_DrawaerLeftSidebar" onClick={() => toggleDrawer()}></div>
    </div>
  );
}

export default DrawerSliderBar;
