import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editPost } from '../PostActions'

class PostEdit extends Component {
  editPost(post) {
    this.props.editPost({
      ...post,
      "editFlag": true
    })
  }

  render() {
    let { post, icon } = this.props
    icon = icon ? icon : 'fa fa-edit'

    return (
      <a onClick={(e)=>this.editPost(post)}>
        <span className="icon">
          <i className={icon} />
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
