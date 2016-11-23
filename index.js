'use strict'

var fs = require('fs-extra')
var path = require('path')
var window = require('electron-window')
var getOptions = require('mocha/bin/options')
var args = require('./args')
var mocha = require('./mocha')
var { app, ipcMain: ipc } = require('electron')

// load mocha.opts into process.argv
getOptions()

// parse args
var opts = args.parse(process.argv)

var tmpdir = fs.mkdtempSync(path.join(app.getPath('temp'), 'electron-mocha-'))
app.setPath('userData', tmpdir)

app.on('quit', () => {
  fs.removeSync(tmpdir)
})

// do not quit if tests open and close windows
app.on('window-all-closed', () => {})

app.on('ready', () => {
  if (opts.requireMain.length === 1) {
    try {
      require(opts.requireMain[0])
    } catch (error) {
      fail(error)
    }
  }

  if (opts.interactive) {
    opts.renderer = true
    opts.debug = true
    opts.colors = false
  }

  if (!opts.renderer) {
    try {
      mocha.run(opts, count => app.exit(count))
    } catch (error) {
      fail(error)
    }
  } else {
    var win = window.createWindow({
      height: 700,
      width: 1200,
      focusable: opts.debug,
      webPreferences: { webSecurity: false }
    })

    if (!opts.debug && process.platform === 'darwin') {
      app.dock.hide()
    }

    win.on('ready-to-show', () => {
      if (opts.debug) {
        win.show()
        win.webContents.openDevTools()
        win.webContents.on('devtools-opened', () => {
          // Debugger is not immediately ready!
          setTimeout(() => {
            win.webContents.send('mocha-start')
          }, 250)
        })
      } else {
        win.webContents.send('mocha-start')
      }
    })

    var indexPath = path.resolve(path.join(__dirname, './renderer/index.html'))
    // undocumented call in electron-window
    win._loadURLWithArgs(indexPath, opts, () => {})
    // win.showURL(indexPath, opts)
    ipc.on('mocha-done', (event, count) => {
      win.webContents.once('destroyed', () => app.exit(count))
      if (!opts.interactive) {
        win.close()
      }
    })
    ipc.on('mocha-error', (_, error) => fail(error))
  }
})

function fail (error) {
  console.error(error.message)
  console.error(error.stack)
  app.exit(1)
}
