export const ADD_CATEGORY = 'ADD_CATEGORY'
export const ADD_POST = 'ADD_POST'
export const UPDATE_VOTE_COUNT = 'UPDATE_VOTE_COUNT'
export const UPDATE_COMMENT_VOTE_COUNT = 'UPDATE_COMMENT_VOTE_COUNT'
export const ADD_COMMENT = 'ADD_COMMENT'

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function addCategory(category) {
  return {
    type: ADD_CATEGORY,
    category
  }
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post
  }
}

export function updateVoteCount(postId, voteCount) {
  return {
    type: UPDATE_VOTE_COUNT,
    postId,
    voteCount
  }
}

export function updateCommentVoteCount(comment, voteCount) {
  return {
    type: UPDATE_COMMENT_VOTE_COUNT,
    comment,
    voteCount
  }
}
