import React from 'react'
import { connect } from 'react-redux'

import InfiniteScroll from 'react-infinite-scroller'
import static_path from '../static'
let d = static_path + require('../../img/D.jpg')

import { fetch_items_in_category, load_up_search } from '../actions/shopActions'

import ItemsCard from './ItemsCard'
import Search from './Search' 
import Filters from './Filters'
import { Grid } from '@material-ui/core';

export class CategoryPage extends React.Component{
  componentDidMount(){
    if (!this.props.category_page_fetched){
       const title = this.props.match.params.title
    this.props.fetch_items_in_category(title)
    }
  }

  loadNext = () => {
    const title = this.props.match.params.title
    const { next, searched, load_up_search, fetch_items_in_category } = this.props
    searched ? 
      next != null ? load_up_search(next) : null
        :
      next != null ? fetch_items_in_category(title, next) : null
  }

  render() {
    const { category_page_fetched, category } = this.props
    const category_name = this.props.match.params.title
    
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadNext}
        hasMore={this.props.next != null}
        loader={<div key={1}>Loading...</div>}
        className="wrap"
      >
        <Grid container
          direction="row-reverse">
          <Grid item container
            style={{'paddingTop': '1rem'}}
            justify="center"
            xs={12}
            md={4}
            lg={4}>
            <Filters category_name={category_name}/>
          </Grid>
          <Grid container item
            xs={12}
            md={8}
            lg={8}
            direction="column">
            <Grid container
              justify="center"
              alignItems="center">
              <Search category_name={category_name}/>
            </Grid>
            <Grid item container
              direction="column">
            {category_page_fetched ? 
              category.item.length == 0 ? <div className="not-item"><h2>Not Items</h2><img src={d} /></div> :
                category.item.map(item => <ItemsCard key={item.id} item={item}/>) 
              : <p>Loading...</p>
            }
            </Grid>
          </Grid>
        </Grid>
        {/* <section className="items-search wrap">
          <div className="content">
            <div className="search-result">
              <div className="search">
                <Search category_name={category_name}/>
              </div>
                {category_page_fetched ? 
                    category.item.length == 0 ? <div className="not-item"><h2>Not Items</h2><img src={d} /></div> :
                      category.item.map(item => <ItemsCard key={item.id} item={item}/>) 
                  : <p>Loading...</p>
                }
            </div>
            <Grid item
              xs={12}
              md={4}
              lg={4}>
              <Filters category_name={category_name}/>
            </Grid>
          </div>
        </section> */}
      </InfiniteScroll>
    )
  }
}

const mapStateToProps = state => ({

  query: state.shop.query,
  min: state.shop.min,
  max: state.shop.max,
  types: state.shop.types,

  page: state.shop.page,
  next: state.shop.next,
  searched: state.shop.searched,

  category: state.shop.category,
  fetching: state.shop.fetching,
  category_page_fetched: state.shop.category_page_fetched,

  errors: state.shop.errors
})

export default connect(mapStateToProps, { fetch_items_in_category, load_up_search })(CategoryPage)