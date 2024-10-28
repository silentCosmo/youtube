const profileReducer=(state=null,action)=>{
    switch (action.type) {
        case "FETCH_USER_UPDATES":
            return action.payload 
        default:
            return state;
    }
}

export default profileReducer;