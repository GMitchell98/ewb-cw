import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import myImg from './../assets/images/myimage.png'
import {Link} from 'react-router-dom'
import auth from './../auth/auth-helper'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  media: {
    minHeight: 400
  },
  credit: {
    padding: 10,
    textAlign: 'right',
    backgroundColor: '#ededed',
    borderBottom: '1px solid #d0d0d0',
    '& a':{
      color: '#3f4771'
    } 
  }
}))

export default function Home(){
  const classes = useStyles()
    return (
        <Card className={classes.card}>
          <Typography variant="h6" className={classes.title}>
            Welcome to Cats || Dogs
          
          </Typography>
          <CardMedia className={classes.media} image={myImg} title="My Image"/>
          <Typography variant="body2" component="p" className={classes.credit} color="textSecondary"> Photo by Alexis Chloe on Upsplash </Typography>
          <CardContent>
          {
          !auth.isAuthenticated() && (<span>
          <Typography variant="body1" component="p">
              To start viewing the pictures of dogs or catss please
            <Link to="/signin"> Sign in </Link>
            or 
            <Link to="/signup"> Sign up. </Link>
            </Typography>
            </span>)
            }
            {
        auth.isAuthenticated() && (<span>
          <Typography variant="body1" component="p">
              Hello click the links to view the 
            <Link to={"/dog/"+ auth.isAuthenticated().user._id}> Dogs </Link>
            or 
            <Link to={"/cat/"+ auth.isAuthenticated().user._id}> Cats </Link>
            </Typography>
        </span>)
      }
            
          </CardContent>
        </Card>
    )
}

