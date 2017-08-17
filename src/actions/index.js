export const ADD_CATEGORY = 'ADD_CATEGORY'
export const ADD_POST = 'ADD_POST'

export function addCategory(category){
  return {
    type: ADD_CATEGORY,
    category
  }
}

export function addPost(post){
  return {
    type: ADD_POST,
    post
  }
}
