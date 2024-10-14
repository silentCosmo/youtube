import * as api from '../../api'

export const addHistory = (historyData)=> async(dispatch)=>{
    try {
        const {data} = await api.addHistory(historyData)
        dispatch({type:"POST_HISTORY",data})
        dispatch(getAllHistory())
    } catch (error) {
        console.log(error);
    }
}

export const getAllHistory = ()=> async (dispatch)=>{
    try {
        const {data} = await api.getHistory()
        
        dispatch({type:"FETCH_HISTORY",payload:data})
    } catch (error) {
        console.log(error);
    }
}

export const clearHistory = (historyData)=> async (dispatch)=>{
    try {
        const {uId} = historyData
        await api.delHistory(uId)
        dispatch(getAllHistory())
    } catch (error) {
        console.log();
    }
}