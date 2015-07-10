var assert = require('assert')

/* global describe it */

describe('describe: test 2', function () {
  it('it: test 2', function () {
    window.localStorage.setItem('blah', 'hello storage!!')
    assert.strictEqual('test', 'test')
    console.log(window.localStorage.getItem('blah'))
    console.dir({name: 'jp'})
  })
})
