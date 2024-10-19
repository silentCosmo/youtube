import React from 'react'
import {useParams} from 'react-router-dom'
import LeftSideBar from '../../components/Leftsidebar/LeftSideBar'
import DescribeChannel from './DescribeChannel'
import ShowVideoGrid from '../../components/Showvideogrid/ShowVideoGrid'
import { useSelector } from 'react-redux'

function Channel({setEditCreateChannelBtn,setVideoUploadPage, isLoggedIn}) {
  const {cid} = useParams()
  const vids = useSelector(state=>state.videoReducer)?.data?.filter(q=>q?.channel===cid)

  return (
    <div className="container_Pages_App">
      <LeftSideBar/>
      <div className="container2_Pages_App">
        {isLoggedIn?
          <><DescribeChannel cid={cid} setVideoUploadPage={setVideoUploadPage} setEditCreateChannelBtn={setEditCreateChannelBtn} />
          <ShowVideoGrid vids={vids} opt={true} /></>:
          <div className="notify_signin_container">
          <p className="notify_signin_channel">Please sign in to see your channel</p>
        </div>        
        }
      </div>
    </div>
  )
}

export default Channel