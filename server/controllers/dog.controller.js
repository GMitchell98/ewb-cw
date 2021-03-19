import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'


const fetch = require('node-fetch')

//fetch a dog from the dog API
const getdog = async (req, res) => {
    try{
        fetch('https://dog.ceo/api/breeds/image/random')
        .then(res => res.json())
        .then(data =>{res.send({data});})

    } catch (err) {
        return res.status('400').json({
            error: "Could not get a dog"
          })
    }
}
//fetch the cat pict from the random cat API
const getcat = async (req, res) => {
    try{
        fetch('https://aws.random.cat/meow')
        .then(res => res.json())
        .then(data => {res.send({data});})

    } catch (err) {
        return res.status('400').json({
            error: "Could not get a cat"
          })
    }
}
//add view click
const addDogClick = async (req, res) => {
  try {
    let user = req.profile
    user.dogclicks = user.dogclicks + 1
    await user.save()
    user.hashed_password = undefined
    user.salt = undefined
    res.json(user)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}
//add view click
const addCatClick = async (req, res) => {
  try {
    let user = req.profile
    user.catclicks = user.catclicks + 1
    await user.save()
    user.hashed_password = undefined
    user.salt = undefined
    res.json(user)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

//add dog like
const addDogLike = async (req, res) => {
  try {
    let user = req.profile
    user.doglikes = user.doglikes + 1
    await user.save()
    user.hashed_password = undefined
    user.salt = undefined
    res.json(user)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}
//remove dog like
const removeDogLike = async (req, res) => {
  try {
    let user = req.profile
    user.doglikes = user.doglikes - 1
    await user.save()
    user.hashed_password = undefined
    user.salt = undefined
    res.json(user)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}
//add cat likes
const addCatLike = async (req, res) => {
  try {
    let user = req.profile
    user.catlikes = user.catlikes + 1
    await user.save()
    user.hashed_password = undefined
    user.salt = undefined
    res.json(user)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}
//remove cat likes
const removeCatLike = async (req, res) => {
  try {
    let user = req.profile
    user.catlikes = user.catlikes - 1
    await user.save()
    user.hashed_password = undefined
    user.salt = undefined
    res.json(user)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}



export default {
    getdog,
    getcat,
    addDogClick,
    addCatClick,
    addDogLike,
    addCatLike,
    removeDogLike,
    removeCatLike
  }
  