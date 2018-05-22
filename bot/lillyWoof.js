const { log } = require('./utils')
const { dig, burry, bark } = require('./lillyBurry')
const c = require('./constants')
const lillySniff = require('./lillySniff')

module.exports = function(incomingText, responseUrl) {
  let [ key, value ] = incomingText.split(' ')
  let stick = dig()
  if (key == 'alert') {
    let pattern = /alert (.+) in (.+)/i
    let found = incomingText.match(pattern)
    if (found) {
      let users = found[1].split(',')
        .map(u => u.replace(' ', ''))
        .filter(u => u.indexOf('@') == 0)
      let repos = found[2].split(',').map(u => u.replace(' ', ''))

      repos.forEach(repo => {
        stick.alert[repo] = users
      })
      burry(stick)

      let usersAnswers = users.map(u => `<${u}>`).join(', ')
      let reposAnswers = repos.map(r => `*${r}*`).join(', ')
      bark(responseUrl)(`OK! I will alert ${usersAnswers} of updates in ${reposAnswers}`)
    }
    else {
      bark(responseUrl)(`I can't understand this *alert* command!`)
    }
  }
  else if (key == 'sniff') {
    lillySniff()
  }
  else if (key == 'hello') {
    bark(responseUrl, c.avatars.happy)(``)
  }
  else if (key == 'bark') {
    bark(responseUrl, c.avatars.angry)(``)
  }
  else {
    bark(responseUrl)(`I don't know what *${key}* means.`)
  }
}
