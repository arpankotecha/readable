import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { editComment } from '../../actions'
import { Redirect } from 'react-router'
import { getComment } from '../../ReadableAPI.js'
import * as ReadableAPI from '../../ReadableAPI'

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
    const { id, editFlag, category } = comment
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
