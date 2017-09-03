import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as ReadableAPI from '../../ReadableAPI'
import { deleteComment } from '../CommentActions'

class CommentDelete extends Component {
  deleteComment(comment) {
    ReadableAPI.deleteComment(comment.id)
      .then(res => this.props.deleteComment(comment))
  }

  render() {
    let { icon } = this.props;
    icon = icon ? icon : 'fa fa-trash'
    return (
      <a onClick={(e)=>this.deleteComment(this.props.comment)}>
        <span className="icon">
          <i className={icon} />
        </span>
      </a>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteComment: (cid) => dispatch(deleteComment(cid))
})
const CommentDeleteContainer = connect(
  null, mapDispatchToProps)(CommentDelete)

export default CommentDeleteContainer
