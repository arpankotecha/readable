import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../node_modules/bulma/css/bulma.css'
import * as ReadableAPI from './ReadableAPI'
import { addCategory, addPost } from './actions'

class App extends Component {
  componentDidMount() {
    ReadableAPI.getCategories()
      .then(categories => categories.map( (c) => (
        this.props.addCategory(c))))
      .then(c => ReadableAPI.getPosts())
      .then((posts => posts.map(p => {
        ReadableAPI.getComments(p.id)
          .then(res => {
            p.comments = res.length
            this.props.addPost(p)
          })
        return p
      })))
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
              <h1>{p.title}</h1>
              {p.body}
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
                <Link key={p.id} to={`/${p.category}/${p.id}`}>
                  <div key={p.id} className="notification">
                    <h2>Title: {p.title}</h2>
                    <h4>Author: {p.author}</h4>
                    <h4>Votes: {p.voteScore}</h4>
                    {console.log(p)}
                    {console.log(p.comments)}
                    <h4>Comments: {p.comments}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}/>
      </div>
    );
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    categories,
    posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCategory: (c) => dispatch(addCategory(c)),
    addPost: (p) => dispatch(addPost(p))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
