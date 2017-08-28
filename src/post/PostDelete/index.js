import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as ReadableAPI from '../../ReadableAPI'
import { deletePost } from '../../actions'

class PostDelete extends Component {
  deletePost(postId) {
    ReadableAPI.deletePost(postId)
      .then(res => this.props.deletePost(postId))
  }

  render() {
    return (
      <a onClick={(e)=>this.deletePost(this.props.postId)}>
        <span className="icon">
          <i className={this.props.icon} />
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
