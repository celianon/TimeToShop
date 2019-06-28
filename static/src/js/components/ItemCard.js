import React from 'react'

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Stars from './Stars'

import static_path from '../static.js'
let avatar = static_path + require('../../img/avatar.png')

export default class ItemCard extends React.Component {
  render(){
    const { item, open, handleDialog, add_review } = this.props
    const { title, image_url, description, stars, prise, props, category, reviews } = item
    return (
      <section className="items-search">
        <div className="path">
          <div className="path-category"><a href={`/category/${category.title}`}>Computers</a></div>
          <div>></div>
          <div className="path-title">{title}</div>
        </div>
        <div className="content">
          <div className="search-result">
            <div className="item-detail">
              <div className="row">
                <div className="column">
                  <img className="card-item-image" src={image_url} />
                  <Stars stars={stars}/>
                </div>
                <h3 className="item-title">{title}</h3>
                <p className="card-item-prise">{prise} $</p>
              </div>
              <div>
                <p className="description">
                  {description}
                </p>
              </div>
              <div className="column">
                <h4 className="properties-title">Properties</h4>
                <table className="props-table">
                  <tbody>
                    { props.split(',').map(prop => 
                      {
                        let prop_value = prop.split(':')
                        return <tr key={prop_value[0]} className="props-tr">
                          <td className="props-td">{prop_value[0]} :</td>
                          <td className="props-td">{prop_value[1]}</td>
                        </tr>
                      }) 
                    }
                  </tbody>
                </table>
              </div>
              <h4 className="reviews-title">Reviews : </h4>
              <button className="btn add-review" onClick={handleDialog}>Add review</button>
              <Dialog open={open} onClose={handleDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add review</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To add review, plese fill in form below.
                  </DialogContentText>
                  <form action="">
                    <input ref="nickname" placeholder="Nickname" className="review-input" type="text"/>
                    <input ref="stars" placeholder="How many stars you give ? (1-5)" className="review-input" type="number"/>
                    <textarea ref="body" rows={8} cols={37} maxLength={225} className="review-textarea" placeholder="Review..."></textarea>
                    <button onClick={(e) => add_review(e)} className="btn add-review-button" type="submit">Add</button>
                  </form>
                </DialogContent>
              </Dialog>
              <div className="reviews">
              {
                reviews.length != 0 ? 
                  reviews.map(review => 
                    <div key={review.id} className="review-card">
                      <div className="column">
                        <img src={avatar} className="avatar"/>
                        <Stars stars={review.stars}/>
                      </div>
                      <div className="column">
                        <h4 className="nickname">{review.nickname}</h4>
                        <p className="review-body">{review.body}</p>
                      </div>
                    </div>
                  ):
                  <div className="error">This item hasn`t any reviews. Add this!</div>
              }
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}