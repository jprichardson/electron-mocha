is-electron-renderer
====================

Check if code is running in Electron `renderer` process.

Electron code can run in either the `main` process or
the `renderer` process. This is the same as asking if
the code is running in a web page with access to the
DOM or not. Read more here: https://github.com/atom/electron/blob/master/docs/tutorial/quick-start.md


Install
-------

    npm i --save is-electron-renderer


Usage
-----

```js
var isRenderer = require('is-electron-renderer')

console.log(isRenderer)
// => true
```

License
-------

MIT
