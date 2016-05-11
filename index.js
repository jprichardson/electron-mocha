var fs = require('fs-extra')
var path = require('path')
var os = require('os')
var window = require('electron-window')
var getOptions = require('mocha/bin/options')
var args = require('./args')
var mocha = require('./mocha')
var util = require('util')
var app
var ipc
var v = process.versions.electron.split('.').map(Number)
try {
  app = require('electron').app
  ipc = require('electron').ipcMain
} catch (e) {
  app = require('app')
  ipc = require('ipc')
}

// these were suppose to do something, but they don't
// https://github.com/atom/electron/blob/master/docs/api/chrome-command-line-switches.md#--vlog_level
// app.commandLine.appendSwitch('v', -1)
// app.commandLine.appendSwitch('vmodule', 'console=0')

process.on('uncaughtException', function (err) {
  console.error(err)
  console.error(err.stack)
  exit(1)
})

// load mocha.opts into process.argv
getOptions()

// parse args
var opts = args.parse(process.argv)

var browserDataPath = path.join(os.tmpdir(), 'electron-mocha-' + Date.now().toString())
app.setPath('userData', browserDataPath)

app.on('ready', function () {
  if (!opts.renderer) {
    mocha.run(opts, exit)
  } else {
    var prefs = { height: 700, width: 1200 }

    if (v[0] === 0 && v[1] < 37) {
      prefs['web-preferences'] = { 'web-security': false }
    } else {
      prefs.webPreferences = { webSecurity: false }
    }

    var win = window.createWindow(prefs)
    var indexPath = path.resolve(path.join(__dirname, './renderer/index.html'))
    // undocumented call in electron-window
    win._loadURLWithArgs(indexPath, opts, function () {})
    // win.showURL(indexPath, opts)
    ipc.on('mocha-done', function (event, code) {
      win.destroy()
      exit(code)
    })
    ipc.on('mocha-error', function (event, data) {
      win.destroy()
      writeError(data)
      exit(1)
    })
  }
})

function writeError (data) {
  process.stderr.write(util.format('\nError encountered in %s: %s\n%s',
    path.relative(process.cwd(), data.filename),
    data.message,
    data.stack))
}

function exit (code) {
  fs.remove(browserDataPath, function (err) {
    if (err) console.error(err)
    process.exit(code)
  })
}
