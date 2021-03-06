const fs = require('fs')
const c = require('./constants')
const request = require('request')
const stickFile = './stick.json'

const dig = function() {
  if (fs.existsSync(stickFile)) {
    let stick = fs.readFileSync(stickFile)
    return JSON.parse(stick)
  }
  return { following: [], set: {}, alert: {} }
}
const burry = function(stick) {
  fs.writeFileSync(stickFile, JSON.stringify(stick, null, 2))
}
const bark = function(responseUrl, lillyPic) {
  let icon_url = lillyPic || c.avatars.happy
  return barked => {
    let text = `${c.emojis.bark} _Woof! Woof!_\n${barked}`
    let response_type = 'in_channel'
    request.post({
      url: responseUrl,
      json: { response_type, text, icon_url }
    }, (err, res, body) => {
      // console.log(`Reply error: ${err}`)
      // console.log(`Reply body: ${body}`)
    })
  }
}
const barkToProblem = function(responseUrl) {
  return error => {
    let text = `${c.emojis.bark} _Woof! Woof!_\n> ${error.message}`
    let response_type = 'in_channel'
    request.post({
      url: responseUrl,
      json: { response_type, text, icon_url: c.avatars.angry }
    }, (err, res, body) => {
      // console.log(`Reply error: ${err}`)
      // console.log(`Reply body: ${body}`)
    })
  }
}

module.exports = { dig, burry, bark, barkToProblem }
