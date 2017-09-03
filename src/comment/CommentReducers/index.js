import { ADD_COMMENT, UPDATE_COMMENT_VOTE_COUNT, 
  EDIT_COMMENT, DELETE_COMMENT } from '../CommentActions'

function comments(state={}, action) {
  const { type, comment } = action

  switch(type){
    case ADD_COMMENT:
      return {
        ...state,
        [comment.parentId]: state[comment.parentId] 
          ? [...state[comment.parentId], comment]
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

export default comments
