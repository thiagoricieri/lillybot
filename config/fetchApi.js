const constants = require('./constants')
    , request = require('request')

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

const plutoChannels = function() {
  return _promiseWithUrl(
    constants.channels.params,
    constants.channels.api
  )
}

const plutoMovies = function() {
  return _promiseWithUrl(
    constants.vod.params,
    constants.vod.categories
  )
}

const plutoEpisodes = function(seriesId) {
  return _promiseWithUrl(
    constants.vod.params,
    `${constants.vod.series}${seriesId}/seasons`
  )
}

module.exports = {
  channels: plutoChannels,
  vod: plutoMovies,
  episodes: plutoEpisodes
}
