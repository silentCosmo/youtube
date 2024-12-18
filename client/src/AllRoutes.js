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
import NotFound from './NotFound'
import Profile from './pages/Profile/Profile'

function AllRoutes({setEditCreateChannelBtn,setVideoUploadPage, isLoggedIn}) {
  
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/liked' element={<LikedVideo/>} />
      <Route path='/profile/:id' element={isLoggedIn?<Profile/>:<NotFound/>} />
      <Route path='/shorts' element={<Home/>} />
      <Route path='/feed/you' element={<Library/>} />
      <Route path='/yourvideo' element={<YourVideo/>} />
      <Route path='/watchlater' element={<WhatchLater/>} />
      <Route path='/watch/:vid' element={<VideoPage/>} />
      <Route path='/feed/history' element={<WatchHistory/>} />
      <Route path='/channel/:cid' element={<Channel setEditCreateChannelBtn={setEditCreateChannelBtn} setVideoUploadPage={setVideoUploadPage} isLoggedIn={isLoggedIn} />} />
      <Route path='/feed/subscriptions' element={<Home/>} />
      <Route path='/search/:searchquery' element={<Search/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AllRoutes