import React from 'react'
import { vids as watchlaterList } from '../../components/video/v_db'
import WHL from '../../components/WHL/WHL'


function WhatchLater() {
  return (
    <WHL page={"Watch Later"} videoList={watchlaterList} />
  )
}

export default WhatchLater