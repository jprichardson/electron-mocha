const { ipcRenderer: ipc } = require('electron')
const { files, ...opts } = window.__args__

if (!opts.interactive) {
  require('./console')
}

const fail = error => {
  ipc.send('mocha-error', {
    message: error.message || error,
    stack: error.stack
  })
}

try {
  const { Mocha, helpers } = require('../lib/mocha')

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

  // Expose Mocha for browser tests
  window.mocha = Mocha

  handleScripts(opts.script)

  ipc.on('mocha-start', () => {
    try {
      helpers.runMocha(opts, files, (...args) => {
        ipc.send('mocha-done', ...args)
      })
    } catch (e) {
      fail(e)
    }
  })

  // Request re-run on reload in --interactive mode
  ipc.send('mocha-ready-to-run')
} catch (e) {
  fail(e)
}
