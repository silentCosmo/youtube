import React from 'react'
//import { vids } from '../video/v_db'
import ShowVideo from '../Showvideo/ShowVideo'
import { useSelector } from 'react-redux'

function ShowVideoList({videoId}) {
    const vids = useSelector(state=>state.videoReducer)
  return (
    <div className="Container_ShowVideoGrid">
        {
            vids.filter(q=>q._id===videoId).map(vi=>{
                return(
                    <div className="video_box app" key={vi._id}>
                        <ShowVideo vid={vi} />
                    </div>
                )
            })
        }
    </div>
  )
}

export default ShowVideoList