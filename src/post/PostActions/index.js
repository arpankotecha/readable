export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_VOTE_COUNT = 'UPDATE_VOTE_COUNT'
export const EDIT_POST = 'EDIT_POST'
export const NEW_POST_INTENT = 'NEW_POST_INTENT'
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
