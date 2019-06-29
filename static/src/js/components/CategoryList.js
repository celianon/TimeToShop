import React from 'react'
import { connect } from 'react-redux'

import { fetch_list_category } from '../actions/shopActions'

import CategoryCard from './CategoryCard'

export class App extends React.Component{
  componentDidMount(){
    this.props.fetch_list_category()
  }

  render() {
    const { categories, fetched, errors } = this.props
    return (
      <section className="section-category">
        <div className="categories-wrap">
          {fetched ? categories.map(cat => <CategoryCard key={cat.title} category={cat}/>) :
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