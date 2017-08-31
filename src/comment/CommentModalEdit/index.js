import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import CommentModal from '../CommentModal'
import { editComment } from '../../actions'
import * as ReadableAPI from '../../ReadableAPI'

class CommentModalEdit extends Component {
  editComment(body, author) {
    const { comment } = this.props
    ReadableAPI.editComment(
      comment.id, author, body)
      .then(res => this.props.editComment(res))
  }

  doneEditComment() {
    const { comment } = this.props
    this.props.editComment({
      ...comment,
      'editFlag': false
    })
  }
  
  render() {
    const { comment } = this.props
    return (
      <CommentModal
        isOpen={comment.editFlag}
        onRequestClose={() => this.doneEditComment()}
        title="Edit Comment"
        onSubmit={(b, a)=>this.editComment(b, a)}
        defaultBody={comment.body}
        defaultAuthor={comment.author}
        defaultCategory={comment.category}
      />
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  editComment: (c) => dispatch(editComment(c))
})
const CommentModalEditContainer = connect(
  null, mapDispatchToProps)(CommentModalEdit)

export default CommentModalEditContainer
