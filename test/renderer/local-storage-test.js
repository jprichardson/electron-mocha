'use strict'

const assert = require('assert')

describe('localStorage', () => {
  it('can be accessed', () => {
    window.localStorage.setItem('blah', 'hello storage!')
    assert.strictEqual(window.localStorage.getItem('blah'), 'hello storage!')
  })
})
