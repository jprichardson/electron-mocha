var assert = require('assert')

/* global describe it */

describe('localStorage', () => {
  it('can be accessed', () => {
    window.localStorage.setItem('blah', 'hello storage!')
    assert.ok(window.localStorage.getItem('blah') === 'hello storage!')
  })
})
