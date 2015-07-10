var assert = require('assert')

describe('describe: test 2', function () {
  it('it: test 2', function () {
    localStorage.setItem('blah', 'hello storage!!')
    assert.strictEqual('test', 'test')
    console.log(localStorage.getItem('blah'))
    console.dir({name: 'jp'})
  })
})