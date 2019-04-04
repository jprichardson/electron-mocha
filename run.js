'use strict'

const { join, resolve } = require('path')
const { app, ipcMain: ipc, powerSaveBlocker } = require('electron')
const { createWindow } = require('electron-window')
const { errors, helpers, ONE_AND_DONES } = require('./mocha')
const run = require('mocha/lib/cli/run')
const ansi = require('ansi-colors')
const symbols = require('log-symbols')

exports.command = run.command
exports.describe = 'Run tests with Electron-Mocha'

exports.builder = yargs => {
  run.builder(new Proxy(yargs, {
    get (obj, prop, proxy) {
      let original = obj[prop]

      return (typeof original !== 'function')
        ? original : (...args) => {
          let result

          switch (prop) {
            case 'check':
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
        alias: 'preload',
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
        alias: ['inspect-brk', 'inspect-port'],
        defaultDescription: '5858',
        describe: 'Enable debugger on [port]',
        group: 'Electron',
        hidden: true
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

      helpers.handleRequires(argv['require-main'])

      return true
    })
}

exports.handler = argv => {
  app
    .whenReady()
    .then(() => {
      powerSaveBlocker.start('prevent-app-suspension')

      if (process.platform === 'darwin') {
        if (!(argv.inspect && argv.renderer)) {
          app.dock.hide()
        }
      }

      let files = helpers.handleFiles(argv)

      if (!argv.renderer) {
        helpers.runMocha(argv, files, count =>
          app.exit(Math.min(count, 255)))
      } else {
        let win = createWindow({
          height: 700,
          width: 1200,
          focusable: argv.inspect,
          webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            webSecurity: false
          }
        })

        let code = 0
        win.webContents.on('destroyed', () => app.exit(code))

        ipc.on('mocha-done', (event, count) => {
          code = Math.min(count, 255)
          if (!argv.interactive) {
            win.close()
          }
        })

        ipc.on('mocha-error', (_, error) => fail(error))

        // Undocumented call in electron-window
        win._loadURLWithArgs(
          join(__dirname, 'renderer/index.html'),
          { ...argv, files },
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
    })
    .catch(fail)
}

const fail = error => {
  console.error(`\n${symbols.error} ${ansi.red('ERROR:')} ${error.message}`)
  console.error(error.stack)
  app.exit(1)
}
