const commentReducer = (state={data:null},action)=>{
    switch (action.type) {
        case "POST_COMMENT":
            return {...state};
        case 'POST_LIKE_COMMENT':
            return {...state}
        case "EDIT_COMMENT":
            return {...state}
        case "FETCH_ALL_COMMENTS":
            return {...state,data:action.payload}
        default:
            return state;
    }
}

export default commentReducer