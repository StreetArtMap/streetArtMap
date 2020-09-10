import { combineReducers } from 'redux'
import { user } from './userReducer'
import { arts } from './artsReducer'
import { session } from './sessionReducer'

const rootReducer = combineReducers({
  user,
  arts,
  session
})

export default rootReducer
