const { log } = require('./utils')
const { dig, burry, bark } = require('./lillyBurry')
const github = require('./github')

module.exports = function(incomingText, responseUrl) {
  let [ key, value ] = incomingText.split(' ')
  let stick = dig()
  stick.set[key] = value
  burry(stick)
  bark(responseUrl)(`Alright, I will remember \`${key}\` is \`\`\`${value}\`\`\``)
}
