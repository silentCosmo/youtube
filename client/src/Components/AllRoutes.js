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
    const router = createBrowserRouter([
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
        
    ])
  return (
    <div>
        <RouterProvider router={router}/>
    </div>
  )
}

export default AllRoutes