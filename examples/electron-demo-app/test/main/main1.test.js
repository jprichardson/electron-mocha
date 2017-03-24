'use strict';

const assert = require('assert');

const module1 = require('../../module1');
const check = module1.check;

describe('Main', function() {

  it('has access to CommonJS modules', function() {
    assert(check('some value').endsWith('was processed'));
  });

  it('has access to dedicated Main process modules', function() {
    assert(require('electron').app !== undefined);
  });

  it('has no access to dedicated Renderer process modules', function() {
    assert(require('electron').ipcRenderer === undefined);
  });

});
