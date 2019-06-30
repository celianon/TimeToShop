import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Grid, Link, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  card: {
    height: '300px',
    margin: '1rem auto',
    display: 'flex',
    alignItems: 'center'
  }
})

export default function CategoryCard({category}) {
  const { img, title } = category

  const classes = useStyles()

  return (
      <Card className={classes.card}>
        <CardContent>
          <Link component={RouterLink} to={`/category/${title}/`}>
            <Grid 
              item 
              container
              direction="column"
              alignItems="center"
              justify="center"  
            >
              <img className="category-image" src={img} />
              <Typography variant="h5">
                {title}
              </Typography>
            </Grid>
          </Link>
        </CardContent>
      </Card>
  )
}