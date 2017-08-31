import React from 'react'
import Comment from '../Comment'

const CommentsList = ({ comments }) => (
  <div>
    {comments.map(c => <Comment key={c.id} comment={c} />)}
  </div>
)

export default CommentsList
