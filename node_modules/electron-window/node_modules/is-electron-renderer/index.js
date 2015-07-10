
function isRenderer () {
  return global && global.constructor && global.constructor.name === 'Window'
}

module.exports = isRenderer()
