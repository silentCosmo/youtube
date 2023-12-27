import { RxDotFilled } from "react-icons/rx";
import { MdOutlinedFlag } from "react-icons/md"; 
import { MdHelpOutline } from "react-icons/md"; 
import { MdOutlineFeedback } from "react-icons/md"; 
import { BsGear } from "react-icons/bs"; 
import { MdPodcasts } from "react-icons/md"; 
import { TbHanger } from "react-icons/tb"; 
import { AiOutlineBulb } from "react-icons/ai"; 
import { BiTrophy } from "react-icons/bi"; 
import { BiNews } from "react-icons/bi"; 
import { SiYoutubegaming } from "react-icons/si"; 
import { FiRadio } from "react-icons/fi"; 
import { CgClapperBoard } from "react-icons/cg"; 
import { RiShoppingBagLine } from "react-icons/ri"; 
import { AiOutlineFire } from "react-icons/ai"; 
import { BiLike } from "react-icons/bi"; 
import { RiScissorsLine } from "react-icons/ri"; 
import { MdOutlineWatchLater } from "react-icons/md"; 
import { RiVideoLine } from "react-icons/ri"; 
import { MdHistory } from "react-icons/md"; 
import { MdOutlinePortrait } from "react-icons/md"; 
import { MdSubscriptions } from "react-icons/md"; 
import { SlEnergy } from "react-icons/sl"; 
import { AiOutlineHome } from "react-icons/ai";
import React from 'react'
import {Link} from 'react-router-dom'
import './LeftSideBar.css'

function LeftSideBar({toggleSidebar,sideBarToggler}) {
  return (
    <div className='container_leftsidebar' id="lsb" style={sideBarToggler}>
        <Link to={'/'} className="icons_sidebar">
            <AiOutlineHome size={22} className="icon_sidebar"/>
            <div className="text_sidebar_icon">Home</div>
        </Link>
        <Link to={'/shorts'} className="icons_sidebar">
            <SlEnergy size={22} className="icon_sidebar"/>
            <div className="text_sidebar_icon">Shorts</div>
        </Link>
        <div className="icons_sidebar">
            <MdSubscriptions size={22} className="icon_sidebar"/>
            <div className="text_sidebar_icon">Subscriptions</div>
        </div>

        <div className="line_sidebar"/>
{/* You */}
        <div className="icons_sidebar">
            <div className="you_text">You <span className="gt_text">&gt;</span></div>
        </div>
        <div className="icons_sidebar">
            <MdOutlinePortrait size={22} className="icon_sidebar"/>
            <div className="text_sidebar_icon">Your channel</div>
        </div>
        <div className="icons_sidebar">
            <MdHistory size={22} className="icon_sidebar"/>
            <div className="text_sidebar_icon">History</div>
        </div>
        <div className="icons_sidebar">
            <RiVideoLine size={22} className="icon_sidebar"/>
            <div className="text_sidebar_icon">Videos</div>
        </div>
        <div className="icons_sidebar">
            <MdOutlineWatchLater size={22} className="icon_sidebar"/>
            <div className="text_sidebar_icon">Watch Later</div>
        </div>
        <div className="icons_sidebar">
            <RiScissorsLine size={22} className="icon_sidebar"/>
            <div className="text_sidebar_icon">Your clips</div>
        </div>
        <div className="icons_sidebar">
            <BiLike size={22} className="icon_sidebar"/>
            <div className="text_sidebar_icon">Liked videos</div>
        </div>

        <div className="line_sidebar"/>
{/* Subscriptions */}
          <div className="container_channel_lsdbar">
              <div className="subscription_text">Subscriptions</div>
              {/* SubedChannels */}
              
              <div className="channel_lsdbar">
                <p>C</p>
                <div>Channel Name</div>
                <RxDotFilled className="chaupdate" />
              </div>

              <div className="channel_lsdbar">
                <p>C</p>
                <div>Channel Name</div>
                <RxDotFilled className="chaupdate" />
              </div>

              <div className="channel_lsdbar">
                <p>C</p>
                <div>Channel Name</div>
                <RxDotFilled className="chaupdate" />
              </div>

              <div className="channel_lsdbar">
                <p>C</p>
                <div>Channel Name</div>
                <RxDotFilled className="chaupdate" />
              </div>
              
        </div>

        <div className="line_sidebar"/>
{/* Explore */}
        <div className="icons_sidebar">
            <div className="you_text">Explore</div>
        </div>
        <div className="icons_sidebar">
            <AiOutlineFire size={22} className="icon_sidebar"/>
            <div className="text_sidebar_icon">Trending</div>
        </div>
        <div className="icons_sidebar">
            <RiShoppingBagLine size={22} className="icon_sidebar"/>
            <div className="text_sidebar_icon">Shopping</div>
        </div>
        <div className="icons_sidebar">
            <CgClapperBoard size={22} className="icon_sidebar"/>
            <div className="text_sidebar_icon">Flims</div>
        </div>
        <div className="icons_sidebar">
            <FiRadio size={22} className="icon_sidebar"/>
            <div className="text_sidebar_icon">Live</div>
        </div>
        <div className="icons_sidebar">
            <SiYoutubegaming size={22} className="icon_sidebar"/>
            <div className="text_sidebar_icon">Your clips</div>
        </div>
        <div className="icons_sidebar">
            <BiNews size={22} className="icon_sidebar"/>
            <div className="text_sidebar_icon">News</div>
        </div>
        <div className="icons_sidebar">
            <BiTrophy   size={22} className="icon_sidebar"/>
            <div className="text_sidebar_icon">Sports</div>
        </div>
        <div className="icons_sidebar">
            <AiOutlineBulb size={22} className="icon_sidebar"/>
            <div className="text_sidebar_icon">Learning</div>
        </div>
        <div className="icons_sidebar">
            <TbHanger size={22} className="icon_sidebar"/>
            <div className="text_sidebar_icon">Fashion & beauty</div>
        </div>
        <div className="icons_sidebar">
            <MdPodcasts size={22} className="icon_sidebar"/>
            <div className="text_sidebar_icon">Podcast</div>
        </div>

        <div className="line_sidebar"/>

{/* More From Youtube */}

        <div className="icons_sidebar">
            <BsGear size={22} className="icon_sidebar"/>
            <div className="text_sidebar_icon">Settings</div>
        </div>
        <div className="icons_sidebar">
            <MdOutlinedFlag size={22} className="icon_sidebar"/>
            <div className="text_sidebar_icon">Report</div>
        </div>
        <div className="icons_sidebar">
            <MdHelpOutline size={22} className="icon_sidebar"/>
            <div className="text_sidebar_icon">Help</div>
        </div>
        <div className="icons_sidebar">
            <MdOutlineFeedback size={22} className="icon_sidebar"/>
            <div className="text_sidebar_icon">Send feedback</div>
        </div>

        <div className="line_sidebar"/>

{/* Footer */}
        <div className="footer">
         <p> About Press Copyright Contact us Creator Advertise Developers </p>
         <p>Terms Privacy Policy & Safety How YouTube works <br /> Test new features</p>
           <span className="copy">© 2023 Google LLC</span>
           <br /><br />
        </div>
        
        <div className="container_2_sidebar" onClick={()=>toggleSidebar()}>g</div>

    </div>
  )
}

export default LeftSideBar