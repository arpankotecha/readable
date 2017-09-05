import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostModal from '../PostModal'
import { editPost } from '../PostActions'
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
    const { categories, post } = this.props
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
        categories={categories}
      />
    )
  }
}
const mapStateToProps = ({ categories }) => ({
  categories
})
const PostModalEditContainer = connect(
  mapStateToProps, { editPost })(PostModalEdit)

export default PostModalEditContainer
