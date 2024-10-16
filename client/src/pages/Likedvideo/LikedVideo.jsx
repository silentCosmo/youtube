import React from 'react'
import WHL from '../../components/WHL/WHL'
import { useSelector } from 'react-redux'

function LikedVideo() {
  const likedVideoList = useSelector((state)=>state.likedvideoReducer)
  console.log(likedVideoList);
  return (
    <WHL page={"Liked Video"} videoList={likedVideoList} />
  )
}

export default LikedVideo