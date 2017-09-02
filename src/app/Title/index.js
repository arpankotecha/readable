import React from 'react'
import Capitalize from 'capitalize'

const Title = (props) => (
  <h1 className="title is-1">
    {props.name ? Capitalize(props.name) : "Readable"}
  </h1>
)

export default Title
