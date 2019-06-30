import React from 'react'
import { connect } from 'react-redux'

import { Grid } from '@material-ui/core'
import { fetch_list_category } from '../actions/shopActions'

import CategoryCard from './CategoryCard'

export class App extends React.Component{
  componentDidMount(){
    if (!this.props.list_category_fetched){
      this.props.fetch_list_category()
    }
  }
  render() {
    const { categories, list_category_fetched, errors } = this.props
    return (
      <Grid 
        container
        direction="row"
        alignItems="center"
        justify="center"
      >
          {list_category_fetched ? 
          categories.map(cat => <CategoryCard key={cat.title} category={cat}/>) :
          <p>Loading...</p>}
      </Grid>
    )
  }
}
const mapStateToProps = state => ({
  categories: state.shop.qs_categories,
  fetching: state.shop.fetching,
  list_category_fetched: state.shop.list_category_fetched,
  errors: state.shop.errors,
})

export default connect(mapStateToProps, { fetch_list_category })(App)