import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as ReadableAPI from '../../ReadableAPI'
import { deletePost } from '../PostActions'

class PostDelete extends Component {
  deletePost = (event) => {
    const { postId } = this.props
    ReadableAPI.deletePost(postId)
      .then(res => this.props.deletePost(postId))
  }

  render() {
    let { icon } = this.props;
    icon = icon ? icon : 'fa fa-trash'
    return (
      <a onClick={this.deletePost}>
        <span className="icon">
          <i className={icon} />
        </span>
      </a>
    )
  }
}

const PostDeleteContainer = connect(
  null, { deletePost })(PostDelete)

export default PostDeleteContainer
