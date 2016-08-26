var assert = require('assert')

/* global describe it */

describe('electron-mocha', function () {
  it('runs in main process by default', function () {
    assert.strictEqual(process.type, 'browser')
  })
})
