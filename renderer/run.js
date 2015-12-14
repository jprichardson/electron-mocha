require('./console')
var mocha = require('../mocha')
var ipc
// Check if electron version is >0.35.0
var electronV = process.versions['electron'].split('.')
if (parseInt(electronV[1], 10) >= 35 && electronV[0] === '0') {
  var electron = require('electron')
  ipc = electron.ipcMain
} else {
  ipc = require('ipc')
}

// Expose mocha
window.mocha = require('mocha')

window.onerror = function (message, filename, lineno, colno, err) {
  ipc.send('mocha-error', {
    message: message,
    filename: filename,
    err: err,
    stack: err.stack
  })
}

var opts = window.__args__
// console.log(JSON.stringify(opts, null, 2))

opts.require.forEach(function (mod) {
  require(mod)
})

mocha.run(opts, function (failureCount) {
  ipc.send('mocha-done', failureCount)
})
