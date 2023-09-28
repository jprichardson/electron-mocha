'use strict'

const assert = require('assert')

describe('mocha.opts', () => {
  it('--require modules are loaded', () => {
    assert.strictEqual(true, global.required)
  })

  it('--require ES modules are loaded', () => {
    assert.strictEqual(true, global.requiredES)
  })

  it('--require-main modules are loaded', () => {
    assert.strictEqual(true, global.requiredMain)
  })

  it('--require-main modules are loaded before "ready"', () => {
    assert.strictEqual(true, global.requiredMainBeforeReady)
  })
})
