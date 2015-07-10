var remote = require('remote')
var remoteConsole = remote.require('console')
var util = require('util')

// we have to do this so that mocha output doesn't look like shit
console.log = function () {
  remoteConsole.log.apply(remoteConsole, arguments)
}

console.dir = function () {
  remoteConsole.dir.apply(remoteConsole, arguments)
}

// if we don't do this, we get socket errors and our tests crash
process.stdout.write = function (msg) {
  remoteConsole.log.apply(remoteConsole, arguments)
}
