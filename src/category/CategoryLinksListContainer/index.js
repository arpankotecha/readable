import React from 'react'
import CategoryLink from '../CategoryLink'

const CategoryLinksList = ({ categories }) => (
  <div className="breadcrumb">
    {categories.map(c => (
      <CategoryLink key={c.name} category={c} />
    ))}
  </div>
)

export default CategoryLinksList
