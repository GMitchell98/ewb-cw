import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import auth from '../auth/auth-helper'
import { Redirect } from 'react-router-dom'
import { getcat, addCatClick } from './api-cat'

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


  function Cats({ match }) { 
    const classes = useStyles()
    const [cat, setCat] = useState("")
    const jwt = auth.isAuthenticated()
    const [redirectToSignin, setRedirectToSignin]=useState(false)
    

    useEffect(() => {
      const abortController = new AbortController()
  
      newCat()
  
      return function cleanup(){
        abortController.abort()
      }
    }, [])

    function addClick(){

      addCatClick({
        userId: match.params.userId
      }, {
        t: jwt.token
      }).then((data) => {
        if (data && data.error) {
          console.log(data.error)
        } else {
          console.log('Cat click added!')
        }
      }, [match.params.userId])

    }

    function newCat() {
      const abortController = new AbortController()
      const signal = abortController.signal

      getcat({userId: match.params.userId},{t: jwt.token}, signal).then((data) => {
        if (data && data.error) {
          setRedirectToSignin({redirectToSignin: true})
        } else {
          console.log("Here is the cat img")
          console.log(data.data.file)
          setCat(data.data.file)
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
          Cats
        </Typography>
        <CardMedia>
              <img src={cat} alt="Click the button to fetch a cat pic :)"/>
        </CardMedia>
        <CardContent>
          <Button color="primary" variant="contained" onClick={newCat}  className={classes.submit}> Fetch a random Cat </Button>
        </CardContent>
  </Card>
);
}

export default Cats