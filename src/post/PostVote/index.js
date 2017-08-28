import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as ReadableAPI from '../../ReadableAPI'
import { updateVoteCount } from '../../actions'

class PostVote extends Component {
  updateVote(postId) {
    ReadableAPI.postVote(postId, this.props.vote)
      .then(res => {
        this.props.updateVotes(postId, res.voteScore)
      })
  }

  render() {
    return (
      <a onClick={(e)=>this.updateVote(this.props.postId)}>
        <span className="icon">
          <i className={this.props.icon} />
        </span>
      </a>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateVotes: (pid, votes) => dispatch(
    updateVoteCount(pid, votes))
})
const PostVoteContainer = connect(
  null, mapDispatchToProps)(PostVote)

export default PostVoteContainer
