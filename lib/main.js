'use strict'

const { join, resolve } = require('path')
const { mkdtempSync } = require('fs')
const { spawn } = require('child_process')
const { app } = require('electron')
const { version } = require('../package.json')
const yargs = require('yargs/yargs')
const ansi = require('ansi-colors')
const symbols = require('log-symbols')

// Add Electron-Mocha types to ensure they're known when
// parsing options from config files
const { types } = require('mocha/lib/cli/run-option-metadata')
types.array.push('require-main', 'script')
types.boolean.push('renderer', 'interactive')

const { loadOptions, YARGS_PARSER_CONFIG } = require('mocha/lib/cli/options')
const run = require('./run')

// Main entry point
// See: mocha/lib/cli/cli.js
exports.main = (argv = process.argv.slice(2)) => {
  module.paths.push(process.cwd(), resolve('node_modules'))

  yargs()
    .scriptName('electron-mocha')
    .command(run)
    .fail((msg, err, yargs) => {
      yargs.showHelp()
      console.error(`\n${symbols.error} ${ansi.red('ERROR:')} ${msg}`)
      if (err) console.error(err.stack)
      app.exit(1)
    })
    .help('help', 'Show usage information and exit')
    .alias('help', 'h')
    .version('version', 'Show version number and exit', version)
    .alias('version', 'V')
    .wrap(process.stdout.columns ? Math.min(process.stdout.columns, 80) : 80)
    .parserConfiguration(YARGS_PARSER_CONFIG)
    .parse(argv, loadOptions(argv))
}

// Setup User-Data in tmp
const userData = mkdtempSync(join(app.getPath('temp'), 'electron-mocha-'))
app.setPath('userData', userData)

// Clean-up in a separate process so that we're not
// removing Electron's data out from under it
app.on('quit', () => {
  const child = spawn(process.execPath, ['cleanup.js', userData], {
    detached: true,
    stdio: 'ignore',
    env: { ELECTRON_RUN_AS_NODE: 1 },
    cwd: __dirname
  })
  child.unref()
})

// Do not quit if tests open and close windows
app.on('window-all-closed', () => {})

if (require.main === module) {
  exports.main()
}
