const express = require("express")
const router = express.Router()
const Bug = require("../models/bug");
const axios = require('axios');
const apiURL = process.env.API_URL;
const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jwt-simple');

const verify = async (bigToken, needsInfo) => {
  const decoded = jwt.decode(bigToken, jwtSecret);
  console.log(decoded);
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
  }
}

// Index
router.get('/', (req, res) => {
  if (verify(req.headers.token, false)) {
    Bug.find({}, (error, allBugs) => {
      if (error) {
        console.error(error);
      } else {
        res.send(allBugs)
      }
    })
  } else {
    res.send({
      error: 'Authentication Failed'
    })
  }
})

// New

// Delete
router.delete('/:id', (req, res) => {
  if (verify(req.headers.token, false)) {
    Bug.findByIdAndRemove(req.params.id, (error, bug) => {
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
  if (verify(req.headers.token, false)) {
    console.log('verified');
    Bug.findByIdAndUpdate(req.params.id, req.body, (error, foundBug) => {
      if (error) {
        console.error(error)
        res.status(400).send({
          error: error
        })
      } else {
        res.send(foundBug);
      }
    })
  }
})

// Create
router.post('/', async (req, res) => {
  const data = await verify(req.headers.token, true)
  if (data.username) {
    const { username, email } = data
    const newBug = {...req.body, username: username, email: email}
    Bug.create(newBug, (error, createdBug) => {
      if (error) {
        console.error(error)
        res.status(400).send({
          error: error
        })
      } else {
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
  if (verify(req.headers.token) === true) {
    Bug.findById(req.params.id, (error, foundBug) => {
      if (error) {
        console.error(error)
        res.sendStatus(400)
      } else {
        res.send(foundBug)
      }
    })
  }
})

module.exports = router