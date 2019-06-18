const { files, ...opts } = window.__args__

if (!opts.interactive) {
  require('./console')
}

const { Mocha, helpers } = require('../lib/mocha')
const { ipcRenderer: ipc } = require('electron')

const handleScripts = (scripts = []) => {
  for (let script of scripts) {
    let tag = document.createElement('script')
    tag.src = script
    tag.async = false
    tag.onerror = () => {
      ipc.send('mocha-warn', {
        message: `script not found: ${script}`
      })
    }
    document.head.appendChild(tag)
  }
}

const fail = error => {
  ipc.send('mocha-error', {
    message: error.message,
    stack: error.stack
  })
}

process.on('SIGINT', () => console.log('sigint'))
// Expose Mocha for browser tests
window.mocha = Mocha

handleScripts(opts.script)

let finished = false

ipc.on('mocha-start', () => {
  try {
    helpers.runMocha(opts, files, (...args) => {
      // this callback runs twice for some reasons
      // but we only want to send 'mocha-done' once
      if (!finished) {
        ipc.send('mocha-done', ...args)
        finished = true
      }
    })
  } catch (error) {
    fail(error)
  }
})

// Request re-run on reload in --interactive mode
ipc.send('mocha-ready-to-run')
