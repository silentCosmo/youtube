import React from 'react'
import WHL from '../../components/WHL/WHL'
import { useSelector } from 'react-redux'


function WhatchLater() {
  const watchlaterList = useSelector((state)=>state.watchlaterReducer)
  return (
    <WHL page={"Watch Later"} videoList={watchlaterList} />
  )
}

export default WhatchLater