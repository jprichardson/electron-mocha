const { files, ...opts } = window.__args__

if (!opts.interactive) {
  require('./console')
}

const { Mocha, helpers } = require('../mocha')
const { ipcRenderer: ipc } = require('electron')

// Expose Mocha for browser tests
window.mocha = Mocha

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

handleScripts(opts.script)

ipc.on('mocha-start', () => {
  try {
    helpers.runMocha(opts, files, (...args) => {
      ipc.send('mocha-done', ...args)
    })
  } catch ({ message, stack }) {
    ipc.send('mocha-error', { message, stack })
  }
})

// Request re-run on reload in --interactive mode
ipc.send('mocha-ready-to-run')
