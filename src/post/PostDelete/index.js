import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as ReadableAPI from '../../ReadableAPI'
import { deletePost } from '../PostActions'

class PostDelete extends Component {
  deletePost(postId) {
    ReadableAPI.deletePost(postId)
      .then(res => this.props.deletePost(postId))
  }

  render() {
    let { icon } = this.props;
    icon = icon ? icon : 'fa fa-trash'
    return (
      <a onClick={(e)=>this.deletePost(this.props.postId)}>
        <span className="icon">
          <i className={icon} />
        </span>
      </a>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  deletePost: (pid) => dispatch(deletePost(pid))
})
const PostDeleteContainer = connect(
  null, mapDispatchToProps)(PostDelete)

export default PostDeleteContainer
