'use strict';

(function() {

  const module1 = require('../module1');
  const addHtml = module1.addHtml;

  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('action-button').addEventListener('click', function(evt) {
      evt.preventDefault();
      addHtml('A long time ago', document);
    });
  });

}()); // Immediately-Invoked Function Expression (IIFE)
