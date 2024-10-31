import React from 'react'
import './LeftSideBar.css'
import shorts from './shorts.png'
import { Link } from 'react-router-dom'
import { AiOutlineHome } from 'react-icons/ai'
import { MdOutlineVideoLibrary, MdSubscriptions } from 'react-icons/md'

function LeftSideBar() {
  return (
    <div className="container_leftSidebar">
        <Link to={'/'} className='icon_sidebar_div'><AiOutlineHome size={22} className='icon_sidebar'/><div className="text_sidebar_icon">Home</div></Link>
        <Link to={'/shorts'} className='icon_sidebar_div'><img alt='shorts icon' src={shorts} width={22} className='icon_sidebar'/><div className="text_sidebar_icon">Home</div></Link>
        <Link to={'/feed/subscriptions'} className="icon_sidebar_div"><MdSubscriptions size={22} className="icon_sidebar"/><div className="text_sidebar_icon">Subscriptions</div></Link>
        <Link to={'/feed/you'} className="icon_sidebar_div"><MdOutlineVideoLibrary size={22} className="icon_sidebar"/><div className="text_sidebar_icon">You</div></Link>
    </div>
  )
}

export default LeftSideBar