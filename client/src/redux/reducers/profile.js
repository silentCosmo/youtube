const profileReducer=(state=null,action)=>{
    switch (action.type) {
        case "FETCH_USER_UPDATES":
            return action.payload 
        case "UPDATE_WATCH_TIME":
            return {...state,plan:action.payload}
        default:
            return state;
    }
}

export default profileReducer;