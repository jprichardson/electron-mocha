'use strict'

var fs = require('fs-extra')
var path = require('path')
var window = require('electron-window')
var getOptions = require('mocha/bin/options')
var args = require('./args')
var mocha = require('./mocha')
var util = require('util')
var { app, ipcMain: ipc } = require('electron')

process.on('uncaughtException', (err) => {
  console.error(err)
  console.error(err.stack)
  app.exit(1)
})

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
  if (!opts.renderer) {
    mocha.run(opts, count => app.exit(count))
  } else {
    var win = window.createWindow({
      height: 700,
      width: 1200,
      webPreferences: { webSecurity: false }
    })

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
      win.on('closed', () => app.exit(count))
      win.close()
    })
    ipc.on('mocha-error', (event, data) => {
      writeError(data)
      app.exit(1)
    })
  }
})

function writeError (data) {
  process.stderr.write(util.format('\nError encountered in %s: %s\n%s',
    path.relative(process.cwd(), data.filename),
    data.message,
    data.stack))
}
