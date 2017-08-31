import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as ReadableAPI from '../../ReadableAPI'
import { updateVoteCount } from '../../actions'
import Vote from '../../app/Vote'

class PostVote extends Component {
  updateVote(postId) {
    ReadableAPI.postVote(postId, this.props.vote)
      .then(res => {
        this.props.updateVotes(postId, res.voteScore)
      })
  }

  render() {
    const { postId, icon } = this.props;
    return (
      <Vote 
        updateVote={()=>this.updateVote(postId)}
        icon={icon}
      />
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
