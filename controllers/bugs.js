const express = require("express")
const router = express.Router()
const Form = require("../models/form");

// Index
router.get('/', (req, res) => {
  Form.find({}, (error, allForms) => {
    if (error) {
      console.error(error)
    } else {
      console.log(allForms)
      res.send(allForms)
    }
  })
})

// New

// Delete
router.delete('/:id', (req, res) => {
  Form.findByIdAndRemove(req.params.id, (error, form) => {
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
  Form.findByIdAndUpdate(req.params.id, req.body, (error, foundForm) => {
    if (error) {
      console.error(error)
      res.sendStatus(400)
    } else {
      res.send(foundForm);
    }
  })
})

// Create
router.post('/', (req, res) => {
  console.log(req.body)
  Form.create(req.body, (error, createdForm) => {
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
  Form.findById(req.params.id, (error, foundForm) => {
    if (error) {
      console.error(error)
      res.sendStatus(400)
    } else {
      res.send(foundForm)
    }
  })
})

module.exports = router