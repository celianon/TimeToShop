import React from 'react'

import StarRatings from 'react-star-ratings'

export default function stars({stars}) {
  return (
    <StarRatings
      className="card-item-stars"
      rating={stars}
      starRatedColor="#D8D648"
      starDimension="30px"
      /*changeRating={this.changeRating}*/
      numberOfStars={5}
      name='rating'
    />
  )
}