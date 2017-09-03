import comments from '../../comment/CommentReducers'
import categories from '../../category/CategoryReducers'
import posts from '../../post/PostReducers'
import { combineReducers } from 'redux'
import { NEW_COMMENT_INTENT } from '../../comment/CommentActions'
import { NEW_POST_INTENT, SORT_POST_BY } from '../../post/PostActions'

function appState(state={}, action){
  switch(action.type){
    case NEW_COMMENT_INTENT:
      return {
        ...state,
        'newComment': action.intent
      }
    case NEW_POST_INTENT:
      return {
        ...state,
        'newPost': action.intent
      }
    case SORT_POST_BY:
      return {
        ...state,
        'reverse': action.reverse ? false : true
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
