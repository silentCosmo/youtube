import React from 'react'
import WHL from '../../components/WHL/WHL'
import { useSelector } from 'react-redux'

function WatchHistory() {
  const watchHistoryList = useSelector(state=>state.historyReducer)
  
  return (
    <WHL page={"History"} videoList={watchHistoryList}/>
  )
}

export default WatchHistory