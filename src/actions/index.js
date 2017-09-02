export const ADD_CATEGORY = 'ADD_CATEGORY'
export const ADD_CATEGORIES = 'ADD_CATEGORIES'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_VOTE_COUNT = 'UPDATE_VOTE_COUNT'
export const UPDATE_COMMENT_VOTE_COUNT = 'UPDATE_COMMENT_VOTE_COUNT'
export const INCREMENT_COMMENT_COUNT = 'INCREMENT_COMMENT_COUNT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const EDIT_POST = 'EDIT_POST'
export const NEW_POST_INTENT = 'NEW_POST_INTENT'
export const NEW_COMMENT_INTENT = 'NEW_COMMENT_INTENT'
export const SORT_POST_BY = 'SORT_POST_BY'

export function sortPostBy(by, reverse){
  return {
    type: SORT_POST_BY,
    by: by,
    reverse: reverse
  }
}

export function newPostIntent(intent) {
  return {
    type: NEW_POST_INTENT,
    intent
  }
}

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

export function addCategory(category) {
  return {
    type: ADD_CATEGORY,
    category
  }
}

export function addCategories(categories) {
  return {
    type: ADD_CATEGORIES,
    categories
  }
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post
  }
}

export function deletePost(postId) {
  return {
    type: DELETE_POST,
    postId
  }
}

export function editPost(post) {
  return {
    type: EDIT_POST,
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
