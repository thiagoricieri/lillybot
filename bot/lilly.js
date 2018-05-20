const { log } = require('./utils')
const lillyFollow = require('./lillyFollow')
const lillyConfig = require('./lillyConfig')

module.exports = function(app) {
  /**
   * SLACK INTEGRATION
   * Supported commands:
   * /prfollow repo-name
   * /prconfig set value
   */
  app.post('/', (httpReq, httpRes) => {
    let challenge = httpReq.body.challenge
      , command = httpReq.body.command
      , teamId = httpReq.body.teamId
      , text = httpReq.body.text
      , channelId = httpReq.body.channel_id
      , channelName = httpReq.body.channel_name
      , userId = httpReq.body.user_id
      , userName = httpReq.body.user_name
      , responseUrl = httpReq.body.response_url
      , triggerId = httpReq.body.trigger_id

    if (challenge) {
      httpRes.status(200).type('plain').send(challenge)
      return
    }
    
    httpRes.status(200).type('json').send()

    log(httpReq.body)

    if (command == "/lillyfollow") lillyFollow(text, responseUrl)
    if (command == "/lillyconfig") lillyConfig(text, responseUrl)
  })
}
