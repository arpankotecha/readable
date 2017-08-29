import React from 'react'
import PostVoteContainer from '../PostVote'

const PostUpVote = ({ postId }) => (
  <PostVoteContainer 
    postId={postId} 
    label="Up Vote"
    vote="1"
    icon="fa fa-chevron-up"
  />
)

export default PostUpVote
