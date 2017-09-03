export const UPDATE_COMMENT_VOTE_COUNT = 'UPDATE_COMMENT_VOTE_COUNT'
export const INCREMENT_COMMENT_COUNT = 'INCREMENT_COMMENT_COUNT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const NEW_COMMENT_INTENT = 'NEW_COMMENT_INTENT'

export function newCommentIntent(intent) {
  return {
    type: NEW_COMMENT_INTENT,
    intent
  }
}

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function deleteComment(comment) {
  return {
    type: DELETE_COMMENT,
    comment
  }
}

export function updateCommentVoteCount(comment, voteCount) {
  return {
    type: UPDATE_COMMENT_VOTE_COUNT,
    comment,
    voteCount
  }
}

export function incrementCommentCount(postId) {
  return {
    type: INCREMENT_COMMENT_COUNT,
    postId
  }
}

export function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment
  }
}
