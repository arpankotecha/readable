import React, { Component } from 'react'
import Title from '../../app/Title'
import { connect } from 'react-redux'
import CategoryLinksList from 
  '../../category/CategoryLinksListContainer'
import PostDelete from '../PostDelete'
import PostEdit from '../PostEdit'
import PostUpVote from '../PostUpVote'
import PostDownVote from '../PostDownVote'
import { addPost } from '../PostActions'
import { addComment, newCommentIntent,
  incrementCommentCount } from '../../comment/CommentActions'
import CommentsList from '../../comment/CommentsList'
import CommentNew from '../../comment/CommentNew'
import CommentModalNew from '../../comment/CommentModalNew'
import PostModalEditContainer from '../PostModalEdit'
import * as ReadableAPI from '../../ReadableAPI'

export class Post extends Component {
  componentDidMount(){
  }

  doneNewComment = () => {
    this.props.newCommentIntent(false)
  }

  newComment = () => {
    this.props.newCommentIntent(true)
  }

  addNewComment = (body, author) => {
    ReadableAPI.addComment(this.props.post.id, author, body)
      .then(res => {
        this.props.addComment(res)
        this.props.incrementCommentCount(this.props.post.id)
        this.doneNewComment()
      })
  }

  render() {
    const { comments, categories, post, newComment } = this.props
    return (
      post 
        ?
      <div>
        <section className="section">
          <Title name={post.category} />
          <CategoryLinksList categories={categories} />
          <h1 className="subtitle is-4">{post.title}
            <div className="subtitle is-6">
              <div>
                {post.author} {post.comments}
                <i className="fa fa-comment-o" />
              </div>
              <PostUpVote postId={post.id} />
              {post.voteScore}
              <PostDownVote postId={post.id} />
              <PostEdit post={post} />
              <PostDelete postId={post.id} />
            </div>
          </h1>
        </section>
        <section className="section">
          {post.body}
        </section>
        <section className="section">
          <CommentNew onClick={this.newComment} />
          <CommentsList comments={comments} />
        </section>
        <CommentModalNew 
          isOpen={newComment}
          onRequestClose={this.doneNewComment}
          onSubmit={this.addNewComment}
        />
        <PostModalEditContainer post={post} />
      </div>
        :
      <div>
      </div>
    )
  }
}

const mapStateToProps = (props, ownProps) => {
  const { comments, categories, posts, appState } = props
  const { match } = ownProps
  const post = posts.filter(p => p.id === match.params.id)

  return {
    categories,
    post: post ? post[0] : null,
    postId: match.params.id,
    comments: comments[match.params.id],
    newComment: appState.newComment
  }
}
const mapDispatchToProps = (dispatch) => ({
  addPost: (p) => dispatch(addPost(p)),
  addComment: (c) => dispatch(addComment(c)),
  newCommentIntent: (intent) => dispatch(newCommentIntent(intent)),
  incrementCommentCount: (pid) => dispatch(incrementCommentCount(pid))
})


const PostContainer = connect(
  mapStateToProps, mapDispatchToProps)(Post)

export default PostContainer
