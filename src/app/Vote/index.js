import React from 'react'

const Vote = ({updateVote, icon}) => {
  return (
    <a onClick={(e)=>updateVote()}>
      <span className="icon">
        <i className={icon} />
      </span>
    </a>
  )
}

export default Vote
