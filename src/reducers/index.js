import { ADD_CATEGORY, ADD_CATEGORIES, ADD_POST, UPDATE_VOTE_COUNT, 
  ADD_COMMENT, UPDATE_COMMENT_VOTE_COUNT, EDIT_COMMENT,
  INCREMENT_COMMENT_COUNT, DELETE_COMMENT, EDIT_POST,
  DELETE_POST, NEW_POST_INTENT, NEW_COMMENT_INTENT } from '../actions'
import { combineReducers } from 'redux'

function comments(state={}, action) {
  const { type, comment } = action

  switch(type){
    case ADD_COMMENT:
      return {
        ...state,
        [comment.parentId]: state[comment.parentId] 
          ? state[comment.parentId].concat([comment]) 
          : [comment]
      }
    case UPDATE_COMMENT_VOTE_COUNT:
      return {
        ...state,
        [comment.parentId]: state[comment.parentId].map(c => 
          c.id === comment.id 
            ? {...c, 'voteScore': action.voteCount}
            : c)
      }
    case DELETE_COMMENT:
      return {
        ...state,
        [comment.parentId]: state[comment.parentId].filter((c)=>c.id !== action.comment.id)
      }
    case EDIT_COMMENT:
      return {
        ...state,
        [comment.parentId]: state[comment.parentId].map((c)=>(
          c.id === comment.id 
            ? comment
            : c
        ))
      }
    default:
      return state
  }
}

function categories(state=[], action){
  switch(action.type) {
    case ADD_CATEGORIES:
      return state.concat(action.categories)
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
        return {
          ...p,
          "voteScore": p.id === action.postId 
            ? action.voteCount 
            : p.voteScore
        }
      })
    case INCREMENT_COMMENT_COUNT:
      return state.map((p) => {
        return {
          ...p,
          "comments": p.id === action.postId
            ? p.comments + 1
            : p.comments
        }
      })
    case DELETE_POST:
      return state.filter((p) => p.id !== action.postId)
    case DELETE_COMMENT:
      return state.map((p) => {
        return {
          ...p,
          "comments" : p.id === action.comment.parentId
            ? p.comments - 1
            : p.comments
        }
      })
    case EDIT_POST:
      return state.map(p => (
        action.post.id === p.id
          ? action.post
          : p
      ))
    default:
      return state
  }
}

function appState(state={}, action){
  switch(action.type){
    case NEW_COMMENT_INTENT:
      return {
        ...state,
        'newComment': action.intent
      }
    default:
      return state
  }
}

export default combineReducers({
  comments,
  categories,
  posts,
  appState
})
