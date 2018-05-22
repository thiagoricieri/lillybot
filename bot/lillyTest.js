const { log } = require('./utils')
const { dig, burry, bark, barkToProblem } = require('./lillyBurry')
const c = require('./constants')
const github = require('./github')

const pullRepoRequests = function(repo) {
  log(repo)
  log(c.env)
  return github.pullRequests.getAll({
    owner: c.env.githubOrg,
    repo
  })
}

console.log('woof!')
