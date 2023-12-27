import { MdOutlineVideoLibrary } from "react-icons/md"; 
import React from 'react'
import './LeftSideBar.css'
import { Link } from 'react-router-dom'
import { AiOutlineHome } from 'react-icons/ai'
import { SlEnergy } from "react-icons/sl"; 
import { MdSubscriptions } from "react-icons/md"; 

function DrawerSidebar() {
  return (
    <div className="container_drawersidebar">
        <Link to={'/'} className="icons_drawer">
            <AiOutlineHome size={22} className="icon_drawer"/>
            <div className="text_drawer">Home</div>
        </Link>
        <Link to={'/shorts'} className="icons_drawer">
            <SlEnergy size={22} className="icon_drawer"/>
            <div className="text_drawer">Shorts</div>
        </Link>
        <Link to={'/subscriptions'} className="icons_drawer">
            <MdSubscriptions size={22} className="icon_drawer"/>
            <div className="text_drawer">Subscriptions</div>
        </Link>
        <Link to={'/you'} className="icons_drawer">
            <MdOutlineVideoLibrary size={22} className="icon_drawer"/>
            <div className="text_drawer">You</div>
        </Link>
    </div>
  )
}

export default DrawerSidebar