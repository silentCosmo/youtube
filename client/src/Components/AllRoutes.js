import React, { useState } from 'react'
import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
  } from "react-router-dom";
import Home from '../Pages/Home';
import Shorts from '../Pages/Shorts/Shorts';
import Navbar from './Navbar/Navbar';
import LeftSideBar from './LeftSideBar/LeftSideBar';
import DrawerSidebar from './LeftSideBar/DrawerSidebar';
import Subscriptions from '../Pages/Subscriptions/Subscriptions'
import YourChannel from '../Pages/YourChannel/YourChannel';
import WatchHistory from '../Pages/WatchHistory/WatchHistory';
import YourVideos from '../Pages/YourVideos/YourVideos';
import LikedVideos from '../Pages/LikedVideos/LikedVideos';
import YourClips from '../Pages/YourClips/YourClips';

function AllRoutes() {
  const [sideBarToggler,setSideBarToggler] = useState({display:"none"});
  const toggleSidebar =()=>{
    console.log("toggle1");
    if(sideBarToggler.display==="none"){
      setSideBarToggler({display:"block"})
      console.log("flex");
    }else{
      setSideBarToggler({display:"none"})
      console.log("none");
    }
  }

  /* ROUTING */
    /* const router = createBrowserRouter([
      {
        path:"/",
        element:<><Navbar toggleSidebar={toggleSidebar}/>
        <DrawerSidebar/>
          {
            <LeftSideBar toggleSidebar={toggleSidebar} sideBarToggler={sideBarToggler}/>
          }
        <Outlet/></>,
        children:[
          {
            path:"/",
            element:<Home/>,
        },
        {
          path:'/shorts',
          element:<Shorts/>, 
        },
        ]
      },
        
    ]) */

    const router = createBrowserRouter([
      {
        path: "/",
        element: (
          <div className='route-container'>
            <Navbar toggleSidebar={toggleSidebar} />
            <div className="main-content"> {/* Added wrapper for content */}
              <DrawerSidebar /> {/* Position sidebar after content */}
             { console.log(sideBarToggler.display)  } 
              {<LeftSideBar toggleSidebar={toggleSidebar} sideBarToggler={sideBarToggler} />}
              <Outlet />
            </div>
              </div>
        ),
        children: [
          { path: "/", element: <Home /> },
          { path: "/shorts", element: <Shorts /> },
          { path: "/subscriptions", element: <Subscriptions/>},
          { path: "/your-channel", element: <YourChannel/>},
          { path: "/watch-history", element: <WatchHistory/>},
          { path: "/your-videos", element: <YourVideos/>},
          { path: "/your-clips", element: <YourClips/>},
          { path: "/liked-videos", element: <LikedVideos/>},
        ],
      },
    ])

  return (
    <div>
        <RouterProvider router={router}/>
    </div>
  )
}

export default AllRoutes