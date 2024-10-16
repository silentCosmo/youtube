import * as api from '../../api'

export const addWatchLater = (watchlaterData)=> async(dispatch)=>{
    try {
        const {data} = await api.addWatchlater(watchlaterData)
        dispatch({type:"POST_WATCHLATER",data})
        dispatch(getWatchLater())
    } catch (error) {
        console.log(error);
    }
}

export const getWatchLater = () => async(dispatch)=>{
    try {
        const {data} = await api.getWatchlater()
        dispatch({type:"FETCH_WATCHLATER", payload:data})
    } catch (error) {
        console.log(error);
    }
}

export const deleteWatchLater =(watchlaterData)=> async(dispatch)=>{
    
    try {
        const {vid,viewer} = watchlaterData
        await api.deleteWatchlater(vid,viewer)
        dispatch(getWatchLater())
    } catch (error) {
        console.log(error);
    }
}