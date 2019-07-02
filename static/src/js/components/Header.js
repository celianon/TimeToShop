import React from 'react'

import { Home } from '@material-ui/icons'
import { AppBar, Typography, Link, Toolbar, IconButton, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Link as RouterLink } from 'react-router-dom'
import static_path from '../static.js'
let logo = static_path + require('../../img/logo.png')

export default function header() {
  const useStyles = makeStyles(theme => ({
    menuItem: {
      height: '50px'
    },
  }))
  const classes = useStyles()

  return (
      <AppBar position="static">
        <Grid container
          direction="row"
          justify="space-evenly"
          alignItems="center"
          >
          <Grid item
            container
            justify="center"
            xl={4}
            md={4}
            xs={12}
            className={classes.menuItem}>
            <Typography variant="h4">
              <Link component={RouterLink} to="/" color="inherit">
                <IconButton edge="start" color="inherit" aria-label="Home">
                    <Home />
                </IconButton>
                Home
              </Link>
            </Typography>
          </Grid>
          <Grid item
            container
            justify="center"
            xl={4}
            md={4}
            xs={12}
            className={classes.menuItem}>
            <Typography variant="h4">
              <Link component={RouterLink} to="/categories" color="inherit">
                Categories
              </Link>
            </Typography>
          </Grid>
          <Grid item
            container
            justify="center"
            xl={4}
            md={4}
            xs={12}
            className={classes.menuItem}>
            <Typography variant="h4">
              <Link component={RouterLink} to="/about" color="inherit">
                About Us
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </AppBar>
    
  )
}