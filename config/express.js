const express = require('express')
    , bodyParser = require('body-parser')
    , lillybot = require('../bot/lilly')

module.exports = function(){
  let app = express()

  app.use(bodyParser.urlencoded())
  app.use(bodyParser.json())

  lillybot(app)

  return app
}
