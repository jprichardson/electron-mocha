electron-mocha
==============

Mocha testing in [Electron](http://electron.atom.io/). This project has
two main value propositions:

1. You can now easily test any JavaScript app in a real browser (Chromium)
without hassling with PhantomJS or Webdriver.
2. You can now easily test your Electron apps!


Install
-------

    npm i -g electron-mocha


Usage
-----

### Install Electron

First, you need to install Electron. You can either run:

    npm i -g electron-prebuilt

and then `electron` will be added to your path. Or, you
can download a version from https://github.com/atom/electron/releases and
then set an environment variable `ELECTRON_PATH` pointing to the binary.
Note if you're using Mac OS X, the path would be to the actual executable
and not the app directory e.g. `/Applications/Electron.app/Contents/MacOS/Electron`.

You should probably just install `electron-prebuilt` as it simplifies things.


### Run Tests

`electron-mocha` is almost a drop-in replacement for the regular `mocha` command.
Here's the help output:

```

Usage: electron-mocha [options] [files]

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -R, --reporter <name>  specify the reporter to use
    -S, --sort             sort test files
    -b, --bail             bail after first test failure
    -g, --grep <pattern>   only run tests matching <pattern>
    -f, --fgrep <string>   only run tests containing <string>
    -i, --invert           inverts --grep and --fgrep matches
    -r, --require <name>   require the given module
    -s, --slow <ms>        "slow" test threshold in milliseconds [75]
    -t, --timeout <ms>     set test-case timeout in milliseconds [2000]
    -u, --ui <name>        specify user-interface (bdd|tdd|exports)
    -w, --watch            watch files for changes
    --check-leaks          check for global variable leaks
    --compilers            use the given module(s) to compile files
    --globals <names>      allow the given comma-delimited global [names]
    --inline-diffs         display actual/expected differences inline within each string
    --interfaces           display available interfaces
    --no-timeouts          disables timeouts
    --opts <path>          specify opts path [test/mocha.opts]
    --recursive            include sub directories
    --renderer             run tests in renderer process
    --watch-extensions     additional extensions to monitor with --watch

```

So if you run:

    electron-mocha ./tests

This runs the tests in the [`main`](https://github.com/atom/electron/blob/master/docs/tutorial/quick-start.md#main-process)
process. The output that you could expect would be pretty similar to that of io.js with one exception,
it supports all of Electron libraries since it's running
in Electron! So you don't need to mock those libraries out anymore and can actually write tests to integrate with them.

If you run:

    electron-mocha --renderer ./tests

This runs the tests in the [`renderer`](https://github.com/atom/electron/blob/master/docs/tutorial/quick-start.md#main-process).
Yes, this means that you have access to the entirety of the DOM, web storage, etc. This is because it's actually
running in a [Chromium](https://en.wikipedia.org/wiki/Chromium_(web_browser)) process.


Roadmap
-------
- Implement a way to allow tests to run in either `main`/`renderer` from within
the same test file for the purposes of integration testing.


License
-------

MIT
