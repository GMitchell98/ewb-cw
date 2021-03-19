import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ArrowForward from '@material-ui/icons/ArrowForward'
import Person from '@material-ui/icons/Person'
import {Link} from 'react-router-dom'
import {listadmin} from './api-user.js'
import auth from './../auth/auth-helper'

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  }
}))

export default function UsersAdmin({ match }) { 
  const classes = useStyles()
  const [users, setUsers] = useState([])
  const jwt = auth.isAuthenticated()
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalCat, setTotalCat] = useState(0)
  const [totalDog, setTotalDog] = useState(0)
  const [totalCatLikes, setTotalCatLikes] = useState(0)
  const [totalDogLikes, setTotalDogLikes] = useState(0)
  const [showMetrics, setShowMetrics] =useState(false)

  //function that counts the metrics by looping through the users
  function countMetrics(){
    var cat =0
    var dog =0
    var total=0
    var catlikes =0
    var doglikes =0
    for(var i = 0; i < users.length; i++) {
      var obj = users[i]
      cat = cat + obj.catclicks
      dog = dog + obj.dogclicks
      catlikes =catlikes +obj.catlikes
      doglikes =doglikes +obj.doglikes
      total = total +1
    }
    //get the percentage of likes from views
    var doglikerate = (doglikes/dog)*100
    var catlikerate = (catlikes/cat)*100
    // fixed to 2 decimal places
    doglikerate = doglikerate.toFixed(2)
    catlikerate = catlikerate.toFixed(2)
    setTotalCat(cat)
    setTotalDog(dog)
    setTotalDogLikes(doglikerate)
    setTotalCatLikes(catlikerate)
    setTotalUsers(total)
    switchMetrics()
  }

  function switchMetrics(){
    if(showMetrics){
      setShowMetrics(false)
    }
    else{
      setShowMetrics(true)
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listadmin({userId: match.params.userId}, {t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
      	//console.log("Here is the user data")
      	//console.log(data)
        setUsers(data)
      }
    })
    return function cleanup(){
      abortController.abort()
    }
  }, [match.params.userId])


    return (
      <Paper className={classes.root} elevation={4}>
        <div>
        <Button color="primary" variant="contained" onClick={countMetrics}  className={classes.submit}> Show metrics </Button>
        </div>
        {
          showMetrics && (<span>
        <Typography variant="h6" className={classes.title}>
          Total Number of Users: {totalUsers} 
        </Typography>
        <Typography variant="h6" className={classes.title}>
          Total Number of Cat Clicks: {totalCat} 
        </Typography>
        <Typography variant="h6" className={classes.title}>
          Total Number of Dog Clicks: {totalDog} 
        </Typography>
        <Typography variant="h6" className={classes.title}>
          Percentage of Dog likes to views: {totalDogLikes + "%"} 
        </Typography>
        <Typography variant="h6" className={classes.title}>
        Percentage of Cat likes to views: {totalCatLikes + "%"}  
        </Typography></span>)
        }
        <Typography variant="h6" className={classes.title}>
          List of Users
        </Typography>
        <List dense>
         {users.map((item, i) => {
          return <Link to={"/user/" + item._id} key={i}>
                    <ListItem button>
                      <ListItemAvatar>
                        <Avatar>
                          <Person/>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item.name}/>
                      <ListItemText primary={"Administrator: " + item.admin}/>
                      <ListItemText primary={"Dog views: " + item.dogclicks}/>
                      <ListItemText primary={"Cat views: " + item.catclicks}/>
                      <ListItemText primary={"Dog likes: " + item.doglikes}/>
                      <ListItemText primary={"Cat likes: " + item.catlikes}/>
                    </ListItem>
                 </Link>
               })
             }
        </List>
      </Paper>
    )
}
