const request = require('request')
const _promiseWithUrl = function(params, baseUrl) {
  return new Promise((resolve, reject) => {

    let queryStrings = qs.stringify(params)
    let url = `${baseUrl}?${queryStrings}`

    request(url, { json: true }, (err, res, body) => {
      if (err) reject(err)
      else resolve(body)
    })
  })
}
