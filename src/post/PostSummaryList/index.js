import React from 'react'
import PostSummary from '../PostSummary'

const PostSummaryList = ({ posts }) => (
  <div>
    {posts.map(p => <PostSummary key={p.id} post={p} />)}
  </div>
)

export default PostSummaryList
