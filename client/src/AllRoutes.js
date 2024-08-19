import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Search from './pages/Search/Search'
import VideoPage from './pages/Videopage/VideoPage'

function AllRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/search/:searchquery' element={<Search/>} />
      <Route path='/watch/:vid' element={<VideoPage/>} />
    </Routes>
  )
}

export default AllRoutes