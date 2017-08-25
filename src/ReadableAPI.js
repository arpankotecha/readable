import uuidv4 from 'uuid'
const api = "http://localhost:5001"

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Authorization': token
}

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

export const getComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())

export const vote = (type, postId, v) =>
  fetch(`${api}/${type}/${postId}`,{
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: v })
  }).then(res => res.json())

export const upVote = (postId) =>
  vote("posts", postId, 'upVote')

export const downVote = (postId) =>
  vote("posts", postId, 'downVote')

export const upCommentVote = (commentId) =>
  vote("comments", commentId, 'upVote')

export const downCommentVote = (commentId) =>
  vote("comments", commentId, 'downVote')

export const addComment = (postId, author, comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'id': uuidv4(),
      'timestamp': Date.now(),
      'body': comment,
      'author': author,
      'parentId': postId
    })
  }).then(res => res.json())

export const editComment = (commentId, author, comment) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'timestamp': Date.now(),
      'body': comment,
      'author': author
    })
  }).then(res => res.json())

export const editPost = (postId, title, body, author) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'title': title,
      'body': body,
      'author': author
    })
  }).then(res => res.json())

export const addPost = (title, body, author, category) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'id': uuidv4(),
      'timestamp': Date.now(),
      'title': title,
      'body': body,
      'author': author,
      'category': category,
    })
  }).then(res => res.json())

export const deletePost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers
  })

export const deleteComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`,{
    method: 'DELETE',
    headers
  }).then(res=>res.json())
