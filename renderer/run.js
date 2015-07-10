var ipc = require('ipc')
var mocha = require('../mocha')

console.log(JSON.stringify(window.__args__, null, 2))
mocha.run(window.__args__, function (failureCount) {
  ipc.send('mocha-done', failureCount)
})
