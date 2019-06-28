import React from 'react'

import static_path from '../static.js'
let logo = static_path + require('../../img/logo.png')

export default function header() {
  return (
    <header>
      <nav className="main-nav">
        <ul className="nav-ul">
          <li className="nav-li">
            <a href="/" className="logo-link">
              <img src={logo} />
            </a>
          </li>
          <li className="nav-li">
            <a href="/" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-li">
            <a href="/categories" className="nav-link">
              Categories
            </a>
          </li>
          <li className="nav-li">
            <a href="/about" className="nav-link">
              About Us
            </a>
          </li>
        </ul>
        
      </nav>
    </header>
  )
}