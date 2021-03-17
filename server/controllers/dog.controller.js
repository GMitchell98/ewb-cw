import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'


const fetch = require('node-fetch')


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



export default {
    getdog,
    getcat,
    addDogClick,
    addCatClick
  }
  