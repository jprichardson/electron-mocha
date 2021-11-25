'use strict'

const assert = require('assert')
const { ipcRenderer } = require('electron')

describe('mocha.opts', () => {
  it('--require modules are loaded in renderer', () => {
    assert.strictEqual(true, window.required)
  })

  it('--require modules are not loaded in main', async () => {
    assert.strictEqual(undefined, await ipcRenderer.invoke('get-global', 'required'))
  })

  it('--script modules are loaded', () => {
    assert.strictEqual(true, window.preloaded)
  })

  it('--require-main modules are loaded in the main process', async () => {
    assert.strictEqual(true, await ipcRenderer.invoke('get-global', 'requiredMain'))
  })

  it('--require-main modules are loaded before "ready"', async () => {
    assert.strictEqual(true, await ipcRenderer.invoke('get-global', 'requiredMainBeforeReady'))
  })

  it('--url custom page loaded', () => {
    assert.strictEqual('Loaded via --url', document.title)
  })
})
