import React from 'react'
import WHL from '../../components/WHL/WHL'
import { vids as likedVideoList } from '../../components/video/v_db'

function LikedVideo() {
  return (
    <WHL page={"Liked Video"} videoList={likedVideoList} />
  )
}

export default LikedVideo