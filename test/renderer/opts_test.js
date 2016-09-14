var assert = require('assert')
var remote = require('electron').remote

/* global describe it */

describe('mocha.opts', function () {
  it('--require modules are loaded', function () {
    assert.equal(true, window.required)
  })

  it('--preload scripts are loaded', function () {
    assert.equal(true, window.preloaded)
  })

  it('--require-main modules are loaded in the main process', function () {
    assert.equal(true, remote.getGlobal('requiredMain'))
  })
})
