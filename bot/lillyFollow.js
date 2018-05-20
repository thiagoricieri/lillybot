const { log } = require('./utils')
const { dig, burry, bark, barkToProblem } = require('./lillyBurry')
const github = require('./github')

module.exports = function(repo, responseUrl) {
  Promise.resolve(dig())
    .then(notFollowingRepo(repo))
    .then(pullRepoRequests)
    .then(burryRepo)
    .then(log)
    .then(followingAlright)
    .then(bark(responseUrl))
    .catch(barkToProblem(responseUrl))
}

const notFollowingRepo = function(repo) {
  return stick => {
    if (stick && stick.following && stick.following.includes(repo)) {
      throw new Error(`I'm already following \`${repo}\`!`)
    }
    return { stick, repo }
  }
}
const pullRepoRequests = function(bundle) {
   return github.pullRequests.getAll({
    owner: process.env.GITHUB_ORG,
    repo: bundle.repo
  })
  .then(data => bundle)
}
const burryRepo = function({ stick, repo }) {
  if (!stick.following) stick.following = []
  stick.following.push(repo)
  burry(stick)
  return { stick, repo }
}
const followingAlright = function({ stick, repo }) {
  return `Alright! I started following \`${repo}\`. I'm now following *${stick.following.length}* repositories.`
}
