import React, { Component } from 'react'
import CommentModal from '../CommentModal'

class CommentModalNew extends Component {
  doneNewComment = () => {
  }

  render() {
    const { isOpen, onRequestClose, onSubmit } = this.props
    return (
      <CommentModal
        isOpen={isOpen}
        title="New Comment"
        bodyPlaceholder="Enter a new comment"
        authorPlaceholder="Your name"
        onRequestClose={onRequestClose}
        onSubmit={onSubmit}
      />
    )
  }
}

export default CommentModalNew
