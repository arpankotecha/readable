import React from 'react'

const CommentNew = (props) => (
  <div className="tile is-ancestor">
    <a onClick={props.onClick}>
      Add New Comment
    </a>
  </div>
)

export default CommentNew
