import React from 'react'
import PostUpVote from '../PostUpVote'
import PostDownVote from '../PostDownVote'
import PostDelete from '../PostDelete'
import PostEdit from '../PostEdit'
import {Link} from 'react-router-dom'
import PostModalEditContainer from '../PostModalEdit'

const PostSummary = ({ post }) => (
  <div className="tile is-ancestor box">
    <div className="tile is-1 is-parent vcentered">
      <div className="tile is-child is-vertical">
        <div>
          <PostUpVote postId={post.id} />
        </div>
        <div>
          <label className="title is-5 is-centered">
            {post.voteScore}
          </label>
        </div>
        <div>
          <PostDownVote postId={post.id} />
        </div>
      </div>
    </div>
    <div className="tile is-parent vcentered">
      <div className="tile is-child">
        <div>
          <Link to={`/${post.category}/${post.id}`}>
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
          <PostDelete postId={post.id} />
        </div>
        <div>
          <PostEdit post={post} />
        </div>
      </div>
    </div>
    <PostModalEditContainer post={post} />
  </div>
)

export default PostSummary
