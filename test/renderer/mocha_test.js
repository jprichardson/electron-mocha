'use strict'

const assert = require('assert')
const mocha = require('mocha')

describe('mocha', () => {
  it('is exposed as global', () => {
    assert.strictEqual(window.mocha, mocha)
  })
})
