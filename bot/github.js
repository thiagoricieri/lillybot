const c = require('./constants')
const octokit = require('@octokit/rest')()
octokit.authenticate({
  type: 'token',
  token: c.env.githubToken
})
module.exports = octokit
