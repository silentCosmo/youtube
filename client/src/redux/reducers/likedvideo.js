const likedvideoReducer=(state={data:[]},action)=>{
    switch (action.type) {
        case "POST_LIKEDVIDEO":
            return {...state,data:action?.data}
        case "FETCH_LIKEDVIDEO":
            return {...state,data:action?.payload}
        default:
            return state
    }
}
export default likedvideoReducer