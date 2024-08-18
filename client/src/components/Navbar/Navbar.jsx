import React, { useState } from "react";
import "./Navbar.css";
import logo from "./logo.ico";
import { Link } from "react-router-dom";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { PiUserCircle } from "react-icons/pi";
import SearchBar from "./Searchbar/SearchBar";
import Auth from "../../pages/Auth/Auth";

function Navbar({ toggleDrawer, setEditCreateChannelBtn }) {
  const [authBtn, setAuthBtn] = useState(false);
  //const currentUser = null;
  const currentUser = {
    result: { email: "wandamaximoff@marvel.com", joinedon: "222-07-13423" },
  };

  return (
    <>
      <div className="Container_Navbar">
        <div className="Burger_Logo_Navbar">
          <div className="burger" onClick={() => toggleDrawer()}>
            <p></p>
            <p></p>
            <p></p>
          </div>
          <Link to={"/"} className="logo_div_Navbar">
            <img src={logo} alt="" className="logo" />
            <p className="logo_title_navbar">YourTube</p>
          </Link>
        </div>
        <SearchBar />
        <div className="vid_bell_Navbar_Container">
          <MdOutlineFileUpload size={22} className={"vid_bell_Navbar"} />
          <div className="apps_Box">
            <p className="appBox"></p>
            <p className="appBox"></p>
            <p className="appBox"></p>
            <p className="appBox"></p>
            <p className="appBox"></p>
            <p className="appBox"></p>
            <p className="appBox"></p>
            <p className="appBox"></p>
            <p className="appBox"></p>
          </div>
          <IoMdNotificationsOutline size={22} className={"vid_bell_Navbar"} />
          <div className="Auth_cont_Navbar">
            {currentUser ? (
              <>
                <div
                  className="Chanel_logo_App"
                  onClick={() => setAuthBtn(true)}
                >
                  <p className="fstChar_logo_App">
                    {currentUser?.result.name ? (
                      <>{currentUser?.result.name.charAt(0).toUpperCase()}</>
                    ) : (
                      <>{currentUser?.result.email.charAt(0).toUpperCase()}</>
                    )}
                  </p>
                </div>
              </>
            ) : (
              <div className="Auth_Btn">
                <PiUserCircle size={22} /> <b> &nbsp; Sign in</b>
              </div>
            )}
          </div>
        </div>
      </div>
      {authBtn && (
        <Auth
          setEditCreateChannelBtn={setEditCreateChannelBtn}
          setAuthBtn={setAuthBtn}
          user={currentUser}
        />
      )}
    </>
  );
}

export default Navbar;
