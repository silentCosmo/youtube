import React from "react";
import "./Auth.css";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/action/currentuser";

function Auth({ user, setAuthBtn, setEditCreateChannelBtn }) {
  const dispatch = useDispatch()
  const logOut = ()=>{
    dispatch(setCurrentUser(null))
    localStorage.clear()
    googleLogout()
  }
  return (
    <div className="Auth_container" onClick={() => setAuthBtn(false)}>
      <div className="Auth_container2">
        <p className="User_Details">
          <div className="chanel_logo_App">
            <p className="fstChar_logo_App">
              {user?.result.name ? (
                <>{user?.result.name.charAt(0).toUpperCase()}</>
              ) : (
                <>{user?.result.email.charAt(0).toUpperCase()}</>
              )}
            </p>
          </div>
          <div className="email_auth">{user?.result.email}</div>
        </p>
        <div className="btns_Auth">
            {
                user?.result.name?(
                    <>
                    {
                        <Link to={`/channel/${user?.result?._id}`} className="btn_Auth">Your Channel</Link>
                    }
                    </>
                ):
                (
                    <>
                    <input type="submit" className="btn_Auth" value="Create Your Own Channel" onClick={()=>setEditCreateChannelBtn(true)} />
                    </>
                )
            }
            <div>
                <div className="btn_Auth" onClick={()=>logOut()}>
                    <BiLogOut/> Log Out
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
