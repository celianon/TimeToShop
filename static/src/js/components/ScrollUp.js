import React from 'react'

import { animateScroll as scroll} from 'react-scroll'

import static_path from '../static.js' 
let up = static_path + require('../../img/up.png')

export class ScrollUp extends React.Component{
  ToUp = () => {
    scroll.scrollToTop()
  }
  render() {
    return (
      <div><img onClick={this.ToUp} className="up" src={up} /></div>
    )
  }
}

export default ScrollUp