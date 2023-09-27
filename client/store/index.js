import { combineReducers } from 'redux'
import { authReducer } from './reducers/authReducer'
import { chatAppReducer } from './reducers/chatAppReducer'
import { chatExpandReducer } from './reducers/chatstyleReducer'
const rootReducer = combineReducers({
  auth: authReducer,
  chatApp: chatAppReducer,
  chatReducerStyle: chatExpandReducer,

})

export default rootReducer
