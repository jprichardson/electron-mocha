var assert = require('assert')

describe('mocha.opts', function () {
  it('--require modules are loaded', function () {
    assert.equal(true, global.required)
  })
})
