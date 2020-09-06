import { combineReducers } from 'redux'
import { user } from './userReducer'
import { art } from './artReducer'

const rootReducer = combineReducers({
  user,
  art,
})

export default rootReducer
