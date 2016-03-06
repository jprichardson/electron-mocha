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
    opts.require.forEach(function (mod) {
      require(mod)
    })
    mocha.run(opts, exit)
  } else {
    var win = window.createWindow({ height: 700, width: 1200, 'web-preferences': { 'web-security': false } })
    var indexPath = pathFrom(browserDataPath, './renderer/index.html')

    var setupScript
    setupScript = 'require("' + pathFrom(__dirname, './renderer/console.js') + '");'
    setupScript += 'var Mocha = require("'+ pathFrom(__dirname, './mocha.js') +'");'
    setupScript += 'require("' + pathFrom(__dirname, './renderer/run.js') + '");'

    // read in any external scripts to load and wrap everything in HTML script tags
    var scripts = opts.scripts.map(function(scriptPath) {
      return fs.readFileSync(pathFrom(process.cwd(), scriptPath), 'utf8');
    })
    .concat(setupScript)
    .map(function(script) {
      return '<script>' + script + '</script>'
    })
    .join('')

    fs.outputFileSync(indexPath, scripts);
    // undocumented call in electron-window
    win._loadUrlWithArgs(indexPath, opts, function () {})
    // win.showUrl(indexPath, opts)
    ipc.on('mocha-done', function (event, code) {
      exit(code)
    })
    ipc.on('mocha-error', function (event, data) {
      writeError(data)
      exit(1)
    })
  }
})

function pathFrom(root, relative) {
  return path.resolve(path.join(root, relative));
}

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
