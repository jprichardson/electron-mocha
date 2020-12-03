const { ipcRenderer: ipc } = require('electron')

const { hasOwnProperty } = Object.prototype

const fakeConsole = {
  assert (assertion, ...args) {
    if (!assertion) fakeConsole.log(...args)
  }
}

for (const k in console) {
  if (hasOwnProperty.call(console, k) && k !== 'assert') {
    fakeConsole[k] = (...args) => ipc.send('console-call', k, args)
  }
}
global.__defineGetter__('console', function () {
  return fakeConsole
})
