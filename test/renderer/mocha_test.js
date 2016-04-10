var assert = require('assert')
var mocha = require('mocha')

/* global describe it */

describe('describe: test 3', function () {
  it('it: test 3', function () {
    assert.strictEqual(window.mocha, mocha)
  })
})
