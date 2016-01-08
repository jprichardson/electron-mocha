'use strict';

function check(arg) {
  return arg + ' was processed';
}

function addHtml(text, document) {
  let new_elem = document.createElement('div');
  let text_node = document.createTextNode(text);
  new_elem.appendChild(text_node);

  let content_elem = document.getElementById('content');
  content_elem.appendChild(new_elem);
}

exports.check = check;
exports.addHtml = addHtml;