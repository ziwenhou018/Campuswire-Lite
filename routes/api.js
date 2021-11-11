const express = require('express')

const isAuthenticated = require('../middlewares/isAuthenticated')
const Question = require('../models/question')

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const questions = await Question.find()
    res.send(questions)
  } catch (err) {
    console.log(err)
    res.send('fetch problems')
  }
})

router.post('/add', isAuthenticated, async (req, res) => {
  const { questionText } = req.body
  try {
    await Question.create({
      questionText,
      answer: '',
      author: req.session.username,
    })
    res.send('added q')
  } catch (err) {
    console.log(err)
    res.send('add problems')
  }
})

router.post('/answer', isAuthenticated, async (req, res) => {
  const { _id, answer } = req.body
  try {
    await Question.updateOne({ _id }, { answer })
    res.send('added answer')
  } catch (err) {
    console.log(err)
    res.send('answer problems')
  }
})

module.exports = router
