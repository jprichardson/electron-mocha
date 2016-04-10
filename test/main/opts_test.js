var assert = require('assert')

/* global describe it */

describe('mocha.opts', function () {
  it('--require modules are loaded', function () {
    assert.equal(true, global.required)
  })
})
