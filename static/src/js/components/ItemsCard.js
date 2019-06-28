import React from 'react'

import Stars from './Stars'

export default function ItemsCard({item}) {
  const { slug, prise, image_url, title, description, stars } = item
  return (
    <div className="item-card">
      <div className="column">
        <a href={`/item/${slug}`}>
          <img className="card-item-image" src={image_url} />
        </a>
        <Stars stars={stars}/>
      </div>
      <div>
        <a href={`/item/${slug}`}>
          <h3 className="item-title">{title}</h3>
        </a>
        <p className="item-title">{description.slice(0, 200)}...</p>
      </div>
        <p className="card-item-prise">{prise} $</p>
    </div>
  )
}