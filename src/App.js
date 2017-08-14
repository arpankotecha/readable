import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import '../node_modules/bulma/css/bulma.css'
import * as ReadableAPI from './ReadableAPI'

class App extends Component {
  state = {
    categories: [],
    posts: []
  }

  componentDidMount() {
    ReadableAPI.getCategories()
      .then(categories => this.setState({ categories:categories }))
    ReadableAPI.getPosts()
      .then(posts => this.setState({ posts: posts }))
  }

  render() {
    return (
      <div>
        {this.state.categories.map(c => (
          <Route key={c.name} exact path={`/${c.path}`} render={props =>(
            <div>
              {console.log(c)}
              <h1 className="title is-1">{c.name}</h1>
            </div>
          )} />
        ))}
        {this.state.posts.map(p => (
          <Route key={p.id} exact path={`/${p.id}`} render={props=>(
            <div>
              <h1>{p.title}</h1>
              {p.body}
            </div>
          )} />
        ))}
        <Route exact path='/' render={props => (
          <div>
            <h1 className="title is-1">Readable</h1>
            <div className="columns">
              {this.state.categories.map(c => (
                <div key={c.name} className="column">
                  <Link key={c.name} to={`/${c.path}`}>{c.name}</Link>
                </div>
              ))}
            </div>
            <div className="container is-fluid">
              {this.state.posts.map(p => (
                <Link key={p.id} to={`/${p.id}`}>
                  <div key={p.id} className="notification">
                    <h2>Title: {p.title}</h2>
                    <h4>Author: {p.author}</h4>
                    <h4>Votes: {p.voteScore}</h4>
                    {console.log(p)}
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

export default App;
