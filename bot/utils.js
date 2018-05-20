module.exports = {
  log: function(msg) {
    console.log(JSON.stringify(msg, null, 2))
    return msg
  }
}
