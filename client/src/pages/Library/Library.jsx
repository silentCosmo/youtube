import React from 'react'
import './Library.css'
import {FaHistory, } from 'react-icons/fa'
import { MdOutlineWatchLater } from 'react-icons/md'
import { AiOutlineLike } from 'react-icons/ai'
import LeftSideBar from '../../components/Leftsidebar/LeftSideBar'
import WHLvideoList from '../../components/WHL/WHLvideoList'
import { currentUser } from '../../assets/u_db'
import { vids } from '../../components/video/v_db'

function Library() {
  return (
    <div className="container_Pages_App">
        <LeftSideBar/>
        <div className="container2_Pages_App">
            <div className="container_libraryPage">
                <h1 className="title_container_LibraryPage">
                    <b><FaHistory/></b>
                    <b>History</b>
                </h1>
                <div className="container_videoList_LibraryPage">
                    <WHLvideoList page={"History"} currentUser={currentUser?.result?._id} videoList={vids} />
                </div>
            </div>
            <div className="container_libraryPage">
                <h1 className="title_container_LibraryPage">
                    <b><MdOutlineWatchLater/></b>
                    <b>Watch Later</b>
                </h1>
                <div className="container_videoList_LibraryPage">
                    <WHLvideoList page={"Watch Later"} currentUser={currentUser?.result?._id} videoList={vids} />
                </div>
            </div>
            <div className="container_libraryPage">
                <h1 className="title_container_LibraryPage">
                    <b><AiOutlineLike/></b>
                    <b>Liked Videos</b>
                </h1>
                <div className="container_videoList_LibraryPage">
                    <WHLvideoList page={"Liked Videos"} currentUser={currentUser?.result?._id} videoList={vids} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Library