import React, { Component } from 'react'
import { Switch, Redirect, Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import '../node_modules/bulma/css/bulma.css'
import '../node_modules/font-awesome/css/font-awesome.css'
import './App.css'
import * as ReadableAPI from './ReadableAPI'
import { addComment, deleteComment, addCategories, addPost, 
  updateVoteCount, updateCommentVoteCount, editComment,
  incrementCommentCount, editPost, deletePost } from './actions'
import Title from './app/Title'
import CategoryLinksList from './category/CategoryLinksListContainer'
import CategoryContainer from './category/Category'
import Post from './post/Post'

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
    ReadableAPI.deleteComment(comment.id)
      .then(res => {
        this.props.deleteComment(res)
      })
  }

  editComment(comment) {
    this.props.editComment({...comment, 'editFlag': true})
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
          <a onClick={(e)=>this.editComment(c)}>Edit</a>
          <a onClick={(e)=>this.deleteComment(e, c)}>Delete</a>
        </div>
      </div>
    )
  }
}
function mapPostCommentDispatchToProps(dispatch) {
  return {
    editComment: (c) => dispatch(editComment(c)),
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


class EditCommentForm extends Component {
  editComment(e, c) {
    e.preventDefault();
    ReadableAPI.editComment(c.id, this.name.value, 
      this.desc.value)
      .then(res => this.props.editComment(res))
  }

  render() {
    const c = this.props.comment
    return (
      <div className="field">
        <form onSubmit={(e) => this.editComment(e, c)}>
          <textarea 
            className="textarea"
            ref={desc => this.desc=desc} 
            defaultValue={c.body}
            required 
          />
          <input 
            className="input"
            type="text" 
            ref={name=>this.name=name} 
            defaultValue={this.props.comment.author}
            required 
          />
          <button 
            className="button"
            id="submit" 
            type="submit">Save</button>
        </form>
      </div>
    )
  }
}
function mapEditCommentFormStateToProps(state, ownProps) {
  return {
    ownProps
  }
}
function mapEditCommentFormDispatchToProps(dispatch) {
  return {
    editComment: (c) => dispatch(editComment(c))
  }
}
const EditCommentFormContainer = connect(
  mapEditCommentFormStateToProps,
  mapEditCommentFormDispatchToProps)(EditCommentForm)

class CommentsSection extends Component {
  render() {
    const p = this.props.post
    return (
      <div className="container is-fluid">
        <h1 className="title is-6">{p.comments} Comments</h1>
        <AddCommentContainer post={p} />
        <div className="container is-fluid">
          {this.props.comments[p.id] && this.props.comments[p.id].map(c => (
            c.editFlag === true
              ? <EditCommentFormContainer key={c.id} comment={c} post={p} />
              : <CommentContainer key={c.id} comment={c} />
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


class EditPostForm extends Component {
  //TODO: Allow use to reassign the category for a post
  editPost(e, p) {
    e.preventDefault()
    ReadableAPI.editPost(p.id, this.title.value, this.desc.value, this.author.value) 
      .then(res => this.props.editPost( res ))
  }

  render() {
    const p = this.props.post
    return (
      <div>
        <form onSubmit={(e) => this.editPost(e, p)}>
          <input 
            className="input"
            type="text" 
            ref={title=>this.title=title} 
            defaultValue={p.title}
            required 
          />
          <textarea 
            className="textarea"
            ref={desc => this.desc=desc} 
            defaultValue={p.body}
            required 
          />
          <input 
            className="input"
            type="text" 
            ref={author=>this.author=author} 
            defaultValue={p.author}
            required 
          />
          <button 
            className="button"
            id="submit" 
            type="submit">Save</button>
        </form>
      </div>
    )
  }
}
const EditPostFormContainer = connect(
  mapEditPostFormStateToProps,
  mapEditPostFormDispatchToProps)(EditPostForm);
function mapEditPostFormStateToProps(state, ownProps){
  return {
    post: ownProps.post
  }
}
function mapEditPostFormDispatchToProps(dispatch) {
  return {
    editPost: (p) => dispatch(editPost(p))
  }
}


class PostDetail extends Component {
  upVote(postId) {
    ReadableAPI.upVote(postId)
      .then(res => this.props.updateVoteCount(
        postId, res.voteScore
      ))
  }

  downVote(postId) {
    ReadableAPI.downVote(postId)
      .then(res => this.props.updateVoteCount(
        postId, res.voteScore
      ))
  }

  editPost(post) {
    this.props.editPost({
      ...post, 
      "editFlag": true
    })
  }

  deletePost(postId) {
    //TODO: Take the user back to its last location
    ReadableAPI.deletePost(postId)
      .then(res => this.props.deletePost(postId))
  }

  render() {
    const p = this.props.post
    return (
      <div>
        <h1 className="title is-3">{p.title}</h1>
        <h1 className="title is-6">{p.author}</h1>
        <h1 className="title is-6">Votes: {p.voteScore}</h1>
        <div className="breadcrumb">
          <div>
            <a onClick={(e)=>this.upVote(p.id)}>upVote</a>
          </div>
          <div>
            <a onClick={(e)=>this.downVote(p.id)}>downVote</a>
          </div>
          <div>
            <a onClick={(e)=>this.editPost(p)}>Edit Post</a>
          </div>
          <div>
            <a onClick={(e)=>this.deletePost(p.id)}>Delete Post</a>
          </div>
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
    editPost: (p) => dispatch(editPost(p)),
    deletePost: (p) => dispatch(deletePost(p))
  }
}


class PostDetailPage extends Component {
  render() {
    const p = this.props.post
    return (
      <div>
        { p.editFlag 
            ? <EditPostFormContainer post={p} />
            : <PostDetailContainer post={p} />
        }
      </div>
    )
  }
}

class AddNewPostForm extends Component {
  //TODO: After adding the new post, it should redirect
  // the page back to where the user was
  addPost(event) {
    event.preventDefault()
    ReadableAPI.addPost(this.title.value, this.desc.value, this.author.value, this.category.value)
      .then(res => this.props.addPost(res))
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.addPost(e)}>
          <input 
            className="input"
            type="text" 
            ref={title=>this.title=title} 
            placeholder="Title"
            required 
          />
          <input 
            className="input"
            type="text" 
            ref={category=>this.category=category} 
            placeholder="Category"
            required 
          />
          <textarea 
            className="textarea"
            ref={desc => this.desc=desc} 
            placeholder="Post text"
            required 
          />
          <input 
            className="input"
            type="text" 
            ref={author=>this.author=author} 
            placeholder="Your name"
            required 
          />
          <button 
            className="button"
            id="submit" 
            type="submit">Save</button>
        </form>
      </div>
    )
  }
}
const AddNewPostFormContainer = connect(
  null,
  mapAddNewPostFormDispatchToProps)(AddNewPostForm);
function mapAddNewPostFormDispatchToProps(dispatch) {
  return {
    addPost: (p) => dispatch(addPost(p))
  }
}

class App extends Component {
  componentDidMount() {
    ReadableAPI.getCategories()
      .then(categories => this.props.addCategories(
        [{name: "Readable", path: ""}, ...categories]
      ))
      .then(c => ReadableAPI.getPosts())
      .then((posts => posts.filter(p => p.deleted === false).map(p => {
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
        <Switch>
          <Route 
            exact 
            path="/" 
            component={CategoryContainer} 
          />
          <Route 
            path="/newPost" 
            component={AddNewPostFormContainer}
          />
          <Route 
            path="/category/:cat" 
            component={CategoryContainer} 
          />
          <Route 
            path="/post/:id" 
            component={Post} 
          />
        </Switch>
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
