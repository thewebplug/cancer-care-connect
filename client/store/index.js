import { combineReducers } from 'redux'
import { authReducer } from './reducers/authReducer'
import { chatAppReducer, currentFriendReducer } from './reducers/chatAppReducer'
import { chatExpandReducer } from './reducers/chatstyleReducer'
const rootReducer = combineReducers({
  auth: authReducer,
  chatApp: chatAppReducer,
  chatReducerStyle: chatExpandReducer,
  currentFriend: currentFriendReducer,

})

export default rootReducer
