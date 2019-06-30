import React from 'react'

import { fetch_item, handleDialog, add_review } from '../actions/shopActions'
import { connect } from 'react-redux'

import ItemCard from './ItemCard'

let loc_fetched = false

export class ItemPage extends React.Component{
  componentDidMount(){
    const slug = this.props.match.params.slug
    this.props.fetch_item(slug)
    loc_fetched = true
  }

  add_review = e => {
    e.preventDefault()
    const nickname = document.getElementById('nickname').value
    const body = document.getElementById('body').value
    const stars = document.getElementById('stars').value
    const id = this.props.item.id
    this.props.add_review(id, nickname, stars, body)
    
  }

  render() {
    const { errors, item, open, item_fetched } = this.props
    return (
      <React.Fragment>
        {( item_fetched && loc_fetched) ? <ItemCard open={open} add_review={(e) => this.add_review(e)} handleDialog={this.props.handleDialog} item={item} /> :
            <p>Loading...</p>}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  item: state.shop.item,
  fetching: state.shop.fetching,
  item_fetched: state.shop.item_fetched,
  errors: state.shop.errors,
  open: state.shop.open,
})

export default connect(mapStateToProps, { fetch_item, handleDialog, add_review })(ItemPage)