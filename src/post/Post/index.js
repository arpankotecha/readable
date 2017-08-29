import React, { Component } from 'react'
import Title from '../../app/Title'
import { connect } from 'react-redux'
import CategoryLinksList from 
    '../../category/CategoryLinksListContainer'
import PostDelete from '../PostDelete'
import PostEdit from '../PostEdit'
import PostUpVote from '../PostUpVote'
import PostDownVote from '../PostDownVote'
import { getPost } from '../../ReadableAPI'
import { addPost } from '../../actions'

export class Post extends Component {
  componentWillMount(){
    const { addPost, post, postId } = this.props
    if (!post) {
      getPost(postId)
        .then(res => {console.log(res);addPost(res)})
    }
  }

  render() {
    const { categories, post } = this.props
    return (
      post 
        ?
      <div>
        <Title name={post.category} />
        <CategoryLinksList categories={categories} />
        <h1 className="subtitle is-4">{post.title}</h1>
        <h6 className="subtitle is-6">
        <PostUpVote postId={post.id} />
        {post.voteScore}
        <PostDownVote postId={post.id} />
        <PostEdit post={post} />
        <PostDelete postId={post.id} />
      </h6>
        <body>
          <section className="section">
            {post.body}
          </section>
        </body>
      </div>
        :
      <div>
      </div>
    )
  }
}

const mapStateToProps = (props, ownProps) => {
  const { categories, posts } = props
  const { match } = ownProps
  const post = posts.filter(p => p.id === match.params.id)

  return {
    categories,
    post: post ? post[0] : null,
    postId: match.params.id
  }
}
const mapDispatchToProps = (dispatch) => ({
  addPost: (p) => dispatch(addPost(p))
})


const PostContainer = connect(
  mapStateToProps, mapDispatchToProps)(Post)

export default PostContainer
