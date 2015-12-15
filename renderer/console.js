var remote
try {
  remote = require('electron').remote
} catch(e) {
  remote = require('remote')
}
var remoteConsole = remote.require('console')

// we have to do this so that mocha output doesn't look like shit
console.log = function () {
  remoteConsole.log.apply(remoteConsole, arguments)
}

console.dir = function () {
  remoteConsole.dir.apply(remoteConsole, arguments)
}

// if we don't do this, we get socket errors and our tests crash
Object.defineProperty(process, 'stdout', {
  value: {
    write: function (msg) {
      remoteConsole.log.apply(remoteConsole, arguments)
    }
  }
})
