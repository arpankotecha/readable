import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editComment } from '../CommentActions'

class CommentEdit extends Component {
  editComment(e, comment) {
    e.preventDefault()
    console.log(comment)
    this.props.editComment({
      ...comment,
      "editFlag": true
    })
  }

  doneEditComment = () => {
    this.props.editComment({
      ...this.props.comment,
      "editFlag": false
    })
  }

  render() {
    let { comment, icon } = this.props
    icon = icon ? icon : 'fa fa-edit'

    return (
      <a onClick={(e)=>this.editComment(e, comment)}>
        <span className="icon">
          <i className={icon} />
        </span>
      </a>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  editComment: (p) => dispatch(editComment(p))
})
const CommentEditContainer = connect(
  null, mapDispatchToProps)(CommentEdit)

export default CommentEditContainer
