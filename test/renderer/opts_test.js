var assert = require('assert')

describe('mocha.opts', function () {
  it('--require modules are loaded', function () {
    assert.equal(true, window.required)
  })

  it('--preload scripts are loaded', function () {
    assert.equal(true, window.preloaded)
  })
})
