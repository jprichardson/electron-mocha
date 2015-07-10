var assign = require('object-assign')
var path = require('path')
var BrowserWindow = require('browser-window')
var wargs = require('./args')

// retain global references, if not, window will be closed automatically when
// garbage collected
var _windows = {}

function _createWindow (options) {
  var opts = assign({
    show: false,
    preload: path.join(__dirname, 'renderer-preload')
  }, options)

  var window = new BrowserWindow(opts)
  _windows[window.id] = window

  return window
}

// should not need to be called directly, but just in case
// window.destroy() is ever called
function _unref () {
  delete _windows[this.id]
}

function _loadUrlWithArgs (httpOrFileUrl, args, callback) {
  if (typeof args === 'function') {
    callback = args
    args = null
  }

  var win = this
  win.webContents.once('did-finish-load', function () {
    callback.apply(this, arguments)
  })

  var url = wargs.urlWithArgs(httpOrFileUrl, args)
  win.loadUrl(url)
}

function createWindow (options) {
  var window = _createWindow(options)
  window.unref = _unref.bind(window)
  window.once('closed', window.unref)
  window._loadUrlWithArgs = _loadUrlWithArgs.bind(window)

  window.showUrl = function (httpOrFileUrl, args, callback) {
    window._loadUrlWithArgs(httpOrFileUrl, args, function () {
      window.show()
      callback && callback.apply(this, arguments)
    })
  }

  return window
}

module.exports = {
  createWindow: createWindow,
  windows: _windows,
  _createWindow: _createWindow,
  _loadUrlWithArgs: _loadUrlWithArgs,
  _unref: _unref
}
