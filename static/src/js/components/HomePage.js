import React from 'react'
import { connect } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'

import static_path from '../static'
let d = static_path + require('../../img/D.jpg')

import { fetch_items_without_category, home_toggle_isMount, reset_forms } from '../actions/shopActions'
import Search from './Search'
import ItemsCard from './ItemsCard'

export class HomePage extends React.Component{
  componentDidMount(){
    console.log('DidMount')
    console.log(this.props.home_is_mount)
    // check if already mount
    if (!this.props.home_is_mount) {
      this.props.fetch_items_without_category()
      // ismount to false
      this.props.home_toggle_isMount(this.props.home_is_mount)
    }
  }

  componentWillUnmount(){
    console.log('willUnmount')
    console.log(this.props.home_is_mount)
    // this.props.reset_forms()
  }

  loadNext = () => {
    this.props.next ? 
    this.props.fetch_items_without_category(this.props.next) : null
  }

  render() {
    const { errors, fetched, qs_items } = this.props
    return (
      <InfiniteScroll
          pageStart={0}
          loadMore={this.loadNext}
          hasMore={this.props.next != null}
          loader={<div key={1}>Loading...</div>}>
        <section className="items-search">
          <div className="content">
            <div className="search-result">
              <div className="search">
                <Search category_name={null}/>
              </div>
              {fetched ? 
                  qs_items.length == 0 ? 
                  <div className="not-item"><h2>Not Items</h2><img src={d} /></div> :
                  qs_items.map(item => <ItemsCard key={item.id} item={item}/>) 
                : <p>Loading...</p>
              }
            </div>
          </div>
        </section>
      </InfiniteScroll>
    )
  }
}

const mapStateToProps = state => ({
  home_is_mount: state.shop.home_is_mount,
  query: state.shop.query,
  types: state.shop.types,
  qs_items: state.shop.qs_items,
  next: state.shop.next,
  errors: state.shop.errors,
  fetched: state.shop.fetched,
})

export default connect(mapStateToProps, { fetch_items_without_category, home_toggle_isMount, reset_forms })(HomePage)
