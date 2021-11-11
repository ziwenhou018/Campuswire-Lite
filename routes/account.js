const express = require('express')

const isAuthenticated = require('../middlewares/isAuthenticated')
const User = require('../models/user')

const router = express.Router()

router.post('/signup', async (req, res) => {
  const { username, password } = req.body
  try {
    await User.create({ username, password })
    res.send('created user')
  } catch (err) {
    console.log(err)
    res.send('signup problems')
  }
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (user) {
      if (password == user.password) {
        req.session.username = username
        req.session.password = password
        res.send('logged in')
      } else {
        res.send('wrong pass')
      }
    } else {
      res.send('cant find acc with that username')
    }
  } catch (err) {
    console.log(err)
    res.send('login problems')
  }
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = null
  req.session.password = null
  res.send('logged out')
})

module.exports = router
