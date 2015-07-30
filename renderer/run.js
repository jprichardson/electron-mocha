require('./console')
var ipc = require('ipc')
var mocha = require('../mocha')


// consider hooking up to mocha
/* window.onerror = function (message, filename, lineno, colno, err) {
  console.log(err.message)
  console.log(err.stack)
}*/

// console.log(JSON.stringify(window.__args__, null, 2))
mocha.run(window.__args__, function (failureCount) {
  ipc.send('mocha-done', failureCount)
})
