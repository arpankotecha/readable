import React from 'react'
import CommentDownVote from '../CommentDownVote'
import CommentUpVote from '../CommentUpVote'
import CommentDelete from '../CommentDelete'
import CommentEdit from '../CommentEdit'
import CommentModalEditContainer from '../CommentModalEdit'

const Comment = ({ comment }) => (
  <div className="tile is-ancestor is-vertical box">
    <div>
      {comment.body}
    </div>
    <div>
      {comment.author}
    </div>
    <div>
      <CommentUpVote comment={comment} />
      {comment.voteScore}
      <CommentDownVote comment={comment} />
      <CommentEdit comment={comment} />
      <CommentDelete comment={comment} />
    </div>
    <CommentModalEditContainer comment={comment} />
  </div>
)

export default Comment
