import React from 'react'
import './Home.css'
import LeftSideBar from '../../components/Leftsidebar/LeftSideBar'
import ShowVideoGrid from '../../components/Showvideogrid/ShowVideoGrid'
import { useSelector } from 'react-redux'

function Home() {
  const navList = ['All', 'Coding', 'Java', 'React', 'NodeJs', 'NovaFrame', 'Gaming', 'Science','Film', 'Animation', 'Marvel', 'Avengers']
  const vids = useSelector(state=>state.videoReducer)?.data?.filter(q=>q).sort(()=>Math.random()-0.5);
  /* const vids = [
    {
      _id: 1,
      src: vid,
      title: 'Beach Walk in Wakanda',
      uploader: 'walkyre',
      channel: 'Wakanda Vlogs',
      description: 'A peaceful walk along the whispering waters of Wakanda.'
    },
    {
      _id: 2,
      views:87,
      src: vid,
      title: 'Sunset at Wakanda Beach',
      uploader: 'explorer123',
      channel: 'Travel Diaries',
      description: 'Capturing the stunning sunset views from Wakanda beach.'
    },
    {
      _id: 3,
      views:746,
      src: vid,
      title: 'Hidden Waterfalls of Wakanda',
      uploader: 'natureLover',
      channel: 'Adventure Time',
      description: 'Discovering the hidden waterfalls in the lush forests of Wakanda.'
    },
    {
      _id: 4,
      src: vid1,
      title: 'Wakanda Beach Sunrise Yoga',
      uploader: 'zenMaster',
      channel: 'Wellness Journey',
      description: 'Start your day with a refreshing sunrise yoga session on Wakanda beach.'
    },
    {
      _id: 5,
      views:'3M',
      createdat:'Fri Apr 12 2013 19:08:55 GMT-0500 (CDT)',
      src: vid,
      title: 'Exploring Wakanda\'s Coastal Trails',
      uploader: 'hikerJoe',
      channel: 'Trail Adventures',
      description: 'Join us as we hike through the scenic coastal trails of Wakanda.'
    },
    {
      _id: 6,
      src: vid1,
      title: 'Wakanda Beach Sunrise Yoga',
      uploader: 'zenMaster',
      channel: 'Wellness Journey',
      description: 'Start your day with a refreshing sunrise yoga session on Wakanda beach.'
    },
    {
      _id: 7,
      views:155,
      src: vid,
      title: 'Exploring Wakanda\'s Coastal Trails',
      uploader: 'hikerJoe',
      channel: 'Trail Adventures',
      description: 'Join us as we hike through the scenic coastal trails of Wakanda.'
    },
    {
      _id: 8,
      src: vid,
      title: 'Wakanda Beach Sunrise Yoga',
      uploader: 'zenMaster',
      channel: 'Wellness Journey',
      description: 'Start your day with a refreshing sunrise yoga session on Wakanda beach.'
    },
    {
      _id: 9,
      views:'54K',
      src: vid,
      title: 'Wakanda Beach Sunrise Yoga',
      uploader: 'zenMaster',
      channel: 'Wellness Journey',
      description: 'Start your day with a refreshing sunrise yoga session on Wakanda beach.'
    },
    {
      _id: 0,
      src: vid1,
      title: 'Exploring Wakanda\'s Coastal Trails',
      uploader: 'hikerJoe',
      channel: 'Trail Adventures',
      description: 'Join us as we hike through the scenic coastal trails of Wakanda.'
    }
]; */

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
        <ShowVideoGrid vids={vids} />
      </div>
    </div>
  )
}

export default Home