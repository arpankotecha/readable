import { ADD_CATEGORY, ADD_POST, UPDATE_VOTE_COUNT } from '../actions'
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
    case UPDATE_VOTE_COUNT:
      return state.map((p) => {
        p.voteScore = p.id === action.postId 
          ? action.voteCount 
          : p.voteScore
        return p
      })
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts
})
