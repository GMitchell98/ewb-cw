import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { getdog, addDogClick, addDogLikeClick, removeDogLikeClick } from './api-dog'
import Button from '@material-ui/core/Button'
import auth from './../auth/auth-helper'
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 'auto',
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
    root: theme.mixins.gutters({
      padding: theme.spacing(1),
      margin: theme.spacing(5)
    }),
    title: {
      margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
      color: theme.palette.openTitle
    },
    media: {
      minHeight: 300,
    }


  }))

  
function Dogs({ match }) { 
      const classes = useStyles()
      const [dog, setDog] = useState("")
      const jwt = auth.isAuthenticated()
      const [redirectToSignin, setRedirectToSignin]=useState(false)
      const [liked, setLiked]=useState(false)
      

      useEffect(() => {
        const abortController = new AbortController()
    
        newDog()
    
        return function cleanup(){
          abortController.abort()
        }
      }, [])

      function likeClick(){
        if(liked){
          setLiked(false)
          //remove the like
          removeDogLikeClick({
            userId: match.params.userId
          }, {
            t: jwt.token
          }).then((data) => {
            if (data && data.error) {
              console.log(data.error)
            } else {
              console.log('Dog like added!')
            }
          }, [match.params.userId])
          
        }
        else{
          setLiked(true)
          //add a like
          addDogLikeClick({
            userId: match.params.userId
          }, {
            t: jwt.token
          }).then((data) => {
            if (data && data.error) {
              console.log(data.error)
            } else {
              console.log('Dog like added!')
            }
          }, [match.params.userId])
        }
      }

      function addClick(){

        addDogClick({
          userId: match.params.userId
        }, {
          t: jwt.token
        }).then((data) => {
          if (data && data.error) {
            console.log(data.error)
          } else {
            console.log('Dog click added!')
          }
        }, [match.params.userId])

      }

      function newDog() {
        const abortController = new AbortController()
        const signal = abortController.signal

        getdog({userId: match.params.userId},{t: jwt.token}, signal).then((data) => {
          if (data && data.error) {
            setRedirectToSignin({redirectToSignin: true})
          } else {
            console.log("Here is the dog img")
            setDog(data.data.message)
            setLiked(false)
            addClick()
          }

      }, [match.params.userId])
    }


    if (redirectToSignin) {
      return <Redirect to='/signin'/>
    }
  return (
    <Card className={classes.card}>
          <Typography variant="h6" className={classes.title}>
            Dogs
          </Typography>
          <CardMedia>
                <img src={dog} alt="Click the button to fetch a dog pic :)"/>
          </CardMedia>
          <CardContent>
            <Button color="primary" variant="contained" onClick={newDog}  className={classes.submit}> Fetch a random Dog </Button>
            {!liked &&(<span>
            <Button color="secondary" variant="contained" onClick={likeClick}  className={classes.submit}> Like </Button></span>)}
            {liked &&(<span>
            <Button color="secondary" variant="contained" onClick={likeClick}  className={classes.submit}> Disike </Button></span>)}
          </CardContent>
    </Card>
  );
}

export default Dogs