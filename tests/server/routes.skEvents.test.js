var test = require('ava')
var request = require('supertest')
var nock = require('nock')
require('dotenv').config()

var environment = process.env.NODE_ENV || 'development'
var dbConfig = require('../../knexfile')[environment]
var connection = require('knex')(dbConfig)

var isTest = true

const server = require('../../server/server')
let app = server(connection, isTest)

test.cb('API route /events/locationID returns a json', (t) => {
  const data = {
    resultsPage: {
      results: {
        event: []
      }
    }
  }
    var scope = nock('http://api.songkick.com')
          .get(`/api/3.0/metro_areas/31455/calendar.json?apikey=${process.env.SONGKICK_API}`)
          .reply(200, data)

    request(app)
    .get('/api/v1/events/31455')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((res) => {
      scope.done()
      t.true(res.body.hasOwnProperty('events'))
      t.true(res.body.hasOwnProperty('artists'))
      t.end()
      })
    })
