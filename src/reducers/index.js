import { combineReducers } from 'redux'
import { user } from './userReducer'
import { arts } from './artsReducer'

const rootReducer = combineReducers({
  user,
  arts,
})

export default rootReducer
