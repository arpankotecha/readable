import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as ReadableAPI from '../../ReadableAPI'
import { editPost } from '../../actions'
import { Redirect } from 'react-router'

class PostEdit extends Component {
  editPost(post) {
    this.props.editPost({
      ...post,
      "editFlag": true
    })
  }

  render() {
    const { post } = this.props
    const { id, editFlag, category } = post
    return (
      editFlag
        ? <Redirect push to={`/${category}/${id}/edit`} />
      : <a onClick={(e)=>this.editPost(post)}>
          <span className="icon">
            <i className={this.props.icon} />
          </span>
        </a>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  editPost: (p) => dispatch(editPost(p))
})
const PostEditContainer = connect(
  null, mapDispatchToProps)(PostEdit)

export default PostEditContainer
