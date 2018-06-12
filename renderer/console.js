const { remote } = require('electron')
const remoteConsole = remote.require('console')

// we have to do this so that mocha output doesn't look like shit
console.log = function () {
  remoteConsole.log.apply(remoteConsole, arguments)
}

console.dir = function () {
  remoteConsole.dir.apply(remoteConsole, arguments)
}
