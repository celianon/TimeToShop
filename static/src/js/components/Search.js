import React from 'react'
import { connect } from 'react-redux'
import { search_items, reload_serch_value } from '../actions/shopActions'

import static_path from '../static'
let search = static_path + require('../../img/search.png')

// import onClickOutside from 'react-onclickoutside'

import { TextField, Input } from '@material-ui/core'

export class Search extends React.Component{
  search_items = e => {
    const { category_name, query, types, min, max } = this.props
    e.preventDefault()
    this.props.search_items(category_name, query, types, min, max)
  }

  reload_search_value = e => {
    const value = e.target.value
    // const regexp = new RegExp(`${value}`, 'i')
    // let suggestions =  this.props.list_suggestions.sort().filter(sg => regexp.test(sg))
    this.props.reload_serch_value(value)
  }

  reset = () => {
    this.refs.search_form.reset()
  }
  // suggestions_click = e => {
  //   const text = e.target.textContent
  //   this.refs.search.value = text
  //   this.props.reload_sug(null)
  // }

  // handleClickOutside = () => {
  //   this.props.suggestions == null? 
  //   null : this.props.reload_sug(null)
  // }

  render() {
    const { query, reset } = this.props
    reset ? this.reset() : null
    return (
        <form ref="search_form" className="main-form" action="" onSubmit={this.search_items}>
          <div className="search-cont">
            <TextField 
              id="standard-full-width"
              label="Search"
              fullWidth
              margin="normal"
              onChange={this.reload_search_value}
              value={query}
            />
            {/* <input onChange={this.suggestions} className="main-input" type="text" ref='search' /> */}
            <button className="submit-button" type="submit"><img className="search-button" src={search} alt="search"/></button>
            {/* <div className="suggests">
              <ul className="sug-ul">
                {suggestions && suggestions.map(sg => <li onClick={this.suggestions_click} className="sug-li" key={sg}>{sg}</li>)}
              </ul>
             </div>  */}
          </div>
        </form>
    )
  }
}

const mapStateToProps = state => ({
  reset: state.shop.reset,
  query: state.shop.query,
  min: state.shop.min,
  max: state.shop.max,
  types: state.shop.types,
  list_suggestions: state.shop.list_suggestions,
  suggestions: state.shop.suggestions
})

export default connect(mapStateToProps, { search_items, reload_serch_value })(Search)