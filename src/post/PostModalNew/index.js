import React, { Component } from 'react'
import PostModal from '../PostModal'

class PostModalNew extends Component {
  render() {
    const { isOpen, onRequestClose, onSubmit, categories } = this.props
    return (
      <PostModal
        isOpen={isOpen}
        title="New Post"
        bodyPlaceholder="Enter a new post"
        authorPlaceholder="Your name"
        categoryPlaceholder="Category"
        titlePlaceholder="Title"
        onRequestClose={onRequestClose}
        onSubmit={onSubmit}
        categories={categories}
      />
    )
  }
}

export default PostModalNew
