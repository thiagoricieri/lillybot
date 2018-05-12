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
      , channelId = httpReq.body.channel_id
      , channelName = httpReq.body.channel_name
      , userId = httpReq.body.user_id
      , userName = httpReq.body.user_name
      , incomingText = httpReq.body.text
      , responseUrl = httpReq.body.response_url
      , triggerId = httpReq.body.trigger_id

    if (challenge) {
      httpRes.status(200).type('plain').send(challenge)
      return
    }

    console.log(httpReq.body);
    httpRes.status(200).type('json').send()
  })
}
