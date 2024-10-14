import {combineReducers} from 'redux'
import authReducer from './auth'
import currentUserReducer from './currentuser'
import channelReducer from './chanel'
import videoReducer from './video'
import commentReducer from './comment'
import historyReducer from './history'

export default combineReducers({
    authReducer,
    currentUserReducer,
    channelReducer,
    videoReducer,
    commentReducer,
    historyReducer
})