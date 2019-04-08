'use strict'

const Mocha = require('mocha')
const errors = require('mocha/lib/errors')

const {
  handleFiles,
  handleRequires,
  validatePlugin,
  watchRun
} = require('mocha/lib/cli/run-helpers')

const {
  ONE_AND_DONES
} = require('mocha/lib/cli/one-and-dones')

const runMocha = (argv, files, done) => {
  Error.stackTraceLimit = Infinity

  handleRequires(argv.require)
  validatePlugin(argv, 'reporter', Mocha.reporters)
  validatePlugin(argv, 'ui', Mocha.interfaces)

  let mocha = new Mocha(argv)

  if (argv.watch) {
    watchRun(mocha, { ...argv, files })
  } else {
    mocha.files = files
    mocha.run(done)
  }
}

module.exports = {
  Mocha,
  ONE_AND_DONES,
  errors,
  helpers: {
    handleFiles,
    handleRequires,
    runMocha
  }
}
