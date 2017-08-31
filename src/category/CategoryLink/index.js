import React from 'react'
import { Link } from 'react-router-dom'

const CategoryLink = ({ category }) => (
  <Link 
    to={
      category.path 
        ? `/${category.path}` 
        : "/"
    }
  >
    {category.name}
  </Link>
)

export default CategoryLink
