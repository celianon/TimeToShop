import React from 'react'
import { connect } from 'react-redux'

import { search_items, reload_sug, reset_forms } from '../actions/shopActions'

export class Filters extends React.Component{

  reset_forms = e => {
    e.preventDefault()
    this.props.reset_forms()
    this.props.search_items(this.props.category_name)
  }

  reset = () => {
    this.refs.sidebar_form.reset()
  }

  filter_change = e => {
    const name = e.target.name
    const value = e.target.checked
    const new_types = {
      ...this.props.types,
      [name]: value
    }
    this.props.search_items(this.props.category_name, 
                                        this.props.query, 
                                        new_types,
                                        this.props.min, 
                                        this.props.max )
  }

  apply = e => {
    e.preventDefault()
    const min = this.refs.from.value
    const max = this.refs.to.value
    this.props.search_items(this.props.category_name, 
                                        this.props.query, 
                                        this.props.types, 
                                        min, 
                                        max )
  }

  render() {
    const { errors, fetched, category, reset } = this.props

    reset ? this.reset() : null
    return (
      <form ref="sidebar_form" action="">
        {fetched ?
            category.filters.split(',').map(filter =>
              <div className="filters" key={filter}>
                <div className="filter">
                  <input name={filter.trim()} onChange={this.filter_change} data={filter.trim()} ref={filter} type="checkbox" />
                  <label className="filter-text">{filter.trim()}</label>
                </div>
              </div>
            )
          : <p>Loading...</p>
        }
        <div className="filter-prise">
          <p className="prise-label row">
            From: <input ref="from" className="prise-input" type="number" />$
          </p>
          <p className="prise-label row">
            To: <input ref="to" className="prise-input" type="number" />$
          </p>
        </div>
        <div className="column">
          <button onClick={this.apply} className="btn" type="submit">Apply</button>
          <button onClick={this.reset_forms} className="btn">Reset</button>
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
  category: state.shop.category,
  fetched: state.shop.fetched,
  errors: state.shop.errors
})

export default connect(mapStateToProps, { search_items, reload_sug, reset_forms })(Filters)