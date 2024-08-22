import React from 'react'
import WHL from '../../components/WHL/WHL'
import { vids as watchHistoryList } from '../../components/video/v_db'

function WatchHistory() {
  return (
    <WHL page={"History"} videoList={watchHistoryList}/>
  )
}

export default WatchHistory