import React from 'react'
import { Link } from 'react-router-dom'
import Capitalize from 'capitalize'

const CategoryLink = ({ category }) => (
  <Link 
    to={
      category.path 
        ? `/${category.path}` 
        : "/"
    }
  >
    {Capitalize(category.name)}
  </Link>
)

export default CategoryLink
