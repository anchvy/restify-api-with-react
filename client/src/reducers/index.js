import { combineReducers } from 'redux'

import article from './article'
import auth from './auth'

export default combineReducers({
  article,
  auth,
})
