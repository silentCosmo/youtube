import React from 'react'
import { vids } from '../video/v_db'
import ShowVideo from '../Showvideo/ShowVideo'

function ShowVideoList({videoId}) {
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