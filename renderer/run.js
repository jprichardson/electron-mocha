const opts = window.__args__

if (!opts.interactive) {
  require('./console')
}

const mocha = require('../mocha')
const { ipcRenderer: ipc } = require('electron')

// Expose mocha
window.mocha = require('mocha')

try {
  opts.preload.forEach((script) => {
    const tag = document.createElement('script')
    tag.src = script
    tag.async = false
    document.head.appendChild(tag)
  })
} catch (error) {
  ipc.send('mocha-error', {
    message: error.message,
    stack: error.stack
  })
}

ipc.send('mocha-ready-to-run')

ipc.on('mocha-start', () => {
  try {
    mocha.run(opts, (...args) => {
      ipc.send('mocha-done', ...args)
    })
  } catch ({ message, stack }) {
    ipc.send('mocha-error', { message, stack })
  }
})
