electron-window
===============

Convenience methods for Electron windows.


Installation
------------

    npm i --save electron-window


Usage
-----

### TL;DR:

`electron-window` converts this:

```js
var app = require('app')
var path = require('path')
var url = require('url')
var BrowserWindow = require('browser-window')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null

app.on('ready', function () {
  mainWindow = new BrowserWindow({ width: 1000, height: 400, show: false })

  var someArgs = { data: 'hi' }
  var indexPath = path.resolve(__dirname, '..', 'weird-location', 'index.html')
  var indexUrl = url.format({
    protocol: 'file',
    pathname: indexPath,
    slashes: true,
    hash: encodeURIComponent(JSON.stringify(someArgs))
  })

  mainWindow.on('closed', function() {
    mainWindow = null
  })

  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.show()
    console.log('window is now visible!')
  })

  mainWindow.loadUrl(indexUrl)
})
```

to this:

```js
var app = require('app')
var path = require('path')
var window = require('electron-window')

app.on('ready', function () {
  var mainWindow = window.createWindow({width: 1000, height: 400})
  var someArgs = { data: 'hi' }
  var indexPath = path.resolve(__dirname, '..', 'weird-location', 'index.html')
  mainWindow.showUrl(indexPath, someArgs, function () {
    console.log('window is now visible!')
  })
})
```


### API Methods

#### createWindow(options)

Class method that creates a new [BrowserWindow](https://github.com/atom/electron/blob/master/docs/api/browser-window.md) with
the following default `options`: `{show: false}`. No need to worry about keeping a global reference
to prevent garbage collection, this is handled for you.


#### parseArgs()

Instance method to parse arguments in window. You would only need to call from your renderer preload script if you pass in
[`preload`](https://github.com/atom/electron/blob/master/docs/api/browser-window.md#new-browserwindowoptions).


#### showUrl(httpOrFileUrl, [argsForRenderer], [callback])

Instance method that shows the url. When the url is finished loading, the callback is returned. If the optional `argsForRenderer` is set
then `__args__` will be a global object for the page in the renderer process. This is a convenient way to pass
arguments from the main process to the renderer process.


#### unref()

Instance method to call if you ever want to remove the global reference. Should only need to be called if
[`destroy()`](https://github.com/atom/electron/blob/master/docs/api/browser-window.md#browserwindowdestroy) is ever called.
Most likely, you won't need to use this.


### API Properties

#### windows

Class property to get a reference to all windows created and their ids.



### Example

**main process**

```js
var window = require('electron-window')

var windowOptions = {
 width: 1000,
 height: 400
}
var mainWindow = window.createWindow(windowOptions)

// can access at window.__args__ from scripts
// ran from index.html
var args = {
  data: 'some secret data'
}
mainWindow.showUrl('index.html', args, function() {
  console.log('the window should be showing with the contents of the URL now')
})
```

**renderer process**

```js
// only call if `preload` is set in `windowOptions`
require('electron-window').parseArgs()

console.log(window.__args__)
// => Object {data: "some secret data"}
```


License
-------

MIT


