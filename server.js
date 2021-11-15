const express = require('express')
const mongoose = require('mongoose')
const session = require('cookie-session')

const AccountRouter = require('./routes/account')
const ApiRouter = require('./routes/api')

const app = express()

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.json())

app.use(
  session({
    name: 'account',
    keys: ['key1'], // what does this do?
  })
)

app.get('/', (req, res) => {
  if (req.session.username && req.session.password) {
    res.send(`Hello ${req.session.username}!`)
  } else {
    res.send('Please log in')
  }
})

app.use('/account', AccountRouter)
app.use('/api/questions', ApiRouter)

app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).send('There was an error!')
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})
