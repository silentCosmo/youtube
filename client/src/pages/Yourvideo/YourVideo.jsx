import React from 'react'
import './YourVideo.css'
import LeftSideBar from '../../components/Leftsidebar/LeftSideBar'
import ShowVideoGrid from '../../components/Showvideogrid/ShowVideoGrid'
import { vids as yourVideoList } from '../../components/video/v_db'
import { useSelector } from 'react-redux'

function YourVideo() {
    const currentUser = useSelector(state=>state.currentUserReducer);
  return (
    <div className="container_Pages_App">
        <LeftSideBar/>
        <div className="container2_Pages_App">
            <div className="container_yourvideo">
                <h1>Your Video</h1>
                {
                    currentUser?(<><ShowVideoGrid vids={yourVideoList}/></>):(<><h1>Plase Login to see your uploaded video list</h1></>)
                }
            </div>
        </div>
    </div>
  )
}

export default YourVideo