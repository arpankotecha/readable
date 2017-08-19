import { ADD_CATEGORY, ADD_POST, UPDATE_VOTE_COUNT, 
  ADD_COMMENT, UPDATE_COMMENT_VOTE_COUNT, 
  INCREMENT_COMMENT_COUNT } from '../actions'
import { combineReducers } from 'redux'

function comments(state={}, action) {
  const { type, comment } = action

  switch(type){
    case ADD_COMMENT:
      return {
        ...state,
        [comment.parentId]: state[comment.parentId] ? state[comment.parentId].concat([comment]) : [comment]
      }
    case UPDATE_COMMENT_VOTE_COUNT:
      return {
        ...state,
        [comment.parentId]: state[comment.parentId].map(c => c.id == comment.id ? {...c, ['voteScore'] : action.voteCount} : c)
      }
    default:
      return state
  }
}

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
    case INCREMENT_COMMENT_COUNT:
      return state.map((p) => {
        p.comments = p.id === action.postId
          ? p.comments + 1
          : p.comments
        return p
      })
    default:
      return state
  }
}

export default combineReducers({
  comments,
  categories,
  posts
})
