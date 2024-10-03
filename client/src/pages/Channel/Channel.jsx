import React from 'react'
import {useParams} from 'react-router-dom'
import LeftSideBar from '../../components/Leftsidebar/LeftSideBar'
import DescribeChannel from './DescribeChannel'
import ShowVideoGrid from '../../components/Showvideogrid/ShowVideoGrid'
import { useSelector } from 'react-redux'

function Channel({setEditCreateChannelBtn,setVideoUploadPage}) {
  const {cid} = useParams()
  const vids = useSelector(state=>state.videoReducer)?.data.filter(q=>q?.channel===cid)
  return (
    <div className="container_Pages_App">
      <LeftSideBar/>
      <div className="container2_Pages_App">
        <DescribeChannel cid={cid} setVideoUploadPage={setVideoUploadPage} setEditCreateChannelBtn={setEditCreateChannelBtn} />
        <ShowVideoGrid vids={vids}/>
      </div>
    </div>
  )
}

export default Channel