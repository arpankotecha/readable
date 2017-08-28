import React from 'react'

const Title = (props) => (
  <h1 className="title is-1">
    {props.name ? props.name : "Readable"}
  </h1>
)

export default Title
