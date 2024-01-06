import React from 'react'
import './Home.css'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <div className="container_pages_app">
        <Outlet/>
      <div className="container_pages">
        <h1 className='ht'>Home</h1>
      </div>
    </div>
  )
}

export default Home