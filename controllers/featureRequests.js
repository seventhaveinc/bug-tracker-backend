const express = require("express")
const router = express.Router()
const Feature = require("../models/featureRequest");

// Index
router.get('/', (req, res) => {
  Feature.find({}, (error, allFeatures) => {
    if (error) {
      console.error(error)
    } else {
      console.log(allFeatures)
      res.send(allFeatures)
    }
  })
})

// New

// Delete
router.delete('/:id', (req, res) => {
  Feature.findByIdAndRemove(req.params.id, (error, feature) => {
    if (error) {
      console.error(error)
      res.sendStatus(500)
    } else {
      console.log('Successfully Deleted')
      res.sendStatus(200)
    }
  })
})

// Update
router.put('/:id', (req, res) => {
  Feature.findByIdAndUpdate(req.params.id, req.body, (error, foundFeature) => {
    if (error) {
      console.error(error)
      res.sendStatus(400)
    } else {
      res.send(foundFeature);
    }
  })
})

// Create
router.post('/', (req, res) => {
  console.log(req.body)
  Feature.create(req.body, (error, createdFeature) => {
    if (error) {
      console.error(error)
      res.sendStatus(400)
    } else {
      res.sendStatus(200)
    }
  })
})

// Edit

// Show
router.get('/:id', (req, res) => {
  Feature.findById(req.params.id, (error, foundFeature) => {
    if (error) {
      console.error(error)
      res.sendStatus(400)
    } else {
      res.send(foundFeature)
    }
  })
})

module.exports = router