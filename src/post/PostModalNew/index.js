import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import PostModal from '../PostModal'

class PostModalNew extends Component {
  render() {
    const { isOpen, doneNew, onRequestClose, onSubmit } = this.props
    return (
      <PostModal
        isOpen={isOpen}
        onRequestClose={doneNew}
        title="New Post"
        onSubmit={this.newPost}
        bodyPlaceholder="Enter a new post"
        authorPlaceholder="Your name"
        categoryPlaceholder="Category"
        onRequestClose={onRequestClose}
        onSubmit={onSubmit}
      />
    )
  }
}

export default PostModalNew
