import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Title from '../../app/Title'
import CategoryLinksList from '../CategoryLinksListContainer'
import PostSummaryList from '../../post/PostSummaryList'

const Category = ({ categories, posts, category }) => (
  <div>
    <Title name={category} />
    <CategoryLinksList categories={categories} />
    <PostSummaryList posts={posts} />
    <div className="new-post">
      <Link to="/newPost" className="new-post" />
    </div>
  </div>
)


const mapStateToProps = ({ categories, posts }, { match }) => {
  const { params } = match
  posts = params.cat
    ? posts.filter(p => p.category === params.cat)
    : posts

  return {
    categories,
    posts,
    category: params.cat
  }
}
const CategoryContainer = connect(
  mapStateToProps)(Category)

export default CategoryContainer
