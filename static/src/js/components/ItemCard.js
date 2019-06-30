import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Grid, 
  DialogTitle,
  DialogContentText, 
  DialogContent, 
  Dialog,
  Link,
  Typography,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Button,
  Card,
  TextField,
  DialogActions
  } from '@material-ui/core';

import { SubdirectoryArrowLeft } from '@material-ui/icons'

import Stars from './Stars'
import static_path from '../static.js'
let avatar = static_path + require('../../img/avatar.png')

export default class ItemCard extends React.Component {
  styles = {
    container: {
      'padding': '12px'
    },
    review_card: {
      'margin': '0.5rem 0'
    }
  }

  render(){
    const { item, open, handleDialog, add_review } = this.props
    const { title, slug, image_url, description, stars, prise, props, category, reviews } = item

    return (
      <div style={this.styles.container}>
        <Grid container
          direction="row"
          spacing={2}
          >
          <Grid item container
            direction="row"
            xs={12}
            md={12}
            lg={12}
            >
            <Typography variant="h6">
              <Link component={RouterLink} to={`/category/${category.title}`}>
                {category.title}
              </Link>
              <SubdirectoryArrowLeft />
              <Link component={RouterLink} to={`/item/${slug}`}>
                {title}
              </Link>
            </Typography>
          </Grid>
          <Grid container item
            direction="column"
            xs={12}
            md={4}
            lg={4}>
            <Grid item container
              alignItems="center"
              justify="center">
              <img className="card-item-image" src={image_url} />
            </Grid>
            <Grid item container
              alignItems="center"
              justify="center">
              <Stars stars={stars}/>
            </Grid>
          </Grid>
          <Grid container item
            direction="row"
            xs={12}
            md
            lg>
            <Grid item
              xs md lg>
              <Typography variant="h3">
              {title}
            </Typography>
            </Grid>
            <Grid item container
              justify="flex-end"
              xs={12}
              md={2}
              lg={2}>
              <Typography variant="subtitle1"
                color="secondary">
                {prise} $
            </Typography>
            </Grid>
            
          </Grid>
          <Grid item
            xs={12}
            md={12}
            lg={12}>
            <Typography variant="body1">
              {description}
            </Typography>
          </Grid>
          <Grid item container>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Properties</TableCell>
                <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  props.split(',').map(prop => 
                    {
                      let prop_value = prop.split(':')
                      return (<TableRow key={prop_value[0]} component="tr" scope="row">
                        <TableCell>{prop_value[0]} :</TableCell>
                        <TableCell>{prop_value[1]}</TableCell>
                      </TableRow>)
                    })
                }
              </TableBody>
            </Table>
          </Grid>
          <Grid item container
            direction="column"
            alignItems="center">
            <Typography variant="h5">
              Reviews :
            </Typography>
            <Button variant="contained" color="primary" onClick={handleDialog}>Add</Button>
            <Dialog open={open} onClose={handleDialog} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add review</DialogTitle>
              <form>
                <DialogContent>
                  <DialogContentText>
                    To add review, plese fill in form below.
                  </DialogContentText>
                    <TextField 
                      autoFocus
                      fullWidth
                      type="text"
                      label="Your nickname"
                      id="nickname"
                    />
                    <TextField
                      fullWidth
                      type="number"
                      label="How many stars you give ?"
                      id="stars"
                    />
                    <TextField 
                      autoFocus
                      fullWidth
                      type="text"
                      label="Your review"
                      multiline
                      id="body"
                    />
                  {/* <form action="">
                    <input ref="nickname" placeholder="Nickname" className="review-input" type="text"/>
                    <input ref="stars" placeholder="How many stars you give ? (1-5)" className="review-input" type="number"/>
                    <textarea ref="body" rows={8} cols={37} maxLength={225} className="review-textarea" placeholder="Review..."></textarea>
                    <button onClick={(e) => add_review(e)} className="btn add-review-button" type="submit">Add</button>
                  </form> */}
                </DialogContent>
                <DialogActions>
                  <Button variant="contained"
                    onClick={(e) => add_review(e)}>
                    Add review</Button>
                </DialogActions>
              </form>
            </Dialog>
            
            <Grid container
              direction="column">
              {reviews.length != 0 ? 
                reviews.map(review =>
                <Card key={review.id} style={this.styles.review_card}>
                    <Grid container
                      direction="row">                    
                      <Grid container item
                        xs={6}
                        md={4}
                        lg={4} 
                        direction="column">
                        <img src={avatar} className="avatar"/>
                        <Stars stars={review.stars}/>
                      </Grid>
                      <Grid container item
                        xs={6}
                        md={8}
                        lg={8}
                        direction="column">
                        <Typography variant="subtitle1">{review.nickname}</Typography>
                        <Typography variant="body2">{review.body}</Typography>
                      </Grid>
                    </Grid>
                </Card>)
                : <p>123</p>
              }
            </Grid>
          </Grid>
        </Grid>        
      </div>
    )
  }
}
{/* <section className="items-search">
        <div className="path">
          <div className="path-category"><a href={`/category/${category.title}`}>Computers</a></div>
          <div>></div>
          <div className="path-title">{title}</div>
        </div>
        <div className="content">
          <div className="search-result">
            <div className="item-detail">
              <div className="row">
                <div className="column">
                  <img className="card-item-image" src={image_url} />
                  <Stars stars={stars}/>
                </div>
                <h3 className="item-title">{title}</h3>
                <p className="card-item-prise">{prise} $</p>
              </div>
              <div>
                <p className="description">
                  {description}
                </p>
              </div>
              <div className="column">
                <h4 className="properties-title">Properties</h4>
                <table className="props-table">
                  <tbody>
                    { props.split(',').map(prop => 
                      {
                        let prop_value = prop.split(':')
                        return <tr key={prop_value[0]} className="props-tr">
                          <td className="props-td">{prop_value[0]} :</td>
                          <td className="props-td">{prop_value[1]}</td>
                        </tr>
                      }) 
                    }
                  </tbody>
                </table>
              </div>
              <h4 className="reviews-title">Reviews : </h4>
              <button className="btn add-review" onClick={handleDialog}>Add review</button>
              <Dialog open={open} onClose={handleDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add review</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To add review, plese fill in form below.
                  </DialogContentText>
                  <form action="">
                    <input ref="nickname" placeholder="Nickname" className="review-input" type="text"/>
                    <input ref="stars" placeholder="How many stars you give ? (1-5)" className="review-input" type="number"/>
                    <textarea ref="body" rows={8} cols={37} maxLength={225} className="review-textarea" placeholder="Review..."></textarea>
                    <button onClick={(e) => add_review(e)} className="btn add-review-button" type="submit">Add</button>
                  </form>
                </DialogContent>
              </Dialog>
              <div className="reviews">
              {
                reviews.length != 0 ? 
                  reviews.map(review => 
                    <div key={review.id} className="review-card">
                      <div className="column">
                        <img src={avatar} className="avatar"/>
                        <Stars stars={review.stars}/>
                      </div>
                      <div className="column">
                        <h4 className="nickname">{review.nickname}</h4>
                        <p className="review-body">{review.body}</p>
                      </div>
                    </div>
                  ):
                  <div className="error">This item hasn`t any reviews. Add this!</div>
              }
              </div>
            </div>
          </div>
        </div>
      </section> */}