import React from 'react'
import CommentVoteContainer from '../CommentVote'

const CommentDownVote = ({ comment }) => (
  <CommentVoteContainer 
    comment={comment} 
    label="Down Vote"
    vote="-1"
    icon="fa fa-chevron-down"
  />
)

export default CommentDownVote
