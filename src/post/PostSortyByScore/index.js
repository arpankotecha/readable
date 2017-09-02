import React, { Component } from 'react'

const SortPostBy = (props) => {
  const { by, reverse, label } = props
  return (
    <a onClick={
      (e) => props.sortByAction(by, reverse)
    }>
      {label}
    </a>
  )
}

export default SortPostBy
