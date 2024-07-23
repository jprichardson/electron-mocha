'use strict'

const Mocha = require('mocha')
const errors = require('mocha/lib/errors')
const { resolve } = require('path')
const { existsSync } = require('fs')

const {
  handleRequires,
  validateLegacyPlugin
} = require('mocha/lib/cli/run-helpers')

const collectFiles = require('mocha/lib/cli/collect-files')
const { watchRun } = require('mocha/lib/cli/watch-run')

const {
  ONE_AND_DONES
} = require('mocha/lib/cli/one-and-dones')

const cwd = process.cwd()

const handleLegacyRequires = async (mods) => {
  if (mods) {
    for (let mod of mods) {
      if (existsSync(mod, { cwd }) || existsSync(`${mod}.js`, { cwd })) {
        mod = resolve(mod)
      }
      require(mod)
    }
  }
}

const runMocha = async (argv, done) => {
  Error.stackTraceLimit = Infinity

  if (process.type === 'renderer') {
    // Node.js ESM loader is not available in Electron Renderer
    // so we require dependencies explicitly here.
    await handleLegacyRequires(argv.require)
  } else {
    await handleRequires(argv.require)
  }

  if (validateLegacyPlugin) {
    validateLegacyPlugin(argv, 'reporter', Mocha.reporters)
    validateLegacyPlugin(argv, 'ui', Mocha.interfaces)
  }

  const mocha = new Mocha(argv)

  if (argv.watch) {
    await watchRun(mocha, { ui: argv.ui }, argv)
  } else {
    mocha.files = collectFiles(argv).files
    // In the main process we can handle ESM, but not the renderer
    if (process.type !== 'renderer') {
      await mocha.loadFilesAsync()
    }
    await mocha.run(done)
  }
}

module.exports = {
  Mocha,
  ONE_AND_DONES,
  errors,
  helpers: {
    handleRequires,
    handleLegacyRequires,
    runMocha
  }
}
