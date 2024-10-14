import React from 'react'
import ShowVideoList from '../Showvideolist/ShowVideoList'

function WHLvideoList({page,currentUser,videoList}) {
  return (
    <>
    {
        currentUser?(
            <>
                {
                    videoList?.data?.filter(q=>q?.viewer===currentUser).reverse().map(m=>{
                        return(
                                <ShowVideoList videoId={m?.vid} key={m?._id} />
                        )
                    })
                }
            </>
        ):(
            <>
                <h2 style={{color:'whitesmoke'}}> Please Log in to see your {page}</h2>
            </>
        )
    }
    </>
  )
}

export default WHLvideoList