const { log } = require('./utils')
const { dig, burry, bark, barkToProblem } = require('./lillyBurry')
const c = require('./constants')
const github = require('./github')

module.exports = function() {
  let lilly = dig()
  lilly.following.forEach(each => {
    let hook = each.hook
    if (hook.indexOf('https://') == -1) {
      hook = lilly.set[each.hook]
      if (!hook) return
    }
    if (!lilly.alert[each.repo] || lilly.alert.length == 0) return
    Promise.resolve(each)
      .then(pullRepoRequests)
      .then(filterDelayedPullRequests)
      .then(formatMessage(hook, each.repo, lilly.alert[each.repo]))
      .catch(barkToProblem(hook))
  })
}

const pullRepoRequests = function(bundle) {
   return github.pullRequests.getAll({
    owner: c.env.githubOrg,
    repo: bundle.repo
  })
  .then(({ data }) => { return { data, ...bundle } })
}
const filterDelayedPullRequests = function(bundle) {
  let data = bundle.data
  .map(d => {
    d.created = new Date(d.created_at).getTime()
    d.updated = new Date(d.updated_at).getTime()
    d.closed = d.closed_at ? new Date(d.closed_at).getTime() : null
    d.merged = d.merged_at ? new Date(d.merged_at).getTime() : null
    let now = new Date().getTime()
    let diff = now - d.created
    let daysOpened = Math.ceil(diff/(1000 * 60 * 60 * 24))
    d.daysOpened = daysOpened
    return d
  })
  .filter(d => !d.merged && d.daysOpened > c.maxDaysOpened)
  bundle.data = data
  return bundle
}
const formatMessage = function(responseUrl, repo, alerting) {
  return bundle => {
    if (bundle.data.length > 0) {
      let usersAnswers = alerting.map(u => `<${u}>`).join(', ')
      let plural = bundle.data.length > 1 ? 's' : ''
      let count = bundle.data.length
      let prs = bundle.data.map(d => `> PR #${d.number} _"${d.title}"_ is *${d.daysOpened} days old*.\n><${d.html_url}>`).join('\n')
      bark(responseUrl)(`${usersAnswers}, I found *${count}* opened pull${plural} request${plural} in \`${repo}\`\n${prs}`)
    }
  }
}
