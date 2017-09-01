import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Title from '../../app/Title'
import { newPostIntent, addPost } from '../../actions'
import CategoryLinksList from '../CategoryLinksListContainer'
import PostSummaryList from '../../post/PostSummaryList'
import NewPostLink from '../../post/NewPostLink'
import PostModalNew from '../../post/PostModalNew'
import * as ReadableAPI from '../../ReadableAPI'

class Category extends Component {
  newPost = () => {
    this.props.newPostIntent(true)
  }

  doneNewPost = () => {
    this.props.newPostIntent(false)
  }

  addNewPost = (title, body, author, category) => {
    ReadableAPI.addPost(title, body, author, category)
      .then(res => this.props.addPost(res))
      .then(res => this.doneNewPost())
  }

  render() {
    const { categories, posts, category, newPost } = this.props
    return (
      <div>
        <Title name={category} />
        <CategoryLinksList categories={categories} />
        <PostSummaryList posts={posts} />
        <NewPostLink onClick={this.newPost} />
        <PostModalNew
          isOpen={newPost}
          onRequestClose={this.doneNewPost}
          onSubmit={this.addNewPost}
        />
      </div>
    )
  }
}


const mapStateToProps = (
  { categories, posts, appState }, 
  { match }) => {
  const { params } = match
  posts = params.cat
    ? posts.filter(p => p.category === params.cat)
    : posts

  return {
    categories,
    posts,
    category: params.cat,
    newPost: appState.newPost
  }
}
const mapDispatchToProps = (dispatch) => ({
  newPostIntent: (intent) => dispatch(newPostIntent(intent)),
  addPost: (p) => dispatch(addPost(p))
})
const CategoryContainer = connect(
  mapStateToProps, mapDispatchToProps)(Category)

export default CategoryContainer
