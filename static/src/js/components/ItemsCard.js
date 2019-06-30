import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Grid, Link, Typography } from '@material-ui/core'
import Stars from './Stars'

import { Link as RouterLink } from 'react-router-dom'

const useStyles = makeStyles({
  card: {
    width: '80%',
    margin: '1rem auto'
  },
})

export default function ItemsCard({item}) {
  const { slug, prise, image_url, title, description, stars } = item

  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid 
          container
          direction="row"
          justify="center"
          spacing={2}
        >
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            container
            direction="column"
            alignItems="center"
          >
            <Link component={RouterLink} to={`/item/${slug}`}>
              <img className="card-item-image" src={image_url} />
            </Link>
            <Stars stars={stars}/>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg
            container
            direction="column"
            alignItems="center"
            
          >
            <Link component={RouterLink} to={`/item/${slug}`}>
              <Typography variant="h5">
                {title.slice(0, 100)}
              </Typography>
            </Link>
            <Typography variant="body1">
              {description.slice(0, 200)}...
            </Typography>
          </Grid>
          <Grid 
            item
            xs={12}
            md={12}
            lg={2}
            container
            direction="column"
            alignItems="flex-end"
          >
            <Typography color="secondary" variant="subtitle1">
              {prise} $
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}