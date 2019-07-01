import React from 'react'

import { Home } from '@material-ui/icons'
import { AppBar, Typography, Link, Toolbar, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Link as RouterLink } from 'react-router-dom'
import static_path from '../static.js'
let logo = static_path + require('../../img/logo.png')

export default function header() {
  const useStyles = makeStyles(theme => ({
    appBar: {
      
    },
    toolBar: {
      justifyContent: 'space-evenly',
    }

  }))
  const classes = useStyles()

  return (
      <AppBar position="static">
        <Toolbar className={classes.toolBar}>
          <Typography variant="h4">
            <Link component={RouterLink} to="/" color="inherit">
              <IconButton edge="start" color="inherit" aria-label="Home">
                  <Home />
              </IconButton>
              Home
            </Link>
          </Typography>
          <Typography variant="h4">
            <Link component={RouterLink} to="/categories" color="inherit">
              Categories
            </Link>
          </Typography>
          <Typography variant="h4">
            <Link component={RouterLink} to="/about" color="inherit">
              About Us
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    
  )
}