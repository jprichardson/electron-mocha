electron-mocha
==============
[![Build Status](https://travis-ci.org/jprichardson/electron-mocha.svg?branch=master)](https://travis-ci.org/jprichardson/electron-mocha)
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/jprichardson/electron-mocha?branch=master&svg=true)](https://ci.appveyor.com/project/jprichardson/electron-mocha)
[![npm](https://img.shields.io/npm/v/electron-mocha.svg?maxAge=2592000)](https://www.npmjs.com/package/electron-mocha)

Mocha testing in [Electron](https://electronjs.org). This project has
two main value propositions:

1. You can now easily test any JavaScript app in a real browser environment.
2. You can now easily test your Electron apps!


## Install

    npm i -g electron-mocha


## Usage

### Install Electron

First, you need to install Electron. You can either run:

    npm i -g electron

and then `electron` will be added to your path. Or, you
can download a version from https://github.com/electron/releases and
then set an environment variable `ELECTRON_PATH` pointing to the binary.
Note if you're using Mac OS X, the path would be to the actual executable
and not the app directory e.g. `/Applications/Electron.app/Contents/MacOS/Electron`.

### Run Tests

`electron-mocha` is almost a drop-in replacement for the regular `mocha` command,
with these additional options:

    --renderer              Run tests in renderer process              [boolean]
    --require-main, --main  Require module in main process             [array]
    --script                Load module in renderer via script tag     [array]
    --interactive           Show renderer tests in persistent window   [boolean]
    --url, --index          Load custom URL in renderer                [string]
    --preload               Load module during renderer preload        [string]
    --window-config         Supply custom Electron window options      [string]
    -W, --warnings          Print renderer warnings to console         [boolean]

The `window-config` switch must point to a JSON file or to a JavaScript module that exports
an options object. For more information, check out the
[Electron API docs](https://www.electronjs.org/docs/api/browser-window#new-browserwindowoptions).

For the full list of available options, see `electron-mocha --help`.

#### Examples

    electron-mocha

This runs all tests in your `test` directory in the
[main process](https://github.com/electron/electron/blob/master/docs/tutorial/application-architecture.md#main-and-renderer-processes).

    electron-mocha --renderer

This runs all tests in your `test` directory in a
[renderer process](https://github.com/electron/electron/blob/master/docs/tutorial/application-architecture.md#main-and-renderer-processes).
This means that you have access to the entirety of the DOM, web storage, etc. This is because it's actually
running in a [Chromium](https://en.wikipedia.org/wiki/Chromium_(web_browser)) process.

### Using on Travis CI

On Linux, your `.travis.yml` will need an extra line of configuration to run your tests:

```yaml
services:
  - xvfb
```

#### WebGL Tests

If you are writing tests for WebGL programs and you cannot get a WebGL contexts,
this may be because Travis doesn't have GPU support.
You can pass **--ignore-gpu-blacklist** to Electron to bypass it:

* command
```shell
electron-mocha --main ignore-gpu-blacklist.js
```
* ignore-gpu-blacklist.js
```js
const { app } = require('electron');
app.commandLine.appendSwitch('ignore-gpu-blacklist');
```

###  Debugger Support

Use the `--inspect` or `--inspect-brk` options to enable Electron's debugger.
When using `--renderer` this will show the test-runner window dev-tools, including
a debugger (so you do not need to attach a node-inspector).

Note that the window will close automatically when the tests have finished,
therefore this option should be used in combination with `debugger` statements
anywhere in your tests or code.

Alternatively, you can use the `--interactive` option which will keep the window
open after your tests have run (you can reload the window to run the tests again),
to give you the opportunity to set breakpoints using the dev-tools inspector.

To debug the main process, you will need to
[start a node-inspector separately](https://nodejs.org/en/docs/inspector/).

### Code Coverage

You can use `electron-mocha` to collect code coverage data in both Electron's
main and renderer processes. To do this, you will need to instrument your code,
run the tests on the instrumented code, and save the coverage stats after all
tests have finished.

For examples, [see this thread](https://github.com/jprichardson/electron-mocha/issues/135#issuecomment-464160861)


License
-------

MIT
