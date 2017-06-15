const path = require('path')
const express = require('express')
const passport = require('./passport')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const auth = require('./lib/auth')
const api = require('./routes/index')
const usersDb = './db/users'

const skEventSearch = require('./routes/skEvents')
const skGetAreaID = require('./routes/skMetro')
const index = require('./routes/index')


const app = express()

app.set('JWT_SECRET', process.env.JWT_SECRET)

app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../public')))

passport(app)

// routes here
app.use('/api/v1/events', skEventSearch)
app.use('/api/v1/metros', skGetAreaID)
app.use('/', index)

module.exports = (connection) => {
  app.set('connection', connection)
  return app
}
