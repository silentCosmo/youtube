import React from 'react'
import './Home.css'
import LeftSideBar from '../../components/Leftsidebar/LeftSideBar'

function Home() {
  const navList = ['All', 'Coding', 'Java', 'React', 'NodeJs', 'NovaFrame', 'Gaming', 'Science','Film', 'Animation', 'Marvel', 'Avengers']
  return (
    <div className="container_Pages_App">
      <LeftSideBar/>
      <div className="container2_Pages_App">
        <div className="navigation_Home">
          {
            navList.map((navItem,index)=>{
              return(
                <p key={index} className="btn_nav_home">{navItem}</p>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Home