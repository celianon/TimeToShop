import React from 'react'
import ReactDOM from 'react-dom'

import Css from '../css/style.css'
import App from './components/App'

import store from './store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('react')
)