import React from 'react'
import { connect } from 'react-redux'
import { search_items, reload_sug } from '../actions/shopActions'

import static_path from '../static'
let search = static_path + require('../../img/search.png')

import onClickOutside from 'react-onclickoutside'

export class Search extends React.Component{
  search_items = e => {
    e.preventDefault()
    let query = this.refs.search.value
    this.props.search_items(this.props.category_name, 
                                        query, 
                                        this.props.types,
                                        this.props.min, 
                                        this.props.max )
  }

  suggestions = e => {
    const value = e.target.value
    const regexp = new RegExp(`${value}`, 'i')
    let suggestions =  this.props.list_suggestions.sort().filter(sg => regexp.test(sg))
    this.props.reload_sug(suggestions)
  }

  suggestions_click = e => {
    const text = e.target.textContent
    this.refs.search.value = text
    this.props.reload_sug(null)
  }

  handleClickOutside = () => {
    this.props.suggestions == null? 
    null : this.props.reload_sug(null)
  }

  render() {
    const { suggestions } = this.props
    return (
        <form ref="search_form" className="main-form" action="" onSubmit={this.search_items}>
          <div className="search-cont">
            <input onChange={this.suggestions} className="main-input" type="text" ref='search' />
            <button className="submit-button" type="submit"><img className="search-button" src={search} alt="search"/></button>
            <div className="suggests">
              <ul className="sug-ul">
                {suggestions && suggestions.map(sg => <li onClick={this.suggestions_click} className="sug-li" key={sg}>{sg}</li>)}
              </ul>
             </div> 
          </div>
        </form>
    )
  }
}

const mapStateToProps = state => ({
  query: state.shop.query,
  min: state.shop.min,
  max: state.shop.max,
  types: state.shop.types,
  list_suggestions: state.shop.list_suggestions,
  suggestions: state.shop.suggestions
})

export default connect(mapStateToProps, { search_items, reload_sug })(onClickOutside(Search))