import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import '../node_modules/bulma/css/bulma.css'
import * as ReadableAPI from './ReadableAPI'
import { addComment, deleteComment, addCategories, addPost, 
  updateVoteCount, updateCommentVoteCount, 
  incrementCommentCount } from './actions'

class PostSummary extends Component {
  upVote(postId) {
    ReadableAPI.upVote(postId)
      .then(res => this.props.updateVoteCount(postId, res.voteScore))
  }

  downVote(postId) {
    ReadableAPI.downVote(postId)
      .then(res => this.props.updateVoteCount(postId, res.voteScore))
  }

  render() {
    return (
      <div className="notification">
        <Link key={this.props.post.id} to={`/${this.props.post.category}/${this.props.post.id}`}>
          <h2>Title: {this.props.post.title}</h2>
        </Link>
        <h4>Author: {this.props.post.author}</h4>
        <h4>Votes: {this.props.post.voteScore}</h4>
        <h4>Comments: {this.props.post.comments}</h4>
        <div>
          <a onClick={(e)=>this.upVote(this.props.post.id)}>upVote</a>
        </div>
        <div>
          <a onClick={(e)=>this.downVote(this.props.post.id)}>downVote</a>
        </div>
      </div>
    )}}

class PostSummaries extends Component {
  render(){
    return (
      <div className="container is-fluid">
        {
          this.props.posts.map(p => (
            <PostSummary 
              key={p.id} 
              updateVoteCount={this.props.updateVoteCount} 
              post={p} />
            )
          )
        }
      </div>
    )
  }
}
const mapPostSummariesStateToProps = ({ posts }, props) => {
  return { 
    posts: props.category != 'Readable' 
      ? posts.filter(p=>(p.category === props.category)) 
      : posts
  }
}
const mapPostSummariesDispatchToProps = (dispatch) => {
  return {
    updateVoteCount: (pid, v) => {
      dispatch(updateVoteCount(pid, v))
    }
  }
}
const AllPosts = connect(
  mapPostSummariesStateToProps, 
  mapPostSummariesDispatchToProps)(PostSummaries);


class PostComment extends Component {
  upCommentVote(comment) {
    ReadableAPI.upCommentVote(comment.id)
      .then(res => this.props.updateCommentVoteCount(comment, res.voteScore))
  }

  downCommentVote(comment) {
    ReadableAPI.downCommentVote(comment.id)
      .then(res => this.props.updateCommentVoteCount(comment, res.voteScore))
  }

  deleteComment(e, comment) {
    e.preventDefault();
    ReadableAPI.deleteComment(comment.id)
      .then(res => {
        this.props.deleteComment(res)
      })
  }

  render(){
    const c = this.props.comment
    return (
      <div key={c.id} className='notification'>
        <p>{c.body}</p>
        <div className="breadcrumb">
          <label>{c.author}</label>
          <label>Votes: {c.voteScore}</label>
          <a onClick={(e)=>this.upCommentVote(c)}>upVote</a>
          <a onClick={(e)=>this.downCommentVote(c)}>downVote</a>
          <a>Edit</a>
          <a onClick={(e)=>this.deleteComment(e, c)}>Delete</a>
        </div>
      </div>
    )
  }
}
function mapPostCommentDispatchToProps(dispatch) {
  return {
    deleteComment: (c) => dispatch(deleteComment(c)),
    updateCommentVoteCount: (c, v) => dispatch(updateCommentVoteCount(c, v)),
  }
}
function mapPostCommentStateToProps(state, ownProps) {
  return {
    comment : ownProps
  }
}
const CommentContainer = connect(
  null,
  mapPostCommentDispatchToProps)(PostComment);


class AddComment extends Component {
  addComment(e, post) {
    e.preventDefault();
    ReadableAPI.addComment(post.id, this.name.value, this.desc.value)
      .then(res => {
        this.props.addComment(res)
        this.props.incrementCommentCount(post.id)
        this.name.value = ''
        this.desc.value = ''
      })
  }

  render()
  {
    const p = this.props.post
    return (
      <div className="field">
        <form onSubmit={(e) => this.addComment(e, p)}>
          <textarea 
            className="textarea"
            ref={desc => this.desc=desc} 
            placeholder="Add a new comment here" 
            required 
          />
          <input 
            className="input"
            type="text" 
            ref={name=>this.name=name} 
            placeholder="Your Name" 
            required 
          />
          <button 
            className="button"
            id="submit" 
            type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
const AddCommentContainer = connect(
  null, 
  mapAddCommentDispatchToProps)(AddComment);
function mapAddCommentDispatchToProps(dispatch) {
  return {
    addComment: (c) => dispatch(addComment(c)),
    incrementCommentCount: (pid) => dispatch(incrementCommentCount(pid)),
  }
}


class CommentsSection extends Component{
  render(){
    const p = this.props.post
    return (
      <div className="container is-fluid">
        <h1 className="title is-6">{p.comments} Comments</h1>
        <AddCommentContainer post={p} />
        <div className="container is-fluid">
          {this.props.comments[p.id] && this.props.comments[p.id].map(c => (
            <CommentContainer comment={c} />
          ))}
        </div>
      </div>
    )
  }
}
const CommentsSectionContainer = connect(
  mapCommentsSectionStateToProps)(CommentsSection);
function mapCommentsSectionStateToProps({ comments }) {
  return {
    comments,
  }
}


class PostDetail extends Component {
  upVote(postId) {
    ReadableAPI.upVote(postId)
      .then(res => this.props.updateVoteCount(postId, res.voteScore))
  }

  downVote(postId) {
    ReadableAPI.downVote(postId)
      .then(res => this.props.updateVoteCount(postId, res.voteScore))
  }

  render(){
    const p = this.props.post
    return (
      <div>
        <h1 className="title is-3">{p.title}</h1>
        <h1 className="title is-6">{p.author}</h1>
        <h1 className="title is-6">Votes: {p.voteScore}</h1>
        <div>
          <a onClick={(e)=>this.upVote(p.id)}>upVote</a>
        </div>
        <div>
          <a onClick={(e)=>this.downVote(p.id)}>downVote</a>
        </div>
        <div>
          <a>Edit Post</a>
        </div>
        <div>
          <a>Delete Post</a>
        </div>
        <div>
          <p>{p.body}</p>
        </div>
        <CommentsSectionContainer post={p}/>
      </div>
    )
  }
}
const PostDetailContainer = connect(
  mapPostDetailStateToProps,
  mapPostDetailDispatchToProps)(PostDetail);
function mapPostDetailStateToProps(state, ownProps){
  return {
    post: ownProps.post
  }
}
function mapPostDetailDispatchToProps(dispatch) {
  return {
    updateVoteCount: (pid, v) => dispatch(updateVoteCount(pid, v)),
  }
}


const CategoryRoute = ({ category }) => (
  <div>
  <Route 
    exact 
    key={category.name} 
    path={`/${category.path}`} 
    render={() => (
    <div>
      <h1 className="title is-1">{category.name}</h1>
      <AllCategories />
      <AllPosts category={category.name}/>
    </div>
  )} />
  </div>
)

const AllCategoryRoutes = ({ categories }) => (
  <div>
    {categories.map(c => (
      <CategoryRoute key={c.name} category={c} />
    ))}
  </div>
)

function mapAllCategoryRoutesStateToProps({ categories }) {
  return {
    categories
  }
}
const AllCategoryRoutesContainer = withRouter(connect(
  mapAllCategoryRoutesStateToProps)(AllCategoryRoutes))


const PostRoute = ({ post }) => (
  <Route 
    exact 
    key={post.id} 
    path={`/${post.category}/${post.id}`} 
    render={() => (
      <PostDetailContainer post={post}/>
  )} />
)

const AllPostRoutes = ({ posts }) => (
  <div>
    {posts.map(p => (
      <PostRoute key={p.id} post={p} />
    ))}
  </div>
)

function mapAllPostRoutesStateToProps({ posts }) {
  return {
    posts
  }
}
const AllPostRoutesContainer = withRouter(connect(
  mapAllPostRoutesStateToProps)(AllPostRoutes))


const Categories = ({ categories }) => (
  <div className="breadcrumb">
    {categories.map(c => (
      <div key={c.name}>
        {
          <Link key={c.name} to={`/${c.path}`}> 
            {c.name} 
          </Link>
        }
      </div>
    ))}
  </div>
)

const mapCategoriesStateToProps = ({ categories }) => (
  {
    categories
  }
)
const AllCategories = withRouter(connect(
  mapCategoriesStateToProps)(Categories))

const PageTitle = ({ title }) => (
  <h1 className="title is-1">{ title }</h1>
)

class App extends Component {
  componentDidMount() {
    ReadableAPI.getCategories()
      .then(categories => this.props.addCategories(
        [{name: "Readable", path: ""}, ...categories]
      ))
      .then(c => ReadableAPI.getPosts())
      .then((posts => posts.map(p => {
        ReadableAPI.getComments(p.id)
          .then(res => {
            res.filter((c) => (
              c.deleted === false))
              .forEach(this.props.addComment)
            p.comments = res.length
            this.props.addPost(p)
          })
        return p
      })))
  }

  render() {
    return (
      <div>
        <AllCategoryRoutesContainer />
        <AllPostRoutesContainer />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: (c) => dispatch(addComment(c)),
    addCategories: (c) => dispatch(addCategories(c)),
    addPost: (p) => dispatch(addPost(p)),
  }
}
export default withRouter(
  connect(null, mapDispatchToProps)(App)
)
