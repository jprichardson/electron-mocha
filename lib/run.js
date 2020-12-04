'use strict'

const { join, resolve } = require('path')
const { app, ipcMain: ipc, powerSaveBlocker } = require('electron')
const { createWindow } = require('electron-window')
const { errors, helpers, ONE_AND_DONES } = require('./mocha')
const run = require('mocha/lib/cli/run')
const ansi = require('ansi-colors')
const symbols = require('log-symbols')
const util = require('util')

exports.command = run.command
exports.describe = 'Run tests with Electron-Mocha'

exports.builder = yargs => {
  run.builder(new Proxy(yargs, {
    get (obj, prop, proxy) {
      const original = obj[prop]

      return (typeof original !== 'function')
        ? original
        : (...args) => {
            let result

            switch (prop) {
              case 'check':
              case 'middleware':
                result = obj
                break
              default:
                result = original.apply(obj, args)
            }

            return (result === obj) ? proxy : result
          }
    }
  }))

  return yargs
    .default('exit', true)
    .default('extension', [])
    .default('file', [])
    .default('ignore', [])
    .default('spec', ['test'])
    .options({
      renderer: {
        describe: 'Run tests in renderer process',
        group: 'Electron'
      },
      'require-main': {
        alias: 'main',
        describe: 'Require module in main process',
        group: 'Electron',
        requiresArg: true
      },
      script: {
        describe: 'Load module in renderer via script tag',
        group: 'Electron',
        implies: 'renderer',
        requiresArg: true
      },
      interactive: {
        describe: 'Show renderer tests in persistent window',
        group: 'Electron',
        implies: 'renderer'
      },
      inspect: {
        alias: ['inspect-brk', 'inspect-port', 'debug'],
        defaultDescription: '5858',
        describe: 'Enable debugger on [port]',
        group: 'Electron',
        hidden: true
      },
      url: {
        alias: 'index',
        describe: 'Load custom URL in renderer',
        group: 'Electron',
        implies: 'renderer',
        type: 'string',
        requiresArg: true
      },
      preload: {
        describe: 'Load module during renderer preload',
        group: 'Electron',
        implies: 'renderer',
        type: 'string',
        requiresArg: true
      },
      warnings: {
        alias: 'W',
        describe: 'Print renderer warnings to console',
        group: 'Electron',
        type: 'boolean'
      },
      'window-config': {
        describe: 'Supply custom Electron window options',
        group: 'Electron',
        implies: 'renderer'
      }
    })
    .check(argv => {
      // Mocha Checks
      // See: mocha/lib/cli/run.js

      // "one-and-dones"; let yargs handle help and version
      Object.keys(ONE_AND_DONES).forEach(opt => {
        if (argv[opt]) {
          ONE_AND_DONES[opt].call(null, yargs)
          app.exit()
        }
      })

      // yargs.implies() isn't flexible enough to handle this
      if (argv.invert && !('fgrep' in argv || 'grep' in argv)) {
        throw errors.createMissingArgumentError(
          '"--invert" requires one of "--fgrep <str>" or "--grep <regexp>"',
          '--fgrep|--grep',
          'string|regexp'
        )
      }

      if (argv.compilers) {
        throw errors.createUnsupportedError(
          `--compilers is DEPRECATED and no longer supported.
          Use --require instead.`
        )
      }

      // Additional Electron-Mocha Checks
      if (argv._[0] === 'debug' || argv.interactive) {
        argv.inspect = true
      }

      if (argv.script) {
        argv.script = argv.script.map(script => resolve(script))
      }
      if (argv.preload) {
        try {
          argv.preload = resolve(argv.preload)
        } catch (e) {
          throw errors.createMissingArgumentError(
            `--preload requires file path [${e.code}].`
          )
        }
      }
      return true
    })
}

exports.handler = async argv => {
  try {
    await helpers.handleRequires(argv['require-main'])
    await app.whenReady()

    powerSaveBlocker.start('prevent-app-suspension')

    if (process.platform === 'darwin') {
      if (!(argv.inspect && argv.renderer)) {
        app.dock.hide()
      }
    }

    let code = 0

    process.on('SIGINT', () => app.exit(code))
    process.on('SIGTERM', () => app.exit(code))

    if (!argv.renderer) {
      await helpers.runMocha(argv, count => {
        code = Math.min(count, 255)
        if (!argv.watch) {
          app.exit(code)
        }
      })
    } else {
      const customWindowOptions = argv['window-config']
        ? require(resolve(argv['window-config']))
        : {}

      const win = createWindow({
        height: 700,
        width: 1200,
        focusable: argv.renderer || argv.inspect,
        ...customWindowOptions,
        webPreferences: {
          enableRemoteModule: false,
          contextIsolation: false,
          nodeIntegration: true,
          ...customWindowOptions.webPreferences,
          preload: join(__dirname, '..', 'renderer', 'run.js')
        }
      })

      win.webContents.on('destroyed', () => app.exit(code))

      ipc.on('mocha-done', (event, count) => {
        code = Math.min(count, 255)
        if (!(argv.interactive || argv.watch)) {
          if (!win.isDestroyed()) win.close()
        }
      })

      ipc.on('mocha-error', (_, error) => {
        win.webContents.removeAllListeners('destroyed')
        fail(error, argv['full-trace'])
      })
      ipc.on('mocha-warn', (_, warning) => warn(warning))

      ipc.on('console-call', (_, method, args) => {
        if (method !== 'warn' || argv.warnings) {
          print(method, args)
        }
      })

      // Undocumented call in electron-window
      win._loadURLWithArgs(
        argv.url ? argv.url : join(__dirname, '../renderer/index.html'),
        argv,
        () => {
          if (argv.inspect) {
            win.show()
            win.webContents.openDevTools()
            win.webContents.on('devtools-opened', () => {
              // Debugger is not immediately ready!
              setTimeout(() => {
                win.webContents.send('mocha-start')
              }, 250)
            })

            // Called on reload in --interactive mode
            ipc.on('mocha-ready-to-run', () => {
              win.webContents.send('mocha-start')
            })
          } else {
            win.webContents.send('mocha-start')
          }
        })
    }
  } catch (err) {
    fail(err, argv['full-trace'])
  }
}

const fail = (error, trace) => {
  console.error(`\n${symbols.error} ${ansi.red('ERROR:')} ${error.message}`)
  if (trace && error.stack) console.error(error.stack)
  app.exit(1)
}

const warn = warning => {
  console.warn(ansi.yellow(`Warning: ${warning.message}`))
}

const print = (method, args) => {
  const output = util.format.apply(null, args)
  console[method](output)
}
