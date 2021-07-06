const express = require("express")
const router = express.Router()
const Feature = require("../models/featureRequest");
const axios = require('axios');
const apiURL = process.env.API_URL;
const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jwt-simple');

const verify = async (bigToken) => {
  const { username, token } = jwt.decode(bigToken, jwtSecret)
  const response = await axios.post(apiURL + 'users/verify', {
    token: token,
    username: username,
    branch: 'staging'
  })
  if (response.data.username){
    return true;
  } else {
    return false;
  }
}

// Index
router.get('/', (req, res) => {
  if (verify(req.headers.token) === true) {
    Feature.find({}, (error, allFeatures) => {
      if (error) {
        console.error(error)
      } else {
        console.log(allFeatures)
        res.send(allFeatures)
      }
    })
  }
})

// New

// Delete
router.delete('/:id', (req, res) => {
  if (verify(req.headers.token) === true) {
    Feature.findByIdAndRemove(req.params.id, (error, feature) => {
      if (error) {
        console.error(error)
        res.sendStatus(500)
      } else {
        console.log('Successfully Deleted')
        res.sendStatus(200)
      }
    })
  }
})

// Update
router.put('/:id', (req, res) => {
  if (verify(req.headers.token) === true) {
    Feature.findByIdAndUpdate(req.params.id, req.body, (error, foundFeature) => {
      if (error) {
        console.error(error)
        res.sendStatus(400)
      } else {
        res.send(foundFeature);
      }
    })
  }
})

// Create
router.post('/', (req, res) => {
  if (verify(req.headers.token) === true) {
    Feature.create(req.body, (error, createdFeature) => {
      if (error) {
        console.error(error)
        res.sendStatus(400)
      } else {
        res.sendStatus(200)
      }
    })
  }
})

// Edit

// Show
router.get('/:id', (req, res) => {
  if (verify(req.headers.token) === true) {
    Feature.findById(req.params.id, (error, foundFeature) => {
      if (error) {
        console.error(error)
        res.sendStatus(400)
      } else {
        res.send(foundFeature)
      }
    })
  }
})

module.exports = router