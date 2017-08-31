import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import CommentModal from '../CommentModal'

class CommentModalNew extends Component {
  doneNewComment = () => {
  }

  render() {
    const { isOpen, doneNew, onRequestClose, onSubmit } = this.props
    return (
      <CommentModal
        isOpen={isOpen}
        onRequestClose={doneNew}
        title="New Comment"
        onSubmit={this.newComment}
        bodyPlaceholder="Enter a new comment"
        authorPlaceholder="Your name"
        onRequestClose={onRequestClose}
        onSubmit={onSubmit}
      />
    )
  }
}

export default CommentModalNew
