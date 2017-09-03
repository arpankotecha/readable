import { ADD_POST, UPDATE_VOTE_COUNT, 
  EDIT_POST, DELETE_POST, SORT_POST_BY } from '../PostActions'
import { INCREMENT_COMMENT_COUNT, 
  DELETE_COMMENT } from '../../comment/CommentActions'
import sortBy from 'sort-by'

function posts(state=[], action){
  switch(action.type) {
    case ADD_POST:
      return [...state, action.post]
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
    case SORT_POST_BY:
      const reverse = action.reverse ? "-" : ""
      return [...state].sort(sortBy(`${reverse}${action.by}`))
    default:
      return state
  }
}

export default posts
