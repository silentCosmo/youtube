import React from 'react'
import {useParams} from 'react-router-dom'
import LeftSideBar from '../../components/Leftsidebar/LeftSideBar'
import DescribeChannel from './DescribeChannel'
import ShowVideoGrid from '../../components/Showvideogrid/ShowVideoGrid'
import {vids} from '../../components/video/v_db'
function Channel({setEditCreateChannelBtn,setVideoUploadPage}) {
  
  const {cid} = useParams()
  return (
    <div className="container_Pages_App">
      <LeftSideBar/>
      <div className="container2_Pages_App">
        <DescribeChannel cid={cid} setVideoUploadPage={setVideoUploadPage} setEditCreateChannelBtn={setEditCreateChannelBtn} />
        {/* <ShowVideoGrid vids={vids}/> */}
      </div>
    </div>
  )
}

export default Channel