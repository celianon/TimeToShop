import React from 'react'

import ScrollUp from './ScrollUp'
import HomePage from './HomePage'
import CategoryList from './CategoryList'
import CategoryPage from './CategoryPage'
import ItemPage from './ItemPage'
import Header from './Header'
import Footer from './Footer'
import About from './About'
import { BrowserRouter as Router, Route } from 'react-router-dom'

export class App extends React.Component{
  render() {
    return (
      <Router>
        <Header />
        <Route path="/" exact component={HomePage}/>
        <Route path="/categories" component={CategoryList}/>
        <Route path="/category/:title" component={CategoryPage}/>
        <Route path="/item/:slug" component={ItemPage}/>
        <Route path="/about" component={About}/>
        <ScrollUp />
        <Footer />
      </Router>
    )
  }
}

export default App