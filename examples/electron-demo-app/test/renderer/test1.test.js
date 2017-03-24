'use strict';

const assert = require('assert');

const module1 = require('../../module1');
const check = module1.check;
const addHtml = module1.addHtml;

describe('Renderer', function() {

  it('has access to CommonJS modules', function() {
    assert(check('some value').endsWith('was processed'));
  });

  it('has no access to dedicated Main process modules', function() {
    assert(require('electron').app === undefined);
  });

  it('has access to dedicated Renderer process modules', function() {
    assert(require('electron').ipcRenderer !== undefined);
  });

  it('has localStorage support', function() {
    window.localStorage.setItem('blah', 'hello storage!!');
    assert.equal(window.localStorage.getItem('blah'), 'hello storage!!');
  });

  it('has access to the DOM', function() {
    assert(window !== undefined);
    assert(window.document !== undefined);

    // TODO: Why this call fails with the following error?
    //
    // TypeError: Cannot read property 'name' of undefined
    //
    // console.log('window.document:', window.document);
  });

  it('can add to the DOM', function() {
    // Preparatory work to create the needed HTML structure for the addHtml
    // method (it needs a <div id="content">)
    let new_elem = window.document.createElement('div');
    new_elem.setAttribute('id', 'content');
    window.document.appendChild(new_elem);

    // Actual test of the addHtml method
    addHtml('This is a test', window.document);
    assert.equal(window.document.getElementsByName('div').length, 2);
  });


  it('has access to the Electron demo app HTML welcome.html page', function() {
    // TODO: How to load welcome.html and access div.content?
    //
    let elem = document.getElementById('content');
    assert(elem !== undefined);
    assert(elem != null);

    // Actual test of the addHtml method in the welcome.html page where 2 divs
    // are already present.
    addHtml('This is a test', window.document);
    assert.equal(window.document.getElementsByName('div').length, 3);
  });

});
