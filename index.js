var app = require('app')
var fs = require('fs-extra')
var ipc = require('ipc')
var path = require('path')
var os = require('os')
var window = require('electron-window')
var args = require('./args')
var mocha = require('./mocha')

// these were suppose to do something, but they don't
// https://github.com/atom/electron/blob/master/docs/api/chrome-command-line-switches.md#--vlog_level
// app.commandLine.appendSwitch('v', -1)
// app.commandLine.appendSwitch('vmodule', 'console=0')

var opts = args.parse(process.argv)

var browserDataPath = path.join(os.tmpdir(), 'electron-mocha-' + Date.now().toString())
app.setPath('userData', browserDataPath)

app.on('ready', function () {
  if (!opts.renderer) {
    mocha.run(opts, exit)
  } else {
    var win = window.createWindow({ height: 700, width: 1200 })
    // undocumented call in electron-window
    win._loadUrlWithArgs(path.resolve('./renderer/index.html'), opts, Function())
    // win.showUrl(path.resolve('./renderer/index.html'), opts)
    ipc.on('mocha-done', function (event, code) {
      console.log('done')
      exit(code)
    })
  }
})

function exit (code) {
  fs.remove(browserDataPath, function (err) {
    if (err) console.error(err)
    // process.exit() does not work properly
    // app.quit() does not set code
    // bug in Electron, see issue: https://github.com/atom/electron/issues/1983
    app.quit(code)
  })
}

