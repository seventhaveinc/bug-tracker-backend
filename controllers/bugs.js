const express = require("express")
const router = express.Router()
const Bug = require("../models/bug");

// Index
router.get('/', (req, res) => {
  Bug.find({}, (error, allBugs) => {
    if (error) {
      console.error(error)
    } else {
      console.log(allBugs)
      res.send(allBugs)
    }
  })
})

// New

// Delete
router.delete('/:id', (req, res) => {
  Bug.findByIdAndRemove(req.params.id, (error, bug) => {
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
  Bug.findByIdAndUpdate(req.params.id, req.body, (error, foundBug) => {
    if (error) {
      console.error(error)
      res.sendStatus(400)
    } else {
      res.send(foundBug);
    }
  })
})

// Create
router.post('/', (req, res) => {
  console.log(req.body)
  Bug.create(req.body, (error, createdBug) => {
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
  Bug.findById(req.params.id, (error, foundBug) => {
    if (error) {
      console.error(error)
      res.sendStatus(400)
    } else {
      res.send(foundBug)
    }
  })
})

module.exports = router