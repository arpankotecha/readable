import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import '../../node_modules/font-awesome/css/font-awesome.css'
import '../App.css'
import * as ReadableAPI from '../ReadableAPI'
import { addComment } from '../comment/CommentActions'
import { addCategories } from '../category/CategoryActions'
import { addPost } from '../post/PostActions'
import CategoryContainer from '../category/Category'
import PostContainer from '../post/Post'

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
