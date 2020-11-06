require('electron-window').parseArgs()

const { ipcRenderer: ipc } = require('electron')
const opts = window.__args__

if (opts.preload) {
  require(opts.preload)
}

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
    for (const script of scripts) {
      const tag = document.createElement('script')
      tag.src = script
      tag.async = false
      tag.onerror = () => {
        ipc.send('mocha-warn', {
          message: `script not found: ${script}`
        })
      }
      document.body.appendChild(tag)
    }
  }

  // Expose Mocha for browser tests
  window.mocha = Mocha

  window.addEventListener('load', () => handleScripts(opts.script))

  ipc.on('mocha-start', async () => {
    try {
      await helpers.runMocha({ ...opts }, (...args) => {
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
