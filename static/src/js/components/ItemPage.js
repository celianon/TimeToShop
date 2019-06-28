import React from 'react'

import { fetch_item, handleDialog, add_review } from '../actions/shopActions'
import { connect } from 'react-redux'

import ItemCard from './ItemCard'

export class ItemPage extends React.Component{
  componentDidMount(){
    const slug = this.props.match.params.slug
    this.props.fetch_item(slug)
  }

  add_review = e => {
    e.preventDefault()
    const nickname = e.target.form[0].value
    const body = e.target.form[2].value
    const stars = e.target.form[1].value
    const id = this.props.item.id
    this.props.add_review(id, nickname, stars, body)
  }

  render() {
    const { errors, fetched, item, open } = this.props
    return (
      <React.Fragment>
        { errors ? <strong>Something went wrong D:</strong> :
          fetched ? <ItemCard open={open} add_review={(e) => this.add_review(e)} handleDialog={this.props.handleDialog} item={item} /> :
            <p>Loading...</p>
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  item: state.shop.item,
  fetching: state.shop.fetching,
  fetched: state.shop.fetched,
  errors: state.shop.errors,
  open: state.shop.open,
})

export default connect(mapStateToProps, { fetch_item, handleDialog, add_review })(ItemPage)