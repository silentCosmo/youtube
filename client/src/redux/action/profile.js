import * as api from "../../api"

export const updatePoints = (id)=> async(dispatch)=>{
    try {
        await api.updatePoint(id)
        dispatch(getUserUpdates(id))
    } catch (error) {
        console.log(error.response);
    }
}
export const getUserUpdates = (id)=> async(dispatch)=>{
    try {
        const {data} = await api.getUserDetails(id)
        // eslint-disable-next-line
        const {token, ...rest} = data
        dispatch({type:"FETCH_USER_UPDATES",payload:data})
        
    } catch (error) {
        console.log('newUD: ', error);
        
    }
}

export const updateWatchTime = (watchTime)=> async(dispatch)=>{
    console.log(!watchTime.id);
    if(watchTime.id){
    try {
        const result = await api.updateWatchtime(watchTime)
        dispatch({type:"UPDATE_WATCH_TIME",payload:result.data})
    } catch (error) {
        console.log('watch time error: ', error);
        
    }
    }else{
        console.log('user not logged in');
    }
}