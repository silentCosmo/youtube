import * as api from '../../api'

export const addLikedVideo = (likedvideoData)=> async(dispatch)=>{
    try {
        const {data} = await api.addLikedvideo(likedvideoData)
        dispatch({type:"POST_LIKEDVIDEO",data})
        dispatch(getLikedVideo())
    } catch (error) {
        console.log(error);
    }
}

export const getLikedVideo = () => async(dispatch)=>{
    try {
        const {data} = await api.getLikedvideo()
        
        dispatch({type:"FETCH_LIKEDVIDEO", payload:data})
    } catch (error) {
        console.log(error);
    }
}

export const deleteLikedVideo =(likedvideoData)=> async(dispatch)=>{
    try {
        const {vid,viewer} = likedvideoData
        await api.deleteLikedvideo(vid,viewer)
        dispatch(getLikedVideo())
    } catch (error) {
        console.log(error);
    }
}