import { BiUserCircle } from "react-icons/bi";
import { RxUpload } from "react-icons/rx";
import { BiBell } from "react-icons/bi";
import React from 'react'
import logo from '../../assets/logo.png'
import "./Navbar.css"
import Searchbar from './Searchbar/SearchBar'
import { NavLink } from "react-router-dom";

function Navbar({toggleSidebar}) {
  //const currentUser = null;
  const currentUser = {
    result:{
      email:"elonmusk@tesla.com",
      joineOn:"2016-02-28T09:56:22.378Z",
    },
  }
  return (
    <div className="container">
      <div className="burger_logo">
        <div className="burger" onClick={()=>toggleSidebar()}>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
      <NavLink to={'/'} className="logo_div">
        <img src={logo} alt="youtube" />
        <p className='logo_title'>YouTube</p>
      </NavLink>

      <Searchbar />
      <RxUpload size={20} className="video_upload_icon" />
      <BiBell size={20} className="notification_icon" />

      <div className="auth_cont_nav">
        {currentUser ?
          <>
            <div className="channel_logo">
              <p className="fstChar_logo">
                {
                  currentUser.result.name ? (
                    <>
                    {currentUser?.result.name.charAt(0).toUpperCase()}
                    </>
                  ) : (<>
                    {currentUser?.result.email.charAt(0).toUpperCase()}</>)
                }
              </p>
            </div>
          </>
          :
          <p className="auth_btn">
            <BiUserCircle size={20} />
            <b>Sign In</b>
          </p>
        }
      </div>
    </div>
  )
}

export default Navbar