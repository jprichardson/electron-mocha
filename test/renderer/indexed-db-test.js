var assert = require('assert')

/* global describe it */

describe('accessing indexedDB', () => {
  it('does not fail when deleting the temp directory on exit', () => {
    const db = window.indexedDB.open('TestDatabase', 3)
    assert.ok(db != null)
  })
})
