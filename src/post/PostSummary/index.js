import React from 'react'
import PostVoteContainer from '../PostVote'
import PostDelete from '../PostDelete'
import PostEdit from '../PostEdit'
import {Link} from 'react-router-dom'

const PostSummary = ({ post }) => (
  <div className="tile is-ancestor box">
    <div className="tile is-1 is-parent vcentered">
      <div className="tile is-child is-vertical">
        <div>
          <PostVoteContainer 
            postId={post.id} 
            label="Up Vote"
            vote="1"
            icon="fa fa-chevron-up"
          />
        </div>
        <div>
          <label className="title is-5 is-centered">{post.voteScore}</label>
        </div>
        <div>
          <PostVoteContainer 
            postId={post.id} 
            label = "Down Vote"
            vote="-1"
            icon="fa fa-chevron-down"
          />
        </div>
      </div>
    </div>
    <div className="tile is-parent vcentered">
      <div className="tile is-child">
        <div>
          <Link to={`/post/${post.id}`}>
            <h3 className="title is-4">{post.title}</h3>
          </Link>
          <label>{post.author} {post.comments ? post.comments : 0}</label>
          <i className="fa fa-comment-o" />
        </div>
      </div>
    </div>
    <div className="tile is-1 is-parent vcentered">
      <div className="tile is-child is-vertical">
        <div>
          <PostDelete 
            postId={post.id} 
            icon="fa fa-times-circle"
          />
        </div>
        <div>
          <PostEdit post={post} icon="fa fa-edit" />
        </div>
      </div>
    </div>
  </div>
)

export default PostSummary
