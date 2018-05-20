const { log } = require('./utils')
const { dig, burry, bark, barkToProblem } = require('./lillyBurry')
const github = require('./github')

module.exports = function(repoAndHook, responseUrl) {
  Promise.resolve(dig())
    .then(notFollowingRepo(repoAndHook))
    .then(pullRepoRequests)
    .then(burryRepo)
    .then(log)
    .then(followingAlright)
    .then(bark(responseUrl))
    .catch(barkToProblem(responseUrl))
}

const notFollowingRepo = function(repoAndHook) {
  let [ repo, hook ] = repoAndHook.split(' ')
  return stick => {
    if (stick && stick.following && stick.following.filter(f => f.repo == repo).length > 0) {
      throw new Error(`I'm already following \`${repo}\`!`)
    }
    return { stick, repo, hook }
  }
}
const pullRepoRequests = function(bundle) {
   return github.pullRequests.getAll({
    owner: process.env.GITHUB_ORG,
    repo: bundle.repo
  })
  .then(data => bundle)
}
const burryRepo = function({ stick, repo, hook }) {
  if (!stick.following) stick.following = []
  stick.following.push({ repo, hook })
  burry(stick)
  return { stick, repo }
}
const followingAlright = function({ stick, repo }) {
  return `Alright! I started following \`${repo}\`. I'm now following *${stick.following.length}* repositories.`
}
