var assert = require('assert')
var mocha = require('mocha')

/* global describe it */

describe('mocha', function () {
  it('is exposed as global', function () {
    assert.strictEqual(window.mocha, mocha)
  })
})
