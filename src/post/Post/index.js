import React from 'react'
import Title from '../../app/Title'

const Post = ({ match }) => (
  <div>
    <Title name={match.params.id} />
  </div>
)

export default Post
