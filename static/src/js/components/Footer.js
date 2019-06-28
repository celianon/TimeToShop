import React from 'react'

import static_path from '../static.js'
let instagram = static_path + require('../../img/instagram.png')
let facebook = static_path + require('../../img/facebook.png')
let twitter = static_path + require('../../img/twitter.png')

export default function Footer() {
    return (
        <footer className="main-footer">
            <div className="tel">
                <p className="tel">+79638284383</p>
            </div>
            <div className="footer-info">
                <p className="footer-info-text">
                    &copy; 2019 OOO TimeToShop 
                </p>
            </div>
            <div className="social-networks">
                <a href="https://facebook.com/" target="_blank">
                    <img className="sn-logo" src={facebook} />
                </a>
                <a href="https://instagram.com/" target="_blank">
                    <img className="sn-logo" src={instagram} />
                </a>
                <a href="https://twitter.com" target="_blank">
                    <img className="sn-low" src={twitter} /> 
                </a>
            </div>
        </footer>
    )
}
