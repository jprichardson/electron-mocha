var assert = require('assert')
var remote = require('electron').remote

/* global describe it */

describe('mocha.opts', function () {
  it('--require modules are loaded', function () {
    assert.strictEqual(true, window.required)
  })

  it('--preload scripts are loaded', function () {
    assert.strictEqual(true, window.preloaded)
  })

  it('--require-main modules are loaded in the main process', function () {
    assert.strictEqual(true, remote.getGlobal('requiredMain'))
  })
})
