import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostModal from '../PostModal'
import { editPost } from '../../actions'
import * as ReadableAPI from '../../ReadableAPI'

class PostModalEdit extends Component {
  editPost = (title, body, author) => {
    const { post } = this.props
    ReadableAPI.editPost(
      post.id, title, body, author)
      .then(res => this.props.editPost(res))
  }

  doneEditPost() {
    const { post } = this.props
    this.props.editPost({
      ...post,
      'editFlag': false
    })
  }
  
  render() {
    const { post } = this.props
    return (
      <PostModal
        isOpen={post.editFlag}
        onRequestClose={() => this.doneEditPost()}
        title="Edit Post"
        onSubmit={this.editPost}
        defaultTitle={post.title}
        defaultBody={post.body}
        defaultAuthor={post.author}
        defaultCategory={post.category}
      />
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  editPost: (p) => dispatch(editPost(p))
})
const PostModalEditContainer = connect(
  null, mapDispatchToProps)(PostModalEdit)

export default PostModalEditContainer
