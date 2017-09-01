import React, { Component } from 'react'
import Modal from 'react-modal'

class NewPostLink extends Component {
  render() {
    return (
      <div className="new-post">
        <a className="new-post" onClick={this.props.onClick}>
          Add New Post
        </a>
      </div>
    )
  }
}

export default NewPostLink
