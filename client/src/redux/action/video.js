import * as api from "../../api"

export const uploadVideo = (videoData)=> async(dispatch)=>{
    
    try {
        const {fileData, fileOption} = videoData;
        const {data} = await api.uploadVideo(fileData,fileOption)
        dispatch({type:'POST_VIDEO',data})
        dispatch(getAllVideo())
    } catch (error) {
        alert(error)
    }
}

export const getAllVideo = ()=> async(dispatch)=>{
    try {
        const {data} = await api.getVideos()
        dispatch({type:'FETCH_ALL_VIDEOS',payload:data})
    } catch (error) {
        console.log(error);
    }
}

export const likeVideo = (likeData)=> async (dispatch)=>{
    
    try {
        const {id,like} = likeData;
        const {data} = await api.videoLikes(id,like)
        dispatch({type:'POST_LIKE_VIDEO',payload:data})
        dispatch(getAllVideo())
    } catch (error) {
        console.log(error);
    }
}

export const viewVideo = (viewData)=> async(dispatch)=>{
    try {
        const {id} = viewData;
        const {data} = await api.videoViews(id)
        dispatch({type:"POST_VIEWS",data})
        dispatch(getAllVideo())
    } catch (error) {
        
    }
}

export const deleteVideo = (id) => async (dispatch) => {
    try {
      await api.deleteVideo(id);
      dispatch({ type: "DELETE_VIDEO", payload: id });
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };