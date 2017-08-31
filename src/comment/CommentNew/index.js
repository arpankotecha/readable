import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { newCommentIntent } from '../../actions'

class CommentNew extends Component {
  render() {
    return (
      <div className="tile is-ancestor">
        <a onClick={this.props.onClick}>
          Add New Comment
        </a>
      </div>
    )
  }
}

export default CommentNew
