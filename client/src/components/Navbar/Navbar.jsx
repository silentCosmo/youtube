import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "./logo.ico";
import { Link } from "react-router-dom";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { PiUserCircle } from "react-icons/pi";
import SearchBar from "./Searchbar/SearchBar";
import Auth from "../../pages/Auth/Auth";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/action/auth";
import { setCurrentUser } from "../../redux/action/currentuser";
import { jwtDecode } from "jwt-decode";
import { BiSearch } from "react-icons/bi";

function Navbar({ toggleDrawer, setEditCreateChannelBtn, setVideoUploadPage }) {
  const [authBtn, setAuthBtn] = useState(false);
  const [user, setUser] = useState(null);
  const [searchToggle, setSearchToggle] = useState(false);
  //const [profile, setProfile] = useState([]);
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUserReducer);

  /* const currentUser = {
    result: { email: "wandamaximoff@marvel.com", joinedon: "222-07-13423" },
  }; */

  const successSignIn = async (userEmail) => {
    /* try {
      const {data} = await axios.get("https://ipapi.co/121.243.33.212/json/")
      const city = data.city
      console.log(city);
    } catch (error) {console.log('Error fetching city: ',error)} */
    if (userEmail) {
      dispatch(login({ email: userEmail }));
    }
  };

  const signIn = useGoogleLogin({
    onSuccess: (tokenResponse) => setUser(tokenResponse),
    onError: (error) => console.log("Login Failed", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          //setProfile(res.data);
          successSignIn(res.data.email);
        })
        .catch((error) => console.log(error));
    }
    // eslint-disable-next-line
  }, [user]);

  const logOut = () => {
    dispatch(setCurrentUser(null));
    localStorage.clear();
    googleLogout();
  };

  useEffect(() => {
    const token = currentUser?.token;
    if (token) {
      const decodeToken = jwtDecode(token);
      if (decodeToken.exp * 1000 < new Date().getTime()) {
        logOut();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    // eslint-disable-next-line
  }, [currentUser?.token, dispatch]);

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
        <SearchBar
          searchToggle={searchToggle}
          setSearchToggle={setSearchToggle}
        />
        <div className="vid_bell_Navbar_Container">
          <BiSearch
            className="lg:hidden mr-5 p-2 rounded-full active:scale-90"
            size={24}
            onClick={() => setSearchToggle(true)}
          />
          <MdOutlineFileUpload
            size={22}
            className={"vid_bell_Navbar"}
            onClick={() => setVideoUploadPage(true)}
          />
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
                      <>{currentUser?.result.name?.charAt(0).toUpperCase()}</>
                    ) : (
                      <>{currentUser?.result.email?.charAt(0).toUpperCase()}</>
                    )}
                  </p>
                </div>
              </>
            ) : (
              <div className="Auth_Btn" onClick={() => signIn()}>
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
