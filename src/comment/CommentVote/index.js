import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as ReadableAPI from '../../ReadableAPI'
import { updateCommentVoteCount } from '../CommentActions'
import Vote from '../../app/Vote'

class CommentVote extends Component {
  updateVote(comment) {
    ReadableAPI.commentVote(comment.id, this.props.vote)
      .then(res => {
        this.props.updateCommentVotes(
          comment, res.voteScore)
      })
  }

  render() {
    const { comment, icon } = this.props;
    return (
      <Vote 
        updateVote={()=>this.updateVote(comment)}
        icon={icon}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCommentVotes: (cid, votes) => dispatch(
    updateCommentVoteCount(cid, votes))
})
const CommentVoteContainer = connect(
  null, mapDispatchToProps)(CommentVote)

export default CommentVoteContainer
