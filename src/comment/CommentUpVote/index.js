import React from 'react'
import CommentVoteContainer from '../CommentVote'

const CommentUpVote = ({ comment }) => (
  <CommentVoteContainer 
    comment={comment} 
    label="Up Vote"
    vote="1"
    icon="fa fa-chevron-up"
  />
)

export default CommentUpVote
