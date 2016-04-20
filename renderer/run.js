require('./console')
var mocha = require('../mocha')
var ipc
try {
  ipc = require('electron').ipcRenderer
} catch (e) {
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

opts.preload.forEach(function (script) {
  var tag = document.createElement('script')
  tag.src = script
  tag.async = false
  document.head.appendChild(tag)
})

window.addEventListener('load', function () {
  mocha.run(opts, function (failureCount) {
    ipc.send('mocha-done', failureCount)
  })
})
