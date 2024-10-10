import * as api from "../../api"

export const editComment = (commentData) => async(dispatch)=>{
    try {
        console.log(commentData);
        
        const {id,commentBody} = commentData
        console.log(commentData);
        
        const {data} = await api.editComment(id,commentBody)
        console.log(data);
        
        dispatch({type:"EDIT_COMMENT",payload:data})
        dispatch(getAllComments()) 
    } catch (error) {
        console.log(error);
        
    }
}

export const postComment = (commentData) => async(dispatch)=>{
    try {
        const {data} = await api.postComment(commentData)
        dispatch({type:"POST_COMMENT",payload:data})
        dispatch(getAllComments())
    } catch (error) {
        console.log(error);
        
    }
}

export const deleteComment = (id) => async(dispatch)=>{
    try {
        await api.deleteComment(id)
        dispatch(getAllComments())
    } catch (error) {
        console.log(error);
    }
}

export const getAllComments = ()=> async(dispatch)=>{
    console.log('comt');
    
    try {
        const {data} = await api.getAllComment()
        console.log(data);
        
        dispatch({type:"FETCH_ALL_COMMENTS",payload:data})

    } catch (error) {
        console.log();
        
    }
}