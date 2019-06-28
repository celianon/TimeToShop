import React from 'react'
import { connect } from 'react-redux'

import static_path from '../static.js'
let search = static_path + require('../../img/search.png')

import { fetch_list_category } from '../actions/shopActions'

import CategoryCard from './CategoryCard'
import Search from './Search' 
import Filters from './Filters' 

export class App extends React.Component{
  componentDidMount(){
    this.props.fetch_list_category()
  }

  render() {
    const { categories, fetching, fetched, errors } = this.props
    return (
      <section className="section-category">
      <div className="search">
        <Search category_name=''/>
      </div>
        <div className="categories-wrap">
          { errors ? <strong>Something went wrong D:</strong> :
           fetched ? categories.map(cat => <CategoryCard key={cat.title} category={cat}/>) :
           <p>Loading...</p> 
          }
        </div>
    </section>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.shop.qs_categories,
  fetching: state.shop.fetching,
  fetched: state.shop.fetched,
  errors: state.shop.errors,
})

export default connect(mapStateToProps, { fetch_list_category })(App)