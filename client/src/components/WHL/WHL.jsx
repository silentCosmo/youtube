import React from 'react'
import './WHL.css'
import LeftSideBar from '../Leftsidebar/LeftSideBar'
import WHLvideoList from './WHLvideoList'
import { currentUser } from '../../assets/u_db'

function WHL({page,videoList}) {
  return (
    <div className="container_Pages_App">
        <LeftSideBar/>
        <div className="container2_Pages_App">
            <div className="container_whl">
                <div className="box_WHL leftside_whl">
                    <b>Your {page} Shown Here</b>
                    {
                        page === "History" && 
                        <div className="clear_History_btn">Clear History</div>
                    }
                </div>
                <div className="rightSide_whl">
                    <h1>{page}</h1>
                    <div className="whl_list">
                        <WHLvideoList page={page} currentUser={currentUser?.result?._id} videoList={videoList} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WHL