'use strict'

const Mocha = require('mocha')
const errors = require('mocha/lib/errors')

const {
  handleRequires,
  validateLegacyPlugin
} = require('mocha/lib/cli/run-helpers')

const collectFiles = require('mocha/lib/cli/collect-files')
const { watchRun } = require('mocha/lib/cli/watch-run')

const {
  ONE_AND_DONES
} = require('mocha/lib/cli/one-and-dones')

const runMocha = async (argv, done) => {
  Error.stackTraceLimit = Infinity

  await handleRequires(argv.require)

  if (validateLegacyPlugin) {
    validateLegacyPlugin(argv, 'reporter', Mocha.reporters)
    validateLegacyPlugin(argv, 'ui', Mocha.interfaces)
  }

  const mocha = new Mocha(argv)

  if (argv.watch) {
    await watchRun(mocha, { ui: argv.ui }, argv)
  } else {
    mocha.files = collectFiles(argv)
    await mocha.run(done)
  }
}

module.exports = {
  Mocha,
  ONE_AND_DONES,
  errors,
  helpers: {
    handleRequires,
    runMocha
  }
}
