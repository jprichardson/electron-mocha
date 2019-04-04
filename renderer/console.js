const { remote } = require('electron')
const remoteConsole = remote.require('console')

console.log = (...args) => {
  remoteConsole.log(...args)
}

console.dir = (...args) => {
  remoteConsole.dir(...args)
}
