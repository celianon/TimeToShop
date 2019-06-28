import React from 'react'

export default function CategoryCard({category}) {
  const { img, title, id } = category
  return (
      <div className="card-category">
        <a href={`/category/${title}/`} className="category-link">
          <img className="category-image" src={img} />
        <p className="category-title">{title}</p>
        </a>
      </div>
  )
}