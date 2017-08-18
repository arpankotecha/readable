import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import '../node_modules/bulma/css/bulma.css'
import * as ReadableAPI from './ReadableAPI'
import { addComment, addCategory, addPost, updateVoteCount,
    updateCommentVoteCount } from './actions'

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

class App extends Component {
  componentDidMount() {
    ReadableAPI.getCategories()
      .then(categories => categories.map( (c) => (
        this.props.addCategory(c))))
      .then(c => ReadableAPI.getPosts())
      .then((posts => posts.map(p => {
        ReadableAPI.getComments(p.id)
          .then(res => {
            res.map(c => (this.props.addComment(c)))
            p.comments = res.length
            this.props.addPost(p)
          })
        return p
      })))
  }

  upVote(postId) {
    ReadableAPI.upVote(postId)
      .then(res => this.props.updateVoteCount(postId, res.voteScore))
  }

  downVote(postId) {
    ReadableAPI.downVote(postId)
      .then(res => this.props.updateVoteCount(postId, res.voteScore))
  }

  upCommentVote(comment) {
    ReadableAPI.upCommentVote(comment.id)
      .then(res => this.props.updateCommentVoteCount(comment, res.voteScore))
  }

  downCommentVote(comment) {
    ReadableAPI.downCommentVote(comment.id)
      .then(res => this.props.updateCommentVoteCount(comment, res.voteScore))
  }

  render() {
    return (
      <div>
        {this.props.categories.map(c => (
          <Route 
            exact 
            key={c.name} 
            path={`/${c.path}`} 
            render={() => (
            <div>
              <h1 className="title is-1">{c.name}</h1>
              {this.props.posts.filter(p => p.category === c.name).map(p => (
                <PostSummary key={p.id} updateVoteCount={this.props.updateVoteCount} post={p} />
              ))}
            </div>
          )} />
        ))}
        {this.props.posts.map(p => (
          <Route 
            exact 
            key={p.id} 
            path={`/${p.category}/${p.id}`} 
            render={() => (
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
              <h1 className="title is-6">{p.comments} Comments</h1>
              <div>
                <a>Add Comment</a>
              </div>
              <div className="container is-fluid">
                {this.props.comments[p.id].map(c => (
                  <div className='notification'>
                    <p>{c.body}</p>
                    <p>{c.author}</p>
                    <p>Votes: {c.voteScore}</p>
                    <div>
                      <a onClick={(e)=>this.upCommentVote(c)}>upVote</a>
                    </div>
                    <div>
                      <a onClick={(e)=>this.downCommentVote(c)}>downVote</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )} />
        ))}
        <Route exact path='/' render={() => (
          <div>
            <h1 className="title is-1">Readable</h1>
            <div className="columns">
              {this.props.categories.map(c => (
                <div key={c.name} className="column">
                  <Link key={c.name} to={`/${c.path}`}>{c.name}</Link>
                </div>
              ))}
            </div>
            <div className="container is-fluid">
              {this.props.posts.map(p => (
                <PostSummary key={p.id} updateVoteCount={this.props.updateVoteCount} post={p} />
              ))}
            </div>
          </div>
        )}/>
      </div>
    );
  }
}

function mapStateToProps({ comments, categories, posts }) {
  return {
    comments,
    categories,
    posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: (c) => dispatch(addComment(c)),
    addCategory: (c) => dispatch(addCategory(c)),
    addPost: (p) => dispatch(addPost(p)),
    updateVoteCount: (pid, v) => dispatch(updateVoteCount(pid, v)),
    updateCommentVoteCount: (c, v) => dispatch(updateCommentVoteCount(c, v))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
