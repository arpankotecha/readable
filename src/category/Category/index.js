import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Title from '../../app/Title'
import * as postActions from '../../post/PostActions'
import CategoryLinksList from '../CategoryLinksListContainer'
import PostSummaryList from '../../post/PostSummaryList'
import NewPostLink from '../../post/NewPostLink'
import PostModalNew from '../../post/PostModalNew'
import * as ReadableAPI from '../../ReadableAPI'
import SortPostBy from '../../post/PostSortyByScore'

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
    const { categories, posts, category, newPost,
        sortPostBy, reverse } = this.props
    return (
      <div>
        <Link to="/">
          <Title name={category} />
        </Link>
        <div className="tile is-ancestor">
          <div className="tile">
            <CategoryLinksList categories={categories} />
          </div>
          <div className="breadcrumb is-right">
            <SortPostBy 
              by="voteScore" 
              sortByAction={sortPostBy} 
              reverse={reverse}
              label="Votes"
            />
            <SortPostBy 
              by="timestamp" 
              sortByAction={sortPostBy} 
              reverse={reverse}
              label="Date"
            />
          </div>
        </div>
        <PostSummaryList posts={posts} />
        <NewPostLink onClick={this.newPost} />
        <PostModalNew
          isOpen={newPost}
          onRequestClose={this.doneNewPost}
          onSubmit={this.addNewPost}
          categories={categories}
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
    newPost: appState.newPost,
    reverse: appState.reverse
  }
}
const CategoryContainer = connect(
  mapStateToProps, postActions)(Category)

export default CategoryContainer
