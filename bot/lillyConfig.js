const { log } = require('./utils')
const { dig, burry } = require('./lillyBurry')
const github = require('./github')

module.exports = function(incomingText) {
  github.pullRequests.getAll({
    owner: process.env.GITHUB_ORG,
    repo: incomingText
  })
  .then(({ data }) => {
    log(data.map(e => e))
  })
}
