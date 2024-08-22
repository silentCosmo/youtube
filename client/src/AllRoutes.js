import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Search from './pages/Search/Search'
import VideoPage from './pages/Videopage/VideoPage'
import Channel from './pages/Channel/Channel'
import Library from './pages/Library/Library'
import LikedVideo from './pages/Likedvideo/LikedVideo'
import WatchHistory from './pages/Whatchhistory/WatchHistory'
import WhatchLater from './pages/Watchlater/WhatchLater'
import YourVideo from './pages/Yourvideo/YourVideo'

function AllRoutes({setEditCreateChannelBtn,setVideoUploadPage}) {
  
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/search/:searchquery' element={<Search/>} />
      <Route path='/watch/:vid' element={<VideoPage/>} />
      <Route path='/feed/you' element={<Library/>} />
      <Route path='/liked' element={<LikedVideo/>} />
      <Route path='/watchlater' element={<WhatchLater/>} />
      <Route path='/yourvideo' element={<YourVideo/>} />
      <Route path='/feed/history' element={<WatchHistory/>} />
      <Route path='/channel/:cid' element={<Channel setEditCreateChannelBtn={setEditCreateChannelBtn} setVideoUploadPage={setVideoUploadPage} />} />
    </Routes>
  )
}

export default AllRoutes