var fs = require('fs-extra')
var path = require('path')
var os = require('os')
var window = require('electron-window')
var getOptions = require('mocha/bin/options')
var args = require('./args')
var mocha = require('./mocha')
var util = require('util')
var { app, ipcMain: ipc } = require('electron')

// these were suppose to do something, but they don't
// https://github.com/atom/electron/blob/master/docs/api/chrome-command-line-switches.md#--vlog_level
// app.commandLine.appendSwitch('v', -1)
// app.commandLine.appendSwitch('vmodule', 'console=0')

process.on('uncaughtException', function (err) {
  console.error(err)
  console.error(err.stack)
  app.exit(1)
})

// load mocha.opts into process.argv
getOptions()

// parse args
var opts = args.parse(process.argv)

var browserDataPath = path.join(os.tmpdir(), 'electron-mocha-' + Date.now().toString())
app.setPath('userData', browserDataPath)

app.on('quit', function () {
  fs.removeSync(browserDataPath)
})

app.on('ready', function () {
  if (!opts.renderer) {
    // do not quit if tests open and close windows
    app.on('will-quit', event => {
      event.preventDefault()
    })
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
    win._loadURLWithArgs(indexPath, opts, function () {})
    // win.showURL(indexPath, opts)
    ipc.on('mocha-done', function (event, count) {
      win.on('closed', () => app.exit(count))
      win.close()
    })
    ipc.on('mocha-error', function (event, data) {
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
