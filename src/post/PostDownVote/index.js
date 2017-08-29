import React from 'react'
import PostVoteContainer from '../PostVote'

const PostDownVote = ({ postId }) => (
  <PostVoteContainer 
    postId={postId} 
    label="Down Vote"
    vote="-1"
    icon="fa fa-chevron-down"
  />
)

export default PostDownVote
