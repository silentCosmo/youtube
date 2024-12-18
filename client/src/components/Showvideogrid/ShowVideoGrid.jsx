import React from 'react'
import './ShowVideoGrid.css'
import ShowVideo from '../Showvideo/ShowVideo'

function ShowVideoGrid({vids, opt}) {
    //console.log(vids);
    
  return (
    <div className="Container_ShowVideoGrid">
        {
            vids?.reverse().map(vi=>{
                return(
                    <div key={vi._id} className="video_box_App">
                        <ShowVideo vid={vi} opt={opt} />
                    </div>
                )
            })
        }
    </div>
  )
}

export default ShowVideoGrid