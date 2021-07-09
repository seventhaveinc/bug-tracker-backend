const express = require("express")
const router = express.Router()
const Feature = require("../models/featureRequest");
const axios = require('axios');
const apiURL = process.env.API_URL;
const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jwt-simple');

const verify = async (bigToken, needsInfo) => {
  const decoded = jwt.decode(bigToken, jwtSecret);
  try {
    const response = await axios.post(apiURL + 'users/verify', {
      token: decoded.token,
      username: decoded.username,
      version: 'staging'
    })
    if (needsInfo) {
    return response.data;
  } else if (!needsInfo && response.data.username) {
    return true;
  } else {
    return false;
  }
  } catch (error) {
    console.error(error);
  }
}

// Index
router.get('/', (req, res) => {
  if (verify(req.headers.token)) {
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
  if (verify(req.headers.token)) {
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
  if (verify(req.headers.token)) {
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
router.post('/', async (req, res) => {
  const data = await verify(req.headers.token, true)
  if (data.username) {
    const { username, email } = data
    const newFeature = {...req.body, username: username, email: email}
    Feature.create(newFeature, (error, createdFeature) => {
      if (error) {
        console.error(error)
        res.status(400).send({
          error: error
        })
      } else {
        console.log('done');
        res.send({
          status: 200
        });
      }
    })
  }
})

// Edit

// Show
router.get('/:id', (req, res) => {
  if (verify(req.headers.token)) {
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