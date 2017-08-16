import { ADD_CATEGORY, ADD_POST } from '../actions'
import { combineReducers } from 'redux'

function categories(state=[], action){
  switch(action.type) {
    case ADD_CATEGORY:
      return state.concat(action.category)
    default:
      return state
  }
}

function posts(state=[], action){
  switch(action.type) {
    case ADD_POST:
      return state.concat(action.post)
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts
})
