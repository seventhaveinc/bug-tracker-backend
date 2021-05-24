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
      res.send('allForms')
    }
  })
})

// New

// Delete
router.delete('/:id', (req, res) => {
  Form.findMyIdAndRemove(req.params.id, (error, form) => {
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

})

// Create
router.post('/', (req, res) => {
  
})

// Edit
router.get('/:id/edit', (req, res) => {

})

// Show
router.get('/:id', (req, res) => {

})