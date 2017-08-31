import React, { Component } from 'react'
import { Switch, Redirect, Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
//import '../node_modules/bulma/css/bulma.css'
import '../node_modules/font-awesome/css/font-awesome.css'
import './App.css'
import * as ReadableAPI from './ReadableAPI'
import { addComment, addCategories, addPost, 
  editComment,
  incrementCommentCount, editPost } from './actions'
import Title from './app/Title'
import CategoryLinksList from './category/CategoryLinksListContainer'
import CategoryContainer from './category/Category'
import PostContainer from './post/Post'

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
            exact
            path="/:cat/:id" 
            component={PostContainer} 
          />
          <Route 
            path="/:cat" 
            component={CategoryContainer} 
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
